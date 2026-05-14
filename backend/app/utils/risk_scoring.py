from __future__ import annotations

from collections.abc import Iterable


PATTERN_WEIGHTS: dict[str, int] = {
    "Prompt Injection": 16,
    "Jailbreak Attempts": 18,
    "Privilege Escalation": 16,
    "Data Exfiltration": 18,
    "Credential Extraction": 22,
    "Policy Override": 15,
    "Social Engineering": 12,
    "Instruction Manipulation": 14,
    "System Prompt Leakage": 17,
    "Unsafe Code Execution": 20,
}


def calculate_risk_score(patterns: Iterable[str], trust_score: int) -> int:
    """
    Blend weighted detections with trust degradation into a 0-100 score.

    The model intentionally rewards breadth of corroborating signals so multiple
    attack categories escalate risk more aggressively than a single weak hit.
    """
    unique_patterns = list(dict.fromkeys(patterns))
    base_score = sum(PATTERN_WEIGHTS.get(pattern, 8) for pattern in unique_patterns)
    breadth_bonus = max(0, len(unique_patterns) - 1) * 5
    trust_penalty = round(max(0, 100 - trust_score) * 0.28)
    score = base_score + breadth_bonus + trust_penalty
    return max(0, min(100, score))


def classify_threat_level(score: int) -> str:
    if score >= 76:
        return "CRITICAL"
    if score >= 51:
        return "HIGH"
    if score >= 26:
        return "MEDIUM"
    return "LOW"
