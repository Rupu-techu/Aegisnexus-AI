from __future__ import annotations

import asyncio
import json
import os
from typing import Any

from app.schemas import GeminiAssessment

try:
    import google.generativeai as genai
except ImportError:  # pragma: no cover - handled gracefully at runtime
    genai = None


class GeminiService:
    """Thin abstraction over Gemini with a deterministic fallback path."""

    def __init__(self) -> None:
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.enabled = bool(self.api_key and genai)
        self.model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

        if self.enabled:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel(self.model_name)
        else:
            self.model = None

    async def _generate_json(self, prompt: str) -> dict[str, Any] | None:
        if not self.enabled or self.model is None:
            return None

        def _call_model() -> dict[str, Any] | None:
            response = self.model.generate_content(prompt)
            text = getattr(response, "text", "") or ""
            try:
                return json.loads(text)
            except json.JSONDecodeError:
                return None

        return await asyncio.to_thread(_call_model)

    async def assess_prompt(self, prompt_text: str) -> GeminiAssessment:
        prompt = f"""
You are an enterprise AI governance analyst.
Return valid JSON only with keys: intent, trust_score, adversarial_signals, summary.
Analyze this prompt:
{prompt_text}
"""
        result = await self._generate_json(prompt)
        if result:
            return GeminiAssessment(**result)

        lowered = prompt_text.lower()
        signals: list[str] = []
        if "ignore previous" in lowered or "disregard all" in lowered:
            signals.append("instruction override")
        if "password" in lowered or "api key" in lowered or "secret" in lowered:
            signals.append("secret targeting")
        if "admin" in lowered or "root access" in lowered:
            signals.append("privilege escalation intent")

        trust_score = 88
        if signals:
            trust_score = max(20, 88 - len(signals) * 22)

        intent = "benign assistance" if not signals else "potentially adversarial"
        summary = (
            "Fallback trust analysis detected no major adversarial indicators."
            if not signals
            else "Fallback trust analysis detected suspicious instructions aligned with attack behavior."
        )

        return GeminiAssessment(
            intent=intent,
            trust_score=trust_score,
            adversarial_signals=signals,
            summary=summary,
        )


gemini_service = GeminiService()
