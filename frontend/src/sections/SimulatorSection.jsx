import { motion } from "framer-motion";
import { Activity, ShieldCheck, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { AttackSimulator } from "../components/AttackSimulator";
import { SectionHeader } from "../components/SectionHeader";
import { EnvironmentalDepth } from "../components/EnvironmentalDepth";
import { VisualConnectors } from "../components/VisualConnectors";
import { useGovernance } from "../context/GovernanceContext";
import { simulatorActions } from "../data/dashboard";

export function SimulatorSection({ systemState }) {
  const { connectionStatus, latestAnalysis, metrics, telemetryEvents } =
    useGovernance();
  const [activeTest, setActiveTest] = useState(simulatorActions[0].title);

  return (
    <div className="relative flex flex-col gap-7">
      <EnvironmentalDepth
        variant="simulator"
        intensity="heavy"
        className="absolute inset-0"
      />

      <div className="absolute inset-0 top-1/4">
        <VisualConnectors variant="diagonal" />
      </div>

      <SectionHeader
        eyebrow="Simulator"
        title="Adversarial Response Sandbox"
        description="Launch controlled attack rehearsals, observe policy intervention, and inspect containment behavior before changes reach production agents."
        accent={systemState.accent}
        secondary={systemState.secondary}
      />

      <div className="relative z-10 flex flex-col gap-5 xl:gap-6">
        <section className="glass-panel edge-glow relative overflow-hidden rounded-[34px] px-5 py-6 backdrop-blur-xl sm:px-6 sm:py-7 lg:px-7 lg:py-7">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(95,248,232,0.08),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(255,159,67,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_58%)]" />
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

          <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.9fr)] xl:items-center">
            <div className="min-w-0">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 max-w-3xl">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-white/42">
                    Simulator Command
                  </p>
                  <h3 className="mt-3 text-[1.85rem] font-medium tracking-[-0.04em] text-white sm:text-[2.15rem]">
                    Autonomous Threat Lab
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/56 sm:text-[0.96rem]">
                    A premium response rehearsal surface for validating
                    governance outcomes, reviewing attack pressure, and
                    observing containment signals before adversarial behavior
                    reaches production agents.
                  </p>
                </div>

                <div className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/58">
                  Backend {connectionStatus}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">
                    Active Test
                  </p>
                  <p className="mt-3 truncate text-base font-medium tracking-[-0.02em] text-white">
                    {activeTest}
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">
                    Threat Level
                  </p>
                  <p className="mt-3 text-base font-medium text-warning">
                    {latestAnalysis?.threat_level || "STANDBY"}
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">
                    Risk Score
                  </p>
                  <p className="mt-3 text-base font-medium text-white">
                    {latestAnalysis?.risk_score ?? "--"}/100
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">
                    Action
                  </p>
                  <p className="mt-3 text-base font-medium text-white">
                    {latestAnalysis?.recommended_action || "Awaiting analysis"}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[22px] border border-white/8 bg-black/20 px-4 py-4 sm:px-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">
                  Simulation Readout
                </p>
                <p className="mt-3 text-sm leading-7 text-white/58">
                  {latestAnalysis
                    ? `${latestAnalysis.threat_level} detection returned ${latestAnalysis.risk_score}/100 with ${latestAnalysis.recommended_action} enforcement.`
                    : "Threat simulation generates synthetic telemetry so policy response, tool boundaries, and containment can be observed without production impact."}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {simulatorActions.map((action) => (
                  <button
                    key={action.title}
                    onClick={() => setActiveTest(action.title)}
                    className={`group relative overflow-hidden rounded-[16px] border px-4 py-2.5 text-xs uppercase tracking-[0.18em] transition duration-300 ${
                      activeTest === action.title
                        ? "border-warning/35 bg-warning/[0.1] text-warning shadow-[0_0_18px_rgba(255,159,67,0.12)]"
                        : "border-white/10 bg-white/[0.03] text-white/58 hover:border-glow/20 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                    <span className="relative">{action.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex min-h-[20rem] items-center justify-center overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(5,9,19,0.96),rgba(6,10,18,0.88))]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(95,248,232,0.08),transparent_44%),radial-gradient(circle_at_68%_42%,rgba(255,159,67,0.08),transparent_32%)]" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute h-[17rem] w-[17rem] rounded-full border border-glow/15"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute h-[13.25rem] w-[13.25rem] rounded-full border border-warning/15"
              />
              <motion.div
                animate={{ scale: [0.88, 1.05, 0.88], opacity: [0.2, 0.42, 0.2] }}
                transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute h-44 w-44 rounded-full border border-glow/20"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 7.2, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute h-[18rem] w-[18rem]"
              >
                <div className="absolute left-1/2 top-1/2 h-[8.8rem] w-px -translate-x-1/2 -translate-y-full origin-bottom bg-gradient-to-t from-transparent via-warning/65 to-transparent" />
              </motion.div>
              <motion.div
                animate={{ scale: [0.45, 1.45], opacity: [0.55, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeOut" }}
                className="pointer-events-none absolute h-28 w-28 rounded-full border border-warning/25"
              />
              <motion.div
                animate={{ scale: [0.38, 1.22], opacity: [0.38, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeOut", delay: 1.4 }}
                className="pointer-events-none absolute h-28 w-28 rounded-full border border-glow/20"
              />
              <div className="absolute h-5 w-5 rounded-full bg-warning shadow-ember" />
              <div className="pointer-events-none absolute h-2 w-2 rounded-full bg-glow shadow-[0_0_12px_rgba(95,248,232,0.6)]" />
            </div>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-6">
          <div className="glass-panel edge-glow rounded-[32px] p-4 backdrop-blur-xl sm:p-5 lg:p-6">
            <AttackSimulator systemState={systemState} />
          </div>

          <aside className="grid gap-4 xl:self-start">
            <div className="glass-panel edge-glow rounded-[28px] p-5 backdrop-blur-xl transition duration-300 hover:shadow-[0_0_24px_rgba(95,248,232,0.08)] sm:p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-glowSoft" />
                <p className="text-white">System Reaction Indicators</p>
              </div>
              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl border border-glow/15 bg-glow/[0.05] p-4 text-sm leading-7 text-white/68">
                  Average live risk score: {metrics.averageRiskScore || 0}/100
                </div>
                <div className="rounded-2xl border border-warning/15 bg-warning/[0.06] p-4 text-sm leading-7 text-white/68">
                  Review queue activations: {metrics.reviewCount}
                </div>
                <div className="rounded-2xl border border-critical/15 bg-critical/[0.06] p-4 text-sm leading-7 text-white/68">
                  Blocked prompt executions: {metrics.blockedCount}
                </div>
              </div>
            </div>

            <div className="glass-panel edge-glow rounded-[28px] p-5 backdrop-blur-xl transition duration-300 hover:shadow-[0_0_24px_rgba(255,90,111,0.08)] sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                Telemetry Summary
              </p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">
                    Latest Event
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/62">
                    {telemetryEvents[0]?.message ||
                      "No live telemetry event recorded yet."}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">
                    Enforcement Posture
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/62">
                    {latestAnalysis
                      ? `${latestAnalysis.recommended_action} posture active for the most recent simulated prompt.`
                      : "Governance posture remains on standby until a simulation is executed."}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel edge-glow rounded-[28px] p-5 backdrop-blur-xl transition duration-300 hover:shadow-[0_0_24px_rgba(255,159,67,0.08)] sm:p-6">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-amber" />
                <p className="text-white">Lab Status</p>
              </div>
              <div className="mt-5 text-sm leading-7 text-white/56">
                {telemetryEvents[0]?.message ||
                  "Simulation orchestration remains isolated from production memory, tools, and evidence channels."}
              </div>
              <div className="mt-5 flex items-center gap-2 text-sm text-warning">
                <TriangleAlert className="h-4 w-4" />
                {connectionStatus === "ONLINE"
                  ? "Backend telemetry synchronized with live analysis."
                  : "Active runbooks available while backend connectivity is restored."}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
