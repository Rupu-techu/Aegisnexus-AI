import { useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { EnvironmentalDepth } from "../components/EnvironmentalDepth";
import { VisualConnectors } from "../components/VisualConnectors";
import { settingsGroups } from "../data/dashboard";

export function SettingsSection({ systemState }) {
  const [enabled, setEnabled] = useState({
    "Live threat streaming": true,
    "Radar sweep overlays": true,
    "Ambient system particles": true,
    "Strict review mode": true,
    "Evidence retention": true,
    "Executive digest summaries": false,
  });

  return (
    <div className="flex flex-col gap-7 relative">
      {/* ENVIRONMENTAL DEPTH LAYER */}
      <EnvironmentalDepth variant="settings" intensity="light" className="absolute inset-0" />
      
      {/* VISUAL CONTINUITY CONNECTORS */}
      <div className="absolute inset-0 top-1/3">
        <VisualConnectors variant="vertical" />
      </div>
      
      <SectionHeader
        eyebrow="Settings"
        title="Command Surface Preferences"
        description="Tune telemetry visibility, governance review posture, and operational assistant behaviors without leaving the secured control plane."
        accent={systemState.accent}
        secondary={systemState.secondary}
      />

      <div className="grid gap-5 xl:grid-cols-2 relative z-10">
        {settingsGroups.map((group) => (
          <div key={group.title} className="glass-panel edge-glow rounded-[30px] p-5 backdrop-blur-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">{group.title}</p>
            <p className="mt-3 text-sm leading-7 text-white/56">
              {group.title === "Telemetry Layer"
                ? "Control environmental HUD motion, threat visibility, and ambient observability overlays."
                : "Define how the system escalates review, stores evidence, and prepares leadership summaries."}
            </p>
            <div className="mt-5 grid gap-4">
              {group.items.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                  <span className="text-sm text-white/78">{item}</span>
                  <button
                    onClick={() =>
                      setEnabled((current) => ({ ...current, [item]: !current[item] }))
                    }
                    className={`relative h-9 w-20 rounded-full border transition ${
                      enabled[item]
                        ? "border-glow/20 bg-glow/[0.08]"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-7 w-7 rounded-full transition ${
                        enabled[item] ? "left-11 bg-glow shadow-glow" : "left-1 bg-white/25"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
