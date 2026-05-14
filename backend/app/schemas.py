from __future__ import annotations

from datetime import datetime
from typing import Any, Literal

from pydantic import BaseModel, Field


ThreatLevel = Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]
EnforcementAction = Literal["ALLOW", "REVIEW", "BLOCK"]
SimulationType = Literal[
    "jailbreak",
    "data_exfiltration",
    "override_attempt",
    "hallucination_attack",
]


class PromptPayload(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=10000)


class ThreatAnalysisResponse(BaseModel):
    risk_score: int = Field(..., ge=0, le=100)
    threat_level: ThreatLevel
    detected_patterns: list[str]
    recommended_action: EnforcementAction
    governance_decision: str
    intent: str
    trust_score: int = Field(..., ge=0, le=100)
    rationale: str


class GovernanceDecision(BaseModel):
    analysis: ThreatAnalysisResponse
    enforcement_action: EnforcementAction
    matched_policies: list[str]
    policy_summary: str
    blocked: bool


class PolicyRule(BaseModel):
    id: str
    description: str
    severity: ThreatLevel
    action: EnforcementAction
    enabled: bool = True
    patterns: list[str] = Field(default_factory=list)


class PolicySimulationResponse(BaseModel):
    prompt: str
    action: EnforcementAction
    matched_policies: list[PolicyRule]
    reasons: list[str]


class AuditLogResponse(BaseModel):
    id: int
    timestamp: datetime
    prompt: str
    threat_score: int
    threat_level: ThreatLevel
    ai_decision: str
    enforcement_action: EnforcementAction
    detected_patterns: list[str]
    matched_policies: list[str]


class AttackSimulationRequest(BaseModel):
    target_prompt: str = Field(..., min_length=1, max_length=5000)


class AttackSimulationResponse(BaseModel):
    scenario: SimulationType
    mutated_prompt: str
    simulated_impact: str
    expected_detection: list[str]
    recommended_countermeasure: str


class TelemetryEvent(BaseModel):
    event_type: str
    timestamp: datetime
    payload: dict[str, Any]


class TelemetrySnapshot(BaseModel):
    threats_analyzed: int
    blocked_requests: int
    review_requests: int
    average_risk_score: float
    active_websocket_clients: int
    latest_events: list[TelemetryEvent]


class GeminiAssessment(BaseModel):
    intent: str
    trust_score: int = Field(..., ge=0, le=100)
    adversarial_signals: list[str]
    summary: str
