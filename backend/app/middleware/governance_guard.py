from __future__ import annotations

import json
from typing import Any

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

from backend.app.database.db import SessionLocal
from backend.app.services.audit_service import audit_service
from backend.app.services.policy_engine import policy_engine
from backend.app.services.threat_engine import threat_engine
from backend.app.websocket.telemetry_socket import telemetry_manager


class GovernanceGuardMiddleware(BaseHTTPMiddleware):
    """
    Central governance interception point for prompt-bearing requests.

    The middleware inspects JSON requests that contain a `prompt` field, performs
    threat analysis, applies policy enforcement, persists an audit record, and
    emits telemetry before the request reaches route handlers.
    """

    async def dispatch(self, request: Request, call_next):
        if request.method not in {"POST", "PUT", "PATCH"}:
            return await call_next(request)

        content_type = request.headers.get("content-type", "")
        if "application/json" not in content_type:
            return await call_next(request)

        body = await request.body()
        if not body:
            return await call_next(request)

        try:
            payload: dict[str, Any] = json.loads(body)
        except json.JSONDecodeError:
            return await call_next(request)

        prompt = payload.get("prompt")
        if not isinstance(prompt, str) or not prompt.strip():
            self._restore_request_body(request, body)
            return await call_next(request)

        analysis = await threat_engine.analyze_prompt(prompt)
        decision = policy_engine.evaluate(prompt, analysis)
        telemetry_manager.record_analysis(analysis.risk_score, decision.enforcement_action)

        db = SessionLocal()
        try:
            audit_service.log_decision(db, prompt, decision)
        finally:
            db.close()

        request.state.governance_decision = decision
        await telemetry_manager.broadcast_event(
            "governance.decision",
            {
                "path": request.url.path,
                "risk_score": analysis.risk_score,
                "threat_level": analysis.threat_level,
                "action": decision.enforcement_action,
                "matched_policies": decision.matched_policies,
            },
        )

        self._restore_request_body(request, body)

        if decision.blocked and request.url.path != "/analyze":
            return JSONResponse(
                status_code=403,
                content={
                    "message": "Request blocked by AegisNexus governance guard.",
                    **decision.model_dump(mode="json"),
                },
            )

        return await call_next(request)

    @staticmethod
    def _restore_request_body(request: Request, body: bytes) -> None:
        async def receive() -> dict[str, Any]:
            return {"type": "http.request", "body": body, "more_body": False}

        request._receive = receive
