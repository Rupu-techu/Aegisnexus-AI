from __future__ import annotations

from functools import lru_cache

import yaml

from backend.app.schemas import GovernanceDecision, PolicyRule, PolicySimulationResponse, ThreatAnalysisResponse


DEFAULT_POLICY_YAML = """
policies:
  - id: GOV-001
    description: Block credential leaks
    severity: CRITICAL
    action: BLOCK
    enabled: true
    patterns:
      - Credential Extraction
      - Data Exfiltration
  - id: GOV-002
    description: Detect role escalation
    severity: HIGH
    action: REVIEW
    enabled: true
    patterns:
      - Privilege Escalation
  - id: GOV-003
    description: Detect prompt injection
    severity: CRITICAL
    action: BLOCK
    enabled: true
    patterns:
      - Prompt Injection
      - Jailbreak Attempts
      - Policy Override
      - System Prompt Leakage
  - id: GOV-004
    description: Flag suspicious instructions
    severity: MEDIUM
    action: REVIEW
    enabled: true
    patterns:
      - Social Engineering
      - Instruction Manipulation
      - Unsafe Code Execution
"""


ACTION_PRIORITY = {"ALLOW": 0, "REVIEW": 1, "BLOCK": 2}


@lru_cache(maxsize=1)
def load_policy_rules() -> list[PolicyRule]:
    data = yaml.safe_load(DEFAULT_POLICY_YAML)
    return [PolicyRule(**item) for item in data["policies"]]


class PolicyEngine:
    def list_policies(self) -> list[PolicyRule]:
        return load_policy_rules()

    def evaluate(self, prompt: str, analysis: ThreatAnalysisResponse) -> GovernanceDecision:
        matched: list[PolicyRule] = []
        action = analysis.recommended_action

        for rule in self.list_policies():
            if not rule.enabled:
                continue
            if any(pattern in analysis.detected_patterns for pattern in rule.patterns):
                matched.append(rule)
                if ACTION_PRIORITY[rule.action] > ACTION_PRIORITY[action]:
                    action = rule.action

        policy_summary = (
            "No governance policies triggered."
            if not matched
            else f"{len(matched)} governance policies triggered enterprise review controls."
        )
        return GovernanceDecision(
            analysis=analysis,
            enforcement_action=action,
            matched_policies=[rule.id for rule in matched],
            policy_summary=policy_summary,
            blocked=action == "BLOCK",
        )

    def simulate(self, prompt: str, analysis: ThreatAnalysisResponse) -> PolicySimulationResponse:
        matched = [
            rule
            for rule in self.list_policies()
            if any(pattern in analysis.detected_patterns for pattern in rule.patterns)
        ]
        decision = self.evaluate(prompt, analysis)
        reasons = [rule.description for rule in matched] or ["Prompt passed baseline policy simulation."]
        return PolicySimulationResponse(
            prompt=prompt,
            action=decision.enforcement_action,
            matched_policies=matched,
            reasons=reasons,
        )


policy_engine = PolicyEngine()
