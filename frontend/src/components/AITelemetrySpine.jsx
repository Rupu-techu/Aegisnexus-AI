import { motion } from "framer-motion";
import { useMemo } from "react";

export function AITelemetrySpine() {
  const telemetryNodes = useMemo(
    () =>
      Array.from({ length: 6 }, (_, index) => ({
        id: index,
        position: `${14 + index * 13}%`,
        delay: index * 0.22,
        duration: 3.2 + (index % 3) * 0.4,
      })),
    [],
  );

  const signalLines = useMemo(
    () =>
      Array.from({ length: 3 }, (_, index) => ({
        id: index,
        position: `${20 + index * 22}%`,
        delay: index * 0.35,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 w-full">
      {/* MAIN GLOWING SPINE */}
      <motion.div
        animate={{ opacity: [0.22, 0.4, 0.22] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-glow/70 to-transparent"
      />

      {/* TELEMETRY PULSE NODES */}
      {telemetryNodes.map((node) => (
        <motion.div
          key={node.id}
          animate={{
            opacity: [0.2, 0.55, 0.2],
            scale: [0.9, 1.15, 0.9],
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: node.delay,
          }}
          className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-glow via-warning to-glow"
          style={{ top: node.position }}
        />
      ))}

      {/* SIGNAL FLOW LINES */}
      {signalLines.map((line) => (
        <motion.div
          key={line.id}
          animate={{ opacity: [0, 0.28, 0], y: [0, 42, 0] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: line.delay,
          }}
          className="absolute left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-glow via-glow/50 to-transparent"
          style={{ top: line.position }}
        />
      ))}

      {/* MICRO DATA INDICATORS */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 space-y-4">
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2.4 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
            className="h-0.5 w-0.5 rounded-full mx-auto bg-warning/60"
          />
        ))}
      </div>

      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col justify-around">
        {Array.from({ length: 2 }, (_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.15, 0.35, 0.15],
              x: [0, 1, 0],
            }}
            transition={{
              duration: 3.2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
            className="absolute -left-1.5 w-3 h-0.5 bg-gradient-to-r from-transparent via-glow/50 to-transparent"
          />
        ))}
      </div>
    </div>
  );
}
