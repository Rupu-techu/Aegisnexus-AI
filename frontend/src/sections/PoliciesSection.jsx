import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { EnvironmentalDepth } from "../components/EnvironmentalDepth";
import { VisualConnectors } from "../components/VisualConnectors";
import { permissionLayers, policyRules } from "../data/dashboard";

export function PoliciesSection({ systemState }) {
  const [rules, setRules] = useState(policyRules);

  const toggleRule = (name) => {
    setRules((current) =>
      current.map((rule) =>
        rule.name === name ? { ...rule, enabled: !rule.enabled } : rule,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-7 relative">
      {/* ENVIRONMENTAL DEPTH LAYER */}
      <EnvironmentalDepth variant="policies" intensity="light" className="absolute inset-0" />
      
      {/* VISUAL CONTINUITY CONNECTORS */}
      <div className="absolute inset-0 top-1/4">
        <VisualConnectors variant="vertical" />
      </div>
      
      <SectionHeader
        eyebrow="Policies"
        title="Policy Execution Matrix"
        description="Manage instruction isolation, credential boundaries, and delegated authority using layered controls designed for live enterprise AI governance."
        accent={systemState.accent}
        secondary={systemState.secondary}
      />

      <div className="grid gap-5 grid-cols-12 relative z-10 min-w-0">
        <div className="col-span-12 lg:col-span-8 grid gap-5 min-w-0">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="glass-panel edge-glow rounded-[28px] p-5 backdrop-blur-2xl overflow-hidden w-full min-w-0"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center min-w-0 w-full">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3 max-w-full">
                    <h3 className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[1.02rem] tracking-[-0.012em] text-white sm:text-lg">
                      {rule.name}
                    </h3>
                    <span className="rounded-full border border-glow/15 bg-glow/[0.06] px-3 py-1 text-xs uppercase tracking-[0.24em] text-glowSoft">
                      {rule.level}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/56 break-words">
                    {rule.description}
                  </p>
                </div>
                <div className="flex justify-end lg:justify-end">
                  <button
                    onClick={() => toggleRule(rule.name)}
                    className={`relative h-11 w-24 flex-shrink-0 rounded-full border border-white/10 bg-white/[0.03] overflow-hidden transition ${
                      rule.enabled ? "border-warning/25 bg-warning/[0.12]" : ""
                    }`}
                  >
                    <motion.span
                      animate={{ x: rule.enabled ? 58 : 4 }}
                      transition={{ type: "spring", stiffness: 320, damping: 26 }}
                      className={`absolute top-1.5 left-1.5 h-7 w-7 rounded-full ${
                        rule.enabled ? "bg-warning shadow-ember" : "bg-white/25"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <aside className="col-span-12 lg:col-span-4 glass-panel edge-glow rounded-[28px] p-5 backdrop-blur-2xl overflow-hidden w-full min-w-0">
          <p className="text-xs uppercase tracking-[0.3em] text-white/45">Permission Layers</p>
          <p className="mt-3 text-sm leading-7 text-white/56 break-words max-w-full">
            Layered approval architecture determines how memory, connectors, and external tools participate in autonomous execution.
          </p>
          <div className="mt-5 grid gap-4">
            {permissionLayers.map((layer) => (
              <div key={layer.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 overflow-hidden w-full min-w-0">
                <div className="text-white break-words">{layer.label}</div>
                <div className="mt-2 text-sm text-white/52 break-words">{layer.status}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
