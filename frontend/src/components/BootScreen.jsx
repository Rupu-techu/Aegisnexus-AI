import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { introSequence } from "../data/dashboard";
import { AegisNexusLogo } from "./AegisNexusLogo";

export function BootScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timers = introSequence.map((_, index) =>
      setTimeout(() => {
        setStep(index);
      }, index * 1350),
    );

    const finishTimer = setTimeout(() => {
      setClosing(true);
    }, 4700);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5400);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="fixed inset-0 z-[999999] flex h-screen w-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,170,70,0.08),rgba(10,15,30,1))]"
    >
      <div className="ambient-grid absolute inset-0 opacity-[0.08] animate-gridshift" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(95,248,232,0.08),transparent_24%),radial-gradient(circle_at_70%_30%,rgba(255,159,67,0.08),transparent_20%),radial-gradient(circle_at_50%_90%,rgba(255,90,111,0.06),transparent_28%)]" />
      <motion.div
        animate={{ x: ["-10%", "110%"], opacity: [0.12, 0.3, 0.12] }}
        transition={{ duration: 8.8, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute inset-y-0 w-32 bg-[linear-gradient(90deg,transparent,rgba(255,196,108,0.08),transparent)] blur-md"
      />

      {Array.from({ length: 8 }, (_, index) => (
        <motion.span
          key={index}
          animate={{
            opacity: [0.1, 0.45, 0.1],
            y: [0, -10, 0],
            scale: [0.9, 1.12, 0.9],
          }}
          transition={{
            duration: 4.8 + (index % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.18,
          }}
          className="absolute h-1 w-1 rounded-full bg-glowSoft/80"
          style={{
            top: `${8 + ((index * 9) % 82)}%`,
            left: `${10 + ((index * 13) % 76)}%`,
          }}
        />
      ))}

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <div className="relative">
          <AegisNexusLogo accent="#5ff8e8" secondary="#f6d188" showScan showWordmark={false} />
          <motion.div
            animate={{ scale: [0.9, 1.18], opacity: [0.32, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber/30"
          />
        </div>

        <div className="mt-5 h-12">
          <motion.p
            key={introSequence[step]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-base font-medium uppercase tracking-[0.4em] text-white/90 sm:text-[1.4rem]"
          >
            {introSequence[step]}
          </motion.p>
        </div>

        <div className="mt-3 w-full max-w-lg">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${((step + 1) / introSequence.length) * 100}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-full rounded-full bg-[linear-gradient(90deg,#5ff8e8,#f6d188,#ff5a6f)]"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
          <span className="h-2 w-2 rounded-full bg-glow shadow-[0_0_14px_rgba(95,248,232,0.8)]" />
          Classified operating surface
        </div>
      </div>

      {closing && (
        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: 4.2, opacity: [0.75, 0.28, 0] }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber/40 bg-[radial-gradient(circle_at_center,rgba(255,204,102,0.2),rgba(95,248,232,0.06),transparent_70%)]"
        />
      )}
    </motion.div>
  );
}
