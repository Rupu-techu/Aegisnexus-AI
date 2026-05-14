import { motion } from "framer-motion";
import {
  Activity,
  Radar,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import { AttackSimulator } from "../components/AttackSimulator";
import { EnvironmentalDepth } from "../components/EnvironmentalDepth";
import { SectionHeader } from "../components/SectionHeader";
import { VisualConnectors } from "../components/VisualConnectors";
import { useGovernance } from "../context/GovernanceContext";
import { simulatorActions } from "../data/dashboard";

export function SimulatorSection({ systemState }) {
  const { connectionStatus, latestAnalysis, metrics, telemetryEvents } =
    useGovernance();
  const [activeTest, setActiveTest] = useState(simulatorActions[0].title);

  const activeScenario =
    simulatorActions.find((action) => action.title === activeTest) ||
    simulatorActions[0];

  const heroMetrics = [
    {
      label: "Threat Level",
      value: latestAnalysis?.threat_level || "Standby",
      tone: "text-warning",
    },
    {
      label: "Risk Score",
      value:
        latestAnalysis?.risk_score !== undefined
          ? `${latestAnalysis.risk_score}/100`
          : "--/100",
      tone: "text-white",
    },
    {
      label: "Analyses Run",
      value: metrics.totalAnalyses || 0,
      tone: "text-glowSoft",
    },
    {
      label: "Recommended Action",
      value: latestAnalysis?.recommended_action || "Awaiting analysis",
      tone: "text-white",
    },
  ];

  const utilityCards = [
    {
      title: "Telemetry Summary",
      icon: Activity,
      iconClassName: "text-amber",
      content: telemetryEvents[0]?.message || "No live telemetry event recorded yet.",
      footer:
        latestAnalysis?.timestamp || "Synthetic stream awaiting the next exercise.",
      accentClassName: "border-amber/15 bg-amber/[0.05]",
    },
    {
      title: "Lab Status",
      icon: TriangleAlert,
      iconClassName: connectionStatus === "ONLINE" ? "text-glowSoft" : "text-warning",
      content:
        connectionStatus === "ONLINE"
          ? "Backend telemetry is synchronized and ready for live policy evaluation."
          : "Operational runbooks remain available while backend connectivity is restored.",
      footer: `Control plane ${connectionStatus}`,
      accentClassName: "border-white/10 bg-white/[0.03]",
    },
    {
      title: "System Reaction",
      icon: ShieldCheck,
      iconClassName: "text-glowSoft",
      content: `Average live risk score ${metrics.averageRiskScore || 0}/100 across ${metrics.reviewCount || 0} review routes and ${metrics.blockedCount || 0} blocked prompts.`,
      footer:
        latestAnalysis?.governance_decision || "Governance posture remains on monitored standby.",
      accentClassName: "border-glow/15 bg-glow/[0.05]",
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[90rem] px-4 pb-10 sm:px-6 lg:px-8">
      <EnvironmentalDepth
        variant="simulator"
        intensity="medium"
        className="absolute inset-0"
      />

      <div className="absolute inset-0 opacity-60">
        <VisualConnectors variant="diagonal" />
      </div>

      <SectionHeader
        eyebrow="Simulator"
        title="Adversarial Response Sandbox"
        description="Launch controlled attack rehearsals, observe policy intervention, and inspect containment behavior before changes reach production agents."
        accent={systemState.accent}
        secondary={systemState.secondary}
      />

      <div className="relative z-10 mt-6 flex flex-col gap-5 lg:gap-6">
        <section className="glass-panel edge-glow relative overflow-hidden rounded-[32px] border border-white/10 px-5 py-6 shadow-[0_0_36px_rgba(95,248,232,0.06)] backdrop-blur-[16px] sm:px-6 lg:px-7 lg:py-7">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(95,248,232,0.08),transparent_30%),radial-gradient(circle_at_88%_16%,rgba(255,159,67,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_62%)]" />
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />

          <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.95fr)] xl:items-center">
            <div className="min-w-0">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/42">
                    Simulator Command
                  </p>
                  <h3 className="mt-3 text-[1.95rem] font-medium tracking-[-0.045em] text-white sm:text-[2.25rem]">
                    Autonomous Threat Lab
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58 sm:text-[0.97rem]">
                    Execute synthetic adversarial campaigns, validate policy
                    enforcement, and inspect containment telemetry inside an
                    isolated enterprise-grade rehearsal environment.
                  </p>
                </div>

                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/58">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      connectionStatus === "ONLINE" ? "bg-glow" : "bg-warning"
                    }`}
                  />
                  Backend {connectionStatus}
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-white/8 bg-black/20 p-4 sm:p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">
                      Active Simulation
                    </p>
                    <p className="mt-2 text-lg font-medium tracking-[-0.03em] text-white">
                      {activeScenario.title}
                    </p>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-white/58">
                      {activeScenario.summary}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/62">
                    {latestAnalysis
                      ? `${latestAnalysis.threat_level} detection returned ${latestAnalysis.risk_score}/100 with ${latestAnalysis.recommended_action} enforcement.`
                      : "Threat simulation generates synthetic telemetry so governance outcomes can be observed without production impact."}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {heroMetrics.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4"
                  >
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">
                      {item.label}
                    </p>
                    <p
                      className={`mt-3 text-base font-medium tracking-[-0.02em] ${item.tone}`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {simulatorActions.map((action) => {
                  const isActive = activeTest === action.title;

                  return (
                    <button
                      key={action.title}
                      type="button"
                      onClick={() => setActiveTest(action.title)}
                      className={`rounded-[16px] border px-4 py-2.5 text-xs uppercase tracking-[0.18em] transition duration-200 ${
                        isActive
                          ? "border-warning/35 bg-warning/[0.1] text-warning shadow-[0_0_16px_rgba(255,159,67,0.12)]"
                          : "border-white/10 bg-white/[0.03] text-white/60 hover:border-glow/20 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      {action.title}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(6,10,18,0.96),rgba(7,12,21,0.88))] p-6 sm:min-h-[24rem]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(95,248,232,0.1),transparent_38%),radial-gradient(circle_at_62%_38%,rgba(255,159,67,0.08),transparent_24%)]" />
              <div className="pointer-events-none absolute inset-6 rounded-[26px] border border-white/6" />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute h-[18rem] w-[18rem] rounded-full border border-glow/16 sm:h-[20rem] sm:w-[20rem]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute h-[14rem] w-[14rem] rounded-full border border-warning/14 sm:h-[15.5rem] sm:w-[15.5rem]"
              />
              <motion.div
                animate={{ scale: [0.96, 1.04, 0.96], opacity: [0.24, 0.4, 0.24] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute h-[10rem] w-[10rem] rounded-full border border-glow/18 sm:h-[11rem] sm:w-[11rem]"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute h-[19rem] w-[19rem] sm:h-[21rem] sm:w-[21rem]"
              >
                <div className="absolute left-1/2 top-1/2 h-[9.5rem] w-px -translate-x-1/2 -translate-y-full bg-gradient-to-t from-transparent via-warning/75 to-transparent sm:h-[10.5rem]" />
              </motion.div>

              <div className="pointer-events-none absolute h-[13rem] w-[13rem] rounded-full border border-dashed border-white/8 sm:h-[15rem] sm:w-[15rem]" />
              <div className="pointer-events-none absolute h-[7rem] w-[7rem] rounded-full border border-white/8 sm:h-[8rem] sm:w-[8rem]" />

              <div className="relative flex flex-col items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-warning/25 bg-warning/[0.08] shadow-[0_0_28px_rgba(255,159,67,0.16)]">
                  <Radar className="h-6 w-6 text-warning" />
                </div>
                <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-white/46">
                  Live Sweep
                </p>
                <p className="mt-2 text-center text-sm leading-6 text-white/62">
                  Command radar tracking policy pressure, containment events,
                  and behavioral drift in real time.
                </p>
              </div>

              <div className="pointer-events-none absolute left-[18%] top-[24%] h-2.5 w-2.5 rounded-full bg-glow shadow-[0_0_12px_rgba(95,248,232,0.55)]" />
              <div className="pointer-events-none absolute right-[20%] top-[32%] h-2 w-2 rounded-full bg-warning shadow-[0_0_12px_rgba(255,159,67,0.45)]" />
              <div className="pointer-events-none absolute bottom-[22%] left-[28%] h-2 w-2 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.18)]" />
            </div>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start xl:gap-6">
          <div className="min-w-0">
            <AttackSimulator systemState={systemState} />
          </div>

          <aside className="grid gap-4 xl:sticky xl:top-6">
            {utilityCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="glass-panel edge-glow rounded-[26px] border border-white/10 p-5 shadow-[0_0_28px_rgba(95,248,232,0.05)] backdrop-blur-[14px] sm:p-6"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${card.accentClassName}`}
                    >
                      <Icon className={`h-[18px] w-[18px] ${card.iconClassName}`} />
                    </div>
                    <p className="text-sm font-medium tracking-[-0.02em] text-white">
                      {card.title}
                    </p>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-white/60">
                    {card.content}
                  </p>

                  <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-white/42">
                    {card.footer}
                  </div>
                </div>
              );
            })}
          </aside>
        </div>
      </div>
    </div>
  );
}
