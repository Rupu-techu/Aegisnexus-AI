from __future__ import annotations

import json

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database.models import AuditLog
from app.schemas import AuditLogResponse, GovernanceDecision


class AuditService:
    def log_decision(self, db: Session, prompt: str, decision: GovernanceDecision) -> AuditLog:
        record = AuditLog(
            prompt=prompt,
            threat_score=decision.analysis.risk_score,
            threat_level=decision.analysis.threat_level,
            ai_decision=decision.analysis.rationale,
            enforcement_action=decision.enforcement_action,
            detected_patterns=json.dumps(decision.analysis.detected_patterns),
            matched_policies=json.dumps(decision.matched_policies),
        )
        db.add(record)
        db.commit()
        db.refresh(record)
        return record

    def list_logs(self, db: Session, limit: int = 100) -> list[AuditLogResponse]:
        query = select(AuditLog).order_by(AuditLog.timestamp.desc()).limit(limit)
        records = db.execute(query).scalars().all()
        return [
            AuditLogResponse(
                id=record.id,
                timestamp=record.timestamp,
                prompt=record.prompt,
                threat_score=record.threat_score,
                threat_level=record.threat_level,
                ai_decision=record.ai_decision,
                enforcement_action=record.enforcement_action,
                detected_patterns=json.loads(record.detected_patterns),
                matched_policies=json.loads(record.matched_policies),
            )
            for record in records
        ]


audit_service = AuditService()
