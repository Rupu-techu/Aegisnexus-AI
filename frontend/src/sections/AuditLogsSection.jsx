import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { EnvironmentalDepth } from "../components/EnvironmentalDepth";
import { VisualConnectors } from "../components/VisualConnectors";
import { useGovernance } from "../context/GovernanceContext";
import { auditFilters, auditTimeline } from "../data/dashboard";

export function AuditLogsSection({ systemState }) {
  const { auditEntries } = useGovernance();
  const [activeFilter, setActiveFilter] = useState(auditFilters[0]);
  const renderedAuditEntries = auditEntries?.length ? auditEntries : auditTimeline;

  return (
    <div className="flex flex-col gap-7 relative">
      {/* ENVIRONMENTAL DEPTH LAYER */}
      <EnvironmentalDepth variant="audit" intensity="medium" className="absolute inset-0" />
      
      {/* VISUAL CONTINUITY CONNECTORS */}
      <div className="absolute inset-0 top-1/2">
        <VisualConnectors variant="diagonal" />
      </div>
      
      <SectionHeader
        eyebrow="Audit Logs"
        title="Forensic Governance Ledger"
        description="Review blocked instructions, policy arbitration, and evidence retention events through a premium forensic timeline built for security and compliance teams."
        accent={systemState.accent}
        secondary={systemState.secondary}
      />

      <div className="glass-panel edge-glow rounded-[32px] p-5 backdrop-blur-2xl relative z-10">
        <div className="flex flex-wrap gap-3">
          {auditFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] transition ${
                activeFilter === filter
                  ? "border-glow/20 bg-glow/[0.08] text-glowSoft"
                  : "border-white/10 bg-white/[0.03] text-white/55 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4">
          {renderedAuditEntries.map((entry, index) => (
            <motion.div
              key={`${entry.time}-${entry.title}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.07, duration: 0.45 }}
              className="relative grid gap-4 rounded-[26px] border border-white/8 bg-white/[0.03] p-5 lg:grid-cols-[120px_18px_minmax(0,1fr)_180px]"
            >
              <div className="text-sm font-medium text-white/82">{entry.time}</div>
              <div className="relative flex justify-center">
                <span className="absolute bottom-[-2.75rem] top-6 w-px bg-gradient-to-b from-warning/60 to-transparent" />
                <span className="mt-1 h-3.5 w-3.5 rounded-full border border-warning/40 bg-warning/90 shadow-ember" />
              </div>
              <div>
                <h3 className="text-lg text-white">{entry.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/58">{entry.detail}</p>
              </div>
              <div className="flex items-start lg:justify-end">
                <span className="rounded-full border border-amber/20 bg-amber/[0.08] px-3 py-1 text-xs uppercase tracking-[0.24em] text-amber">
                  {entry.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
