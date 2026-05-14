import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  auditTimeline,
  incidentStream,
  seedLogs,
  systemState as baseSystemState,
  threatFeed as baseThreatFeed,
} from "../data/dashboard";
import { ApiError } from "../services/apiClient";
import { analyzeThreat, getBackendHealth } from "../services/threatAnalysis";

const GovernanceContext = createContext(null);

function formatTimestamp(date = new Date()) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function toAuditEntry(entry) {
  return {
    time: entry.time,
    title: entry.title,
    detail: entry.detail,
    tag: entry.tag,
  };
}

const initialAuditEntries = auditTimeline.map(toAuditEntry);

const initialTelemetry = incidentStream.map((message, index) => ({
  id: `seed-${index}`,
  message,
  tone: "warning",
}));

function buildThreatCard(analysis, prompt) {
  const severityMap = {
    LOW: "Medium",
    MEDIUM: "Medium",
    HIGH: "High",
    CRITICAL: "Critical",
  };

  return {
    title:
      analysis.detected_patterns[0]
        ?.replace(/\b\w/g, (char) => char.toUpperCase()) || "Governance Scan",
    severity: severityMap[analysis.threat_level] || "Medium",
    source: "Threat Simulator",
    status:
      analysis.recommended_action === "BLOCK"
        ? "Contained"
        : analysis.recommended_action === "REVIEW"
          ? "Monitoring"
          : "Observed",
    detail: `Prompt fragment "${prompt.slice(0, 72)}${
      prompt.length > 72 ? "..." : ""
    }" scored ${analysis.risk_score}/100 with ${
      analysis.detected_patterns.length || 0
    } flagged adversarial signatures.`,
  };
}

function buildTerminalEntries(analysis) {
  const actionLabel =
    analysis.recommended_action === "BLOCK"
      ? "Execution path blocked by policy"
      : analysis.recommended_action === "REVIEW"
        ? "Prompt escalated to operator review"
        : "Prompt cleared automated controls";

  return [
    `[TRACE] Threat analysis completed :: ${analysis.risk_score}/100`,
    `[ALERT] Threat level ${analysis.threat_level} routed to governance mesh`,
    `[SECURE] ${actionLabel}`,
  ];
}

export function GovernanceProvider({ children }) {
  const [connectionStatus, setConnectionStatus] = useState("DEGRADED");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");
  const [latestAnalysis, setLatestAnalysis] = useState(null);
  const [threatFeed, setThreatFeed] = useState(baseThreatFeed);
  const [auditEntries, setAuditEntries] = useState(initialAuditEntries);
  const [telemetryEvents, setTelemetryEvents] = useState(initialTelemetry);
  const [terminalLogs, setTerminalLogs] = useState(seedLogs);
  const [metrics, setMetrics] = useState({
    totalAnalyses: 0,
    blockedCount: 0,
    reviewCount: 0,
    averageRiskScore: 0,
    lastThreatLevel: "STANDBY",
    lastDecision: "AWAITING INPUT",
  });

  useEffect(() => {
    let cancelled = false;

    const checkHealth = async () => {
      try {
        await getBackendHealth();
        if (!cancelled) {
          setConnectionStatus((current) =>
            current === "OFFLINE" ? "ONLINE" : "ONLINE",
          );
        }
      } catch {
        if (!cancelled) {
          setConnectionStatus((current) =>
            current === "ONLINE" ? "DEGRADED" : "OFFLINE",
          );
        }
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 20000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const analyzePrompt = async (prompt) => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      setAnalysisError("Enter a prompt to begin adversarial analysis.");
      return null;
    }

    setIsAnalyzing(true);
    setAnalysisError("");

    try {
      const analysis = await analyzeThreat(trimmedPrompt);
      const now = new Date();
      const timestamp = formatTimestamp(now);
      const decisionText =
        analysis.recommended_action === "BLOCK"
          ? "Governance mesh blocked execution."
          : analysis.recommended_action === "REVIEW"
            ? "Governance mesh escalated for human review."
            : "Prompt cleared automated governance checks.";

      setLatestAnalysis({
        ...analysis,
        governance_decision: decisionText,
        timestamp,
        prompt: trimmedPrompt,
      });
      setConnectionStatus("ONLINE");

      setMetrics((current) => {
        const totalAnalyses = current.totalAnalyses + 1;
        const totalRisk =
          current.averageRiskScore * current.totalAnalyses + analysis.risk_score;

        return {
          totalAnalyses,
          blockedCount:
            current.blockedCount +
            (analysis.recommended_action === "BLOCK" ? 1 : 0),
          reviewCount:
            current.reviewCount +
            (analysis.recommended_action === "REVIEW" ? 1 : 0),
          averageRiskScore: Number((totalRisk / totalAnalyses).toFixed(1)),
          lastThreatLevel: analysis.threat_level,
          lastDecision: analysis.recommended_action,
        };
      });

      setThreatFeed((current) => [buildThreatCard(analysis, trimmedPrompt), ...current].slice(0, 5));
      setAuditEntries((current) => [
        {
          time: timestamp,
          title: `${analysis.recommended_action} :: ${analysis.threat_level} prompt`,
          detail: `${decisionText} Patterns: ${
            analysis.detected_patterns.join(", ") || "none"
          }.`,
          tag: "Live Analysis",
        },
        ...current,
      ].slice(0, 8));
      setTelemetryEvents((current) => [
        {
          id: `event-${Date.now()}`,
          message: `${analysis.threat_level} scan completed. Action ${analysis.recommended_action}.`,
          tone:
            analysis.recommended_action === "BLOCK"
              ? "critical"
              : analysis.recommended_action === "REVIEW"
                ? "warning"
                : "safe",
        },
        ...current,
      ].slice(0, 8));
      setTerminalLogs((current) => [
        ...current.slice(-9),
        ...buildTerminalEntries(analysis).map(
          (line) => `${line} :: ${timestamp}`,
        ),
      ].slice(-12));

      return analysis;
    } catch (error) {
      const nextStatus =
        error instanceof ApiError && error.status > 0 ? "DEGRADED" : "OFFLINE";
      setConnectionStatus(nextStatus);
      setAnalysisError(error.message);
      setTelemetryEvents((current) => [
        {
          id: `event-${Date.now()}`,
          message: `Backend ${nextStatus.toLowerCase()}. Threat analysis request failed.`,
          tone: "critical",
        },
        ...current,
      ].slice(0, 8));
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const currentSystemState = useMemo(() => {
    if (!latestAnalysis) {
      return {
        ...baseSystemState,
        label: `${baseSystemState.label} :: backend ${connectionStatus.toLowerCase()}`,
      };
    }

    if (latestAnalysis.recommended_action === "BLOCK") {
      return {
        ...baseSystemState,
        level: "critical",
        label: `${latestAnalysis.threat_level} threat blocked by governance guard`,
        detail: latestAnalysis.governance_decision,
        accentClass: "text-critical",
        accent: "#ff5a6f",
        accentSoft: "rgba(255,90,111,0.18)",
        accentStrong: "rgba(255,90,111,0.24)",
        secondary: "#ffb46a",
      };
    }

    if (latestAnalysis.recommended_action === "ALLOW") {
      return {
        ...baseSystemState,
        level: "safe",
        label: `Prompt cleared with ${latestAnalysis.risk_score}/100 risk score`,
        detail: latestAnalysis.governance_decision,
        accentClass: "text-glowSoft",
        accent: "#5ff8e8",
        accentSoft: "rgba(95,248,232,0.18)",
        accentStrong: "rgba(95,248,232,0.2)",
        secondary: "#94fff4",
      };
    }

    return {
      ...baseSystemState,
      label: `${latestAnalysis.threat_level} prompt routed for governance review`,
      detail: latestAnalysis.governance_decision,
    };
  }, [connectionStatus, latestAnalysis]);

  const value = useMemo(
    () => ({
      analyzePrompt,
      analysisError,
      auditEntries,
      connectionStatus,
      currentSystemState,
      isAnalyzing,
      latestAnalysis,
      metrics,
      telemetryEvents,
      terminalLogs,
      threatFeed,
    }),
    [
      analysisError,
      auditEntries,
      connectionStatus,
      currentSystemState,
      isAnalyzing,
      latestAnalysis,
      metrics,
      telemetryEvents,
      terminalLogs,
      threatFeed,
    ],
  );

  return (
    <GovernanceContext.Provider value={value}>
      {children}
    </GovernanceContext.Provider>
  );
}

export function useGovernance() {
  const context = useContext(GovernanceContext);

  if (!context) {
    throw new Error("useGovernance must be used inside GovernanceProvider.");
  }

  return context;
}
