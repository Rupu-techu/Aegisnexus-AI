import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useGovernance } from "../context/GovernanceContext";
import { seedLogs } from "../data/dashboard";
import { fadeUp } from "../utils/motion";

export function LiveTerminal({ systemState }) {
  const { terminalLogs } = useGovernance();
  const [logs, setLogs] = useState(terminalLogs);
  const containerRef = useRef(null);

  useEffect(() => {
    setLogs(terminalLogs);
  }, [terminalLogs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((current) => {
        const next = seedLogs[Math.abs(current.length) % seedLogs.length];
        const stamped = `${next} :: ${new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}`;

        return [...current.slice(-7), stamped];
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.section
      {...fadeUp}
      transition={{ delay: 0.18, duration: 0.35 }}
      className="relative overflow-hidden rounded-[28px] border border-white/10 p-4 shadow-[0_0_28px_rgba(255,170,70,0.06)] backdrop-blur-md sm:rounded-[30px] sm:p-5 lg:p-6"
      style={{ background: "rgba(10,14,28,0.72)" }}
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-warning/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-[22%] top-0 h-16 bg-[linear-gradient(180deg,rgba(255,159,67,0.05),transparent)] blur-lg" />
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/45 sm:text-xs">
            Forensic Event Relay
          </p>
          <h3 className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap bg-[linear-gradient(90deg,#ffcc70,#ff9f43)] bg-clip-text text-[0.98rem] font-medium tracking-[0.02em] text-transparent drop-shadow-[0_0_12px_rgba(255,159,67,0.16)] sm:text-[1.06rem]">
            Autonomous containment console
          </h3>
        </div>
        <div
          className="flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs"
          style={{
            borderColor: systemState.accentSoft,
            backgroundColor: "rgba(255,255,255,0.03)",
            color: systemState.secondary,
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: systemState.accent,
              boxShadow: `0 0 12px ${systemState.accent}`,
            }}
          />
          Real-time
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[22px] border border-white/6 bg-[#050810]/92 sm:rounded-[24px]">
        <motion.div
          animate={{ x: ["-10%", "120%"] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute inset-y-0 w-16 bg-[linear-gradient(90deg,transparent,rgba(255,204,102,0.06),transparent)] blur-sm"
        />
        <div
          ref={containerRef}
          className="relative h-[13.75rem] overflow-y-auto px-4 py-3.5 font-mono text-[13px] text-white/75 sm:h-[14.5rem] sm:px-5 sm:py-4 lg:h-[15rem] lg:px-6"
        >
          {logs.map((log, index) => {
            const isAlert = log.includes("[ALERT]");
            const isBlocked = log.includes("[BLOCKED]");
            const isWarn = log.includes("[WARN]");
            const isCritical = log.includes("[CRITICAL]");
            const accent = isAlert
              ? "text-alert"
              : isCritical
                ? "text-critical"
                : isWarn
                  ? "text-warning"
                  : isBlocked
                    ? "text-glowSoft"
                    : "text-white/72";

            return (
              <motion.p
                key={`${log}-${index}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className={`mb-2.5 leading-[1.55] ${accent}`}
              >
                {log}
              </motion.p>
            );
          })}
          <div className="flex items-center gap-2 text-glow/70">
            <span>{">"}</span>
            <span className="animate-blink">_</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
