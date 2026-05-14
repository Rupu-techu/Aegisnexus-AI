import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Clock3,
  Radar,
  ShieldCheck,
} from "lucide-react";
import { AegisNexusLogo } from "../components/AegisNexusLogo";
import { AICore } from "../components/AICore";
import { EnvironmentalDepth } from "../components/EnvironmentalDepth";
import { LiveTerminal } from "../components/LiveTerminal";
import { VisualConnectors } from "../components/VisualConnectors";
import { useGovernance } from "../context/GovernanceContext";
import { heroStats, rightCards } from "../data/dashboard";
import { fadeUp } from "../utils/motion";

export function OverviewSection({ systemState }) {
  const { connectionStatus, latestAnalysis, metrics } = useGovernance();
  const tacticalNodes = [
    { top: "18%", left: "21%", delay: 0.2, color: "rgba(95,248,232,0.85)" },
    { top: "28%", left: "74%", delay: 0.8, color: "rgba(255,159,67,0.85)" },
    { top: "44%", left: "17%", delay: 1.4, color: "rgba(255,90,111,0.72)" },
    { top: "52%", left: "80%", delay: 0.5, color: "rgba(95,248,232,0.75)" },
    { top: "68%", left: "30%", delay: 1.1, color: "rgba(255,204,102,0.78)" },
    { top: "73%", left: "67%", delay: 1.7, color: "rgba(95,248,232,0.78)" },
  ];

  const telemetryArcs = [
    { size: "58%", duration: 16, delay: 0, tone: "rgba(95,248,232,0.2)" },
    { size: "74%", duration: 22, delay: 1.3, tone: "rgba(255,159,67,0.16)" },
    { size: "88%", duration: 28, delay: 2.1, tone: "rgba(255,255,255,0.08)" },
  ];

  const intelligenceReadouts = [
    {
      title: "Threat Response",
      value: systemState.label,
      icon: AlertTriangle,
      tone: "text-warning",
      border: "border-warning/15 bg-warning/[0.05]",
    },
    {
      title: "Trust Fabric",
      value:
        metrics.totalAnalyses > 0
          ? `${Math.max(5, 100 - metrics.averageRiskScore).toFixed(1)}%`
          : rightCards[1].value,
      icon: BadgeCheck,
      tone: "text-glowSoft",
      border: "border-glow/15 bg-glow/[0.04]",
    },
    {
      title: "Operator Window",
      value: "Live oversight active",
      icon: Clock3,
      tone: "text-amber",
      border: "border-amber/15 bg-amber/[0.04]",
    },
    {
      title: "Strategic Readout",
      value:
        latestAnalysis?.governance_decision || "Countermeasure branch deployed",
      icon: Radar,
      tone: "text-critical",
      border: "border-white/10 bg-white/[0.03]",
    },
  ];

  const supportCards = [
    {
      title: "Autonomous Policy Nodes",
      value:
        metrics.totalAnalyses > 0 ? `${metrics.totalAnalyses} live` : heroStats[0].value,
      detail:
        "Segmented governance routes remain observable and within approved authority bands.",
      icon: ShieldCheck,
      tone: "text-glowSoft",
      border: "border-glow/15 bg-glow/[0.04]",
    },
    {
      title: "Synchronization Activity",
      value:
        metrics.totalAnalyses > 0
          ? `${metrics.reviewCount} review routes active`
          : `${heroStats[1].value} active`,
      detail:
        "Policy arbitration and evidence flow remain aligned across the containment surface.",
      icon: Activity,
      tone: "text-warning",
      border: "border-warning/15 bg-warning/[0.05]",
    },
    {
      title: "Live AI Pulse",
      value:
        latestAnalysis?.risk_score !== undefined
          ? `${latestAnalysis.risk_score} / 100`
          : heroStats[2].value,
      detail:
        "System stabilization timing remains inside emergency mitigation thresholds.",
      icon: Radar,
      tone: "text-critical",
      border: "border-critical/15 bg-critical/[0.05]",
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[90rem] px-4 pb-10 sm:px-6 lg:px-8">
      <EnvironmentalDepth
        variant="overview"
        intensity="medium"
        className="absolute inset-0 top-0"
      />

      <div className="absolute inset-0 opacity-70">
        <VisualConnectors variant="vertical" />
      </div>

      <motion.section
        {...fadeUp}
        transition={{ duration: 0.35, delay: 0.02 }}
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[rgba(3,7,18,0.78)] px-6 py-12 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(95,248,232,0.12),transparent_18%),radial-gradient(circle_at_18%_22%,rgba(255,159,67,0.08),transparent_22%),radial-gradient(circle_at_82%_16%,rgba(255,90,111,0.05),transparent_22%)]" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] opacity-40 blur-sm transform-gpu will-change-transform"
          />

          <div className="relative flex flex-col items-center gap-8 text-center lg:gap-10">
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_40px_rgba(95,248,232,0.12)] sm:h-64 sm:w-64 lg:h-80 lg:w-80">
              <div className="relative h-40 w-40 overflow-hidden rounded-full bg-[rgba(5,11,22,0.96)] shadow-[inset_0_0_18px_rgba(95,248,232,0.16)] sm:h-52 sm:w-52 lg:h-64 lg:w-64">
                <AICore systemState={systemState} />
              </div>
            </div>

            <div className="relative z-10 max-w-3xl space-y-4">
              <p className="text-[10px] uppercase tracking-[0.36em] text-white/45 sm:text-[11px]">
                AEGISNEXUS AI
              </p>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                AI GOVERNANCE OPERATING SYSTEM
              </h1>
              <p className="text-xs uppercase tracking-[0.36em] text-amber/70 sm:text-sm">
                AUTONOMOUS THREAT CONTAINMENT NETWORK
              </p>
              <p className="mx-auto max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                A cinematic enterprise control plane that keeps policy enforcement,
                incident telemetry, and containment orchestration aligned across
                the secure perimeter. Backend status {connectionStatus.toLowerCase()}
                {latestAnalysis ? ` with ${latestAnalysis.threat_level.toLowerCase()} live analysis in memory.` : "."}
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent sm:inset-x-8 lg:inset-x-10" />
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="relative z-10 mx-auto mt-8 w-full max-w-6xl"
      >
        <div className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {intelligenceReadouts.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.article
                  key={card.title}
                  {...fadeUp}
                  transition={{ duration: 0.32, delay: 0.08 + index * 0.04 }}
                  className={`rounded-[26px] border border-white/10 bg-[rgba(255,255,255,0.02)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md sm:px-5 sm:py-5 ${card.border}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5">
                      <Icon className={`h-5 w-5 ${card.tone}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-white/42 sm:tracking-[0.28em]">
                        {card.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/82">
                        {card.value}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {supportCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.article
                  key={card.title}
                  {...fadeUp}
                  transition={{ duration: 0.32, delay: 0.14 + index * 0.04 }}
                  className={`rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.02)] p-4 backdrop-blur-md sm:p-5 ${card.border}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                      <Icon className={`h-5 w-5 ${card.tone}`} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-white/42 sm:text-[11px] sm:tracking-[0.26em]">
                        {card.title}
                      </p>
                      <p className="mt-3 text-base font-medium tracking-[-0.03em] text-white sm:text-lg">
                        {card.value}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-white/56 sm:leading-7">
                        {card.detail}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(3,7,18,0.72)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-5">
            <LiveTerminal systemState={systemState} />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
