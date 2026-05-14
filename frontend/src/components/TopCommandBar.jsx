import { motion } from "framer-motion";
import { Activity, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useGovernance } from "../context/GovernanceContext";
import { sectionMeta } from "../data/dashboard";

export function TopCommandBar({ activeSection, systemState }) {
  const { connectionStatus, metrics } = useGovernance();
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 1000 * 30);

    return () => clearInterval(timer);
  }, []);

  const meta = sectionMeta[activeSection];
  const statusStyles = {
    ONLINE: "border-glow/20 bg-glow/[0.08] text-glowSoft",
    OFFLINE: "border-critical/25 bg-critical/[0.1] text-critical",
    DEGRADED: "border-warning/25 bg-warning/[0.1] text-warning",
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="glass-panel edge-glow relative mb-4 overflow-hidden rounded-[24px] px-4 py-4 backdrop-blur-md sm:mb-5 sm:px-6 sm:py-5 lg:mb-6 lg:px-8 lg:py-6"
    >
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-glow/20 to-transparent" />
      <div className="pointer-events-none absolute -right-10 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,159,67,0.08),transparent_68%)] blur-md" />
      <div className="pointer-events-none absolute -left-6 top-0 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(95,248,232,0.06),transparent_70%)] blur-md" />
      <div className="pointer-events-none absolute inset-x-[18%] bottom-0 h-12 bg-[linear-gradient(180deg,transparent,rgba(95,248,232,0.04)_70%,transparent)] blur-lg" />

      <div className="relative flex flex-col gap-4 lg:gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/48 sm:text-[11px] sm:tracking-[0.3em]">
              {meta.code}
            </span>
            <span
              className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.28em] sm:text-[11px] sm:tracking-[0.3em]"
              style={{
                borderColor: systemState.accentSoft,
                backgroundColor: "rgba(255,255,255,0.03)",
                color: systemState.secondary,
              }}
            >
              {meta.eyeline}
            </span>
          </div>
          <div className="mt-3 sm:mt-4">
            <h2 className="bg-[linear-gradient(90deg,#ffffff,#f6d188_60%,#ffffff)] bg-clip-text text-[1.35rem] font-semibold tracking-[-0.04em] text-transparent sm:text-[1.75rem] lg:text-[1.95rem]">
              {meta.status}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/48 sm:leading-7">
              AegisNexus autonomous governance operating surface with
              cinematic telemetry, containment oversight, and enterprise
              threat orchestration.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[420px]">
          <div className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-5">
            <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.24em] text-white/42 sm:text-[11px] sm:tracking-[0.28em]">
              <span className="inline-flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-warning" />
              Threat State
              </span>
              <span
                className={`rounded-full border px-2.5 py-1 text-[9px] tracking-[0.22em] ${statusStyles[connectionStatus]}`}
              >
                {connectionStatus}
              </span>
            </div>
            <div className="mt-3 text-sm leading-6 text-white/80 sm:leading-7">
              {systemState.label}
            </div>
          </div>
          <div className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-5">
            <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.24em] text-white/42 sm:text-[11px] sm:tracking-[0.28em]">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-glowSoft" />
                Monitoring
              </span>
              <span className="text-white/56">{time}</span>
            </div>
            <div className="mt-3 text-sm leading-6 text-white/80 sm:leading-7">
              {metrics.totalAnalyses > 0
                ? `${metrics.totalAnalyses} live analyses completed. Avg risk ${metrics.averageRiskScore}/100.`
                : "Signed operator session active and policy mesh stable."}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
