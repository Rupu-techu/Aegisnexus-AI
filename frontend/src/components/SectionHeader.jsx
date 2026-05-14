import { motion } from "framer-motion";

export function SectionHeader({
  eyebrow,
  title,
  description,
  accent,
  secondary,
  action,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between xl:gap-8"
    >
      <div className="min-w-0 flex-1">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.34em]"
          style={{
            borderColor: `${accent}33`,
            backgroundColor: "rgba(255,255,255,0.035)",
            color: secondary,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 0 24px ${accent}1c`,
          }}
        >
          {eyebrow}
        </div>
        <h1 className="mt-5 overflow-hidden text-ellipsis whitespace-nowrap bg-[linear-gradient(90deg,#ffffff,#f6d188_55%,#ffffff)] bg-clip-text text-[clamp(2rem,2.8vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-transparent drop-shadow-[0_0_16px_rgba(255,180,106,0.12)]">
          {title}
        </h1>
        <p className="mt-4 max-w-[72ch] text-sm leading-8 text-white/56 sm:text-base">
          {description}
        </p>
      </div>
      {action ? <div className="min-w-0 xl:w-[24rem] xl:max-w-[24rem]">{action}</div> : null}
    </motion.div>
  );
}
