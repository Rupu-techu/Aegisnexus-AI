from __future__ import annotations

from fastapi import APIRouter

from app.schemas import PolicyRule, PolicySimulationResponse, PromptPayload
from app.services.policy_engine import policy_engine
from app.services.threat_engine import threat_engine

router = APIRouter(prefix="/policies", tags=["Policies"])


@router.get("", response_model=list[PolicyRule])
async def list_policies() -> list[PolicyRule]:
    return policy_engine.list_policies()


@router.post("/simulate", response_model=PolicySimulationResponse)
async def simulate_policy(payload: PromptPayload) -> PolicySimulationResponse:
    analysis = await threat_engine.analyze_prompt(payload.prompt)
    return policy_engine.simulate(payload.prompt, analysis)
