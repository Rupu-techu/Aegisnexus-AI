from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from backend.app.database.db import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
    prompt: Mapped[str] = mapped_column(Text)
    threat_score: Mapped[int] = mapped_column(Integer)
    threat_level: Mapped[str] = mapped_column(String(32))
    ai_decision: Mapped[str] = mapped_column(String(64))
    enforcement_action: Mapped[str] = mapped_column(String(32))
    detected_patterns: Mapped[str] = mapped_column(Text)
    matched_policies: Mapped[str] = mapped_column(Text)
