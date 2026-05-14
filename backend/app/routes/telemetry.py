from __future__ import annotations

from fastapi import APIRouter

from app.schemas import TelemetrySnapshot
from app.websocket.telemetry_socket import telemetry_manager

router = APIRouter(prefix="/telemetry", tags=["Telemetry"])


@router.get("/snapshot", response_model=TelemetrySnapshot)
async def get_snapshot() -> TelemetrySnapshot:
    return telemetry_manager.get_snapshot()


@router.get("/mock-stream")
async def get_mock_stream_definition() -> dict[str, object]:
    return {
        "websocket": "/ws/telemetry",
        "event_examples": [
            "governance.decision",
            "simulation.executed",
            "governance.heartbeat",
        ],
        "description": "Live enterprise governance telemetry feed for SOC dashboards.",
    }
