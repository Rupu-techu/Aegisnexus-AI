from __future__ import annotations

import asyncio
from contextlib import asynccontextmanager

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.database import models  # noqa: F401
from app.database.db import Base, engine
from app.middleware.governance_guard import GovernanceGuardMiddleware
from app.routes import audit, policies, simulator, telemetry, threats
from app.websocket.telemetry_socket import telemetry_manager

load_dotenv()


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    telemetry_task = asyncio.create_task(telemetry_manager.telemetry_stream())
    try:
        yield
    finally:
        telemetry_task.cancel()


app = FastAPI(
    title="AegisNexus AI Backend",
    description="Enterprise AI governance and agent security platform backend.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GovernanceGuardMiddleware)

app.include_router(threats.router)
app.include_router(policies.router)
app.include_router(audit.router)
app.include_router(simulator.router)
app.include_router(telemetry.router)


@app.get("/")
async def root() -> dict[str, str]:
    return {
        "platform": "AegisNexus AI",
        "status": "operational",
        "mission": "Enterprise AI governance, agent security, and real-time telemetry.",
    }


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "healthy"}


@app.websocket("/ws/telemetry")
async def telemetry_socket(websocket: WebSocket) -> None:
    await telemetry_manager.handle_socket(websocket)
