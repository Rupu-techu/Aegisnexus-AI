from __future__ import annotations

from fastapi import APIRouter, Request

from backend.app.schemas import GovernanceDecision, PromptPayload, ThreatAnalysisResponse
from backend.app.services.policy_engine import policy_engine
from backend.app.services.threat_engine import threat_engine

router = APIRouter(tags=["Threat Analysis"])


@router.post("/analyze", response_model=ThreatAnalysisResponse)
async def analyze_prompt(payload: PromptPayload, request: Request) -> ThreatAnalysisResponse:
    existing_decision = getattr(request.state, "governance_decision", None)
    if isinstance(existing_decision, GovernanceDecision):
        return existing_decision.analysis

    return await threat_engine.analyze_prompt(payload.prompt)


@router.post("/analyze/governance", response_model=GovernanceDecision)
async def analyze_with_governance(payload: PromptPayload, request: Request) -> GovernanceDecision:
    existing_decision = getattr(request.state, "governance_decision", None)
    if isinstance(existing_decision, GovernanceDecision):
        return existing_decision

    analysis = await threat_engine.analyze_prompt(payload.prompt)
    return policy_engine.evaluate(payload.prompt, analysis)


@router.get("/threats/samples")
async def get_sample_threats() -> list[dict[str, str]]:
    return threat_engine.get_sample_threats()
