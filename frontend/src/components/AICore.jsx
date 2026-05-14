import { motion } from "framer-motion";
import { AegisNexusLogo } from "./AegisNexusLogo";

export function AICore({ systemState }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative flex flex-col items-center justify-center will-change-transform"
    >
      <motion.div
        animate={{ opacity: [0.45, 0.68, 0.45], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full blur-xl will-change-transform"
        style={{
          background: `radial-gradient(circle at center, ${systemState.accentSoft}, rgba(255,90,111,0.06), transparent 62%)`,
        }}
      />
      <AegisNexusLogo accent={systemState.accent} secondary={systemState.secondary} />
      <div className="mt-5 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-white/58">
          Autonomous threat containment network
        </p>
        <p className="mt-2 max-w-md text-sm leading-7 text-white/46">
          Neural telemetry, policy arbitration, and incident stabilization remain synchronized inside the classified control plane.
        </p>
      </div>
    </motion.div>
  );
}
