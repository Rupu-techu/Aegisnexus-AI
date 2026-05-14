import { motion } from "framer-motion";
import { AegisNexusLogo } from "./AegisNexusLogo";
import { AITelemetrySpine } from "./AITelemetrySpine";
import { sidebarItems } from "../data/dashboard";

const primaryItems = sidebarItems.filter((item) => item.id !== "settings");
const settingsItem = sidebarItems.find((item) => item.id === "settings");

export function Sidebar({
  systemState,
  activeSection,
  onSectionChange,
  onNavigate,
}) {
  const renderNavButton = ({ id, label, icon: Icon }, compact = false) => (
    <motion.button
      key={id}
      onClick={() => {
        onSectionChange(id);
        onNavigate?.();
      }}
      whileHover={{ y: -1 }}
      className={`group relative flex w-full border text-left transition duration-300 ${
        compact
          ? "min-h-[64px] items-center gap-3 rounded-[20px] px-4 py-3"
          : "min-h-[72px] flex-col items-center justify-center gap-2 rounded-[22px] px-3 py-4 text-center"
      } ${
        activeSection === id
          ? "border-warning/30 bg-[linear-gradient(180deg,rgba(255,159,67,0.16),rgba(255,90,111,0.08))] text-amber shadow-ember"
          : "border-transparent bg-white/[0.02] text-[#b7a58f] hover:border-warning/15 hover:bg-[linear-gradient(180deg,rgba(255,180,106,0.08),rgba(255,255,255,0.025))] hover:text-[#f3c886]"
      }`}
    >
      {activeSection === id ? (
        <motion.span
          layoutId="sidebar-active-indicator"
          className={`absolute rounded-full bg-gradient-to-b from-amber via-warning to-critical ${
            compact ? "inset-y-3 left-0 w-1" : "inset-y-3 left-0 w-1"
          }`}
        />
      ) : null}
      <Icon
        className={`transition duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,180,106,0.28)] ${
          compact ? "h-4.5 w-4.5 shrink-0" : "h-4.5 w-4.5"
        }`}
      />
      <span
        className={`uppercase ${
          compact
            ? "text-[11px] tracking-[0.18em]"
            : "text-[10px] tracking-[0.16em] lg:text-[11px] lg:tracking-[0.14em]"
        }`}
      >
        {label}
      </span>
    </motion.button>
  );

  return (
    <aside className="glass-panel edge-glow relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[30px] backdrop-blur-md">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(255,180,106,0.12),transparent_70%)]" />
      <AITelemetrySpine />

      <div className="relative z-10 flex flex-1 flex-col px-4 py-5 sm:px-5 sm:py-6 lg:px-4">
        <div className="flex flex-1 flex-col justify-between gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex justify-center">
              <AegisNexusLogo
                compact
                showWordmark={false}
                accent={systemState.accent}
                secondary={systemState.secondary}
              />
            </div>

            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/72">
                AegisNexus
              </p>
              <p
                className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em]"
                style={{ color: systemState.secondary }}
              >
                AI Governance
              </p>
            </div>

            <nav className="grid gap-3">
              {primaryItems.map((item) => renderNavButton(item))}
            </nav>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/8 pt-4">
            {settingsItem ? renderNavButton(settingsItem, true) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}
