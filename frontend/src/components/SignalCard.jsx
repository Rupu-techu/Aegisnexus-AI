import { motion } from "framer-motion";
import { fadeUp } from "../utils/motion";

export function SignalCard({ title, value, detail, icon: Icon, tone, delay, glow }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ delay, duration: 0.7 }}
      whileHover={{ y: -5, boxShadow: `0 0 34px ${glow}` }}
      className="glass-panel edge-glow relative overflow-hidden rounded-[28px] p-5 backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="flex min-h-[186px] items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/42">
            {title}
          </p>
          <p className={`mt-4 text-2xl font-semibold leading-none ${tone}`}>{value}</p>
          <p className="mt-4 max-w-[22ch] text-sm leading-7 text-white/55">
            {detail}
          </p>
        </div>
        <div className="shrink-0 rounded-[18px] border border-white/10 bg-white/[0.04] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <Icon className={`h-5 w-5 ${tone}`} />
        </div>
      </div>
    </motion.div>
  );
}
