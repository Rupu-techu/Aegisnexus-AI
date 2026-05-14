from __future__ import annotations

import asyncio
from datetime import datetime

from fastapi import WebSocket
from starlette.websockets import WebSocketDisconnect

from backend.app.schemas import TelemetryEvent, TelemetrySnapshot


class TelemetryManager:
    def __init__(self) -> None:
        self.active_connections: list[WebSocket] = []
        self.latest_events: list[TelemetryEvent] = []
        self.threats_analyzed = 0
        self.blocked_requests = 0
        self.review_requests = 0
        self.total_risk_score = 0

    async def connect(self, websocket: WebSocket) -> None:
        await websocket.accept()
        self.active_connections.append(websocket)
        await self.send_snapshot(websocket)

    def disconnect(self, websocket: WebSocket) -> None:
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    def record_analysis(self, risk_score: int, enforcement_action: str) -> None:
        self.threats_analyzed += 1
        self.total_risk_score += risk_score
        if enforcement_action == "BLOCK":
            self.blocked_requests += 1
        if enforcement_action == "REVIEW":
            self.review_requests += 1

    def get_snapshot(self) -> TelemetrySnapshot:
        average = self.total_risk_score / self.threats_analyzed if self.threats_analyzed else 0.0
        return TelemetrySnapshot(
            threats_analyzed=self.threats_analyzed,
            blocked_requests=self.blocked_requests,
            review_requests=self.review_requests,
            average_risk_score=round(average, 2),
            active_websocket_clients=len(self.active_connections),
            latest_events=self.latest_events[-12:],
        )

    async def send_snapshot(self, websocket: WebSocket) -> None:
        await websocket.send_json(self.get_snapshot().model_dump(mode="json"))

    async def broadcast_event(self, event_type: str, payload: dict) -> None:
        event = TelemetryEvent(
            event_type=event_type,
            timestamp=datetime.utcnow(),
            payload=payload,
        )
        self.latest_events.append(event)
        self.latest_events = self.latest_events[-50:]
        message = event.model_dump(mode="json")

        stale_connections: list[WebSocket] = []
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except RuntimeError:
                stale_connections.append(connection)

        for connection in stale_connections:
            self.disconnect(connection)

    async def telemetry_stream(self) -> None:
        while True:
            await asyncio.sleep(5)
            await self.broadcast_event(
                "governance.heartbeat",
                {
                    "status": "nominal",
                    "soc_zone": "AegisNexus Core",
                    "active_clients": len(self.active_connections),
                    "threats_analyzed": self.threats_analyzed,
                },
            )

    async def handle_socket(self, websocket: WebSocket) -> None:
        await self.connect(websocket)
        try:
            while True:
                await websocket.receive_text()
                await self.send_snapshot(websocket)
        except WebSocketDisconnect:
            self.disconnect(websocket)


telemetry_manager = TelemetryManager()
