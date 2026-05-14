from __future__ import annotations

from fastapi import APIRouter

from app.schemas import AttackSimulationRequest, AttackSimulationResponse, SimulationType
from app.services.simulation_service import simulation_service

router = APIRouter(prefix="/simulator", tags=["Attack Simulator"])


@router.post("/{simulation_type}", response_model=AttackSimulationResponse)
async def run_simulation(
    simulation_type: SimulationType,
    payload: AttackSimulationRequest,
) -> AttackSimulationResponse:
    return await simulation_service.run_simulation(simulation_type, payload.target_prompt)
