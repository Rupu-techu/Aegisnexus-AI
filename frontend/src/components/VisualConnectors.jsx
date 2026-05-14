import { motion } from "framer-motion";
import { useMemo } from "react";

export function VisualConnectors({ variant = "vertical" }) {
  const connectors = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        position: `${25 + i * 20}%`,
        duration: 1.8 + i * 0.3,
        delay: i * 0.2,
      })),
    [],
  );

  const orbitalElements = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        size: 40 + i * 30,
        duration: 12 + i * 6,
      })),
    [],
  );

  if (variant === "vertical") {
    return (
      <div className="pointer-events-none absolute inset-x-0 inset-y-0">
        {/* VERTICAL BEAM GRADIENTS */}
        {connectors.map((connector) => (
          <motion.div
            key={`v-connector-${connector.id}`}
            animate={{
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: connector.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: connector.delay,
            }}
            className="connector-line vertical"
            style={{
              left: connector.position,
              background: `linear-gradient(180deg, 
                transparent,
                rgba(95, 248, 232, 0.3),
                transparent
              )`,
            }}
          />
        ))}

        {/* GLOWING ORBITAL ELEMENTS */}
        {orbitalElements.map((orbital) => (
          <motion.div
            key={`orbital-${orbital.id}`}
            animate={{ rotate: 360 }}
            transition={{
              duration: orbital.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`orbital ${
              orbital.id === 0
                ? "small"
                : orbital.id === 1
                  ? "medium"
                  : "large"
            }`}
            style={{
              width: `${orbital.size}px`,
              height: `${orbital.size}px`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className="pointer-events-none absolute inset-0">
        {/* HORIZONTAL BEAM GRADIENTS */}
        {connectors.map((connector) => (
          <motion.div
            key={`h-connector-${connector.id}`}
            animate={{
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: connector.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: connector.delay,
            }}
            className="connector-line horizontal"
            style={{
              top: connector.position,
              background: `linear-gradient(90deg, 
                transparent,
                rgba(255, 159, 67, 0.25),
                transparent
              )`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* DIAGONAL ENERGY FLOWS */}
      <motion.div
        animate={{
          opacity: [0, 0.3, 0],
          x: ["-20%", "20%", "-20%"],
          y: ["-20%", "20%", "-20%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-br from-glow/[0.08] via-transparent to-warning/[0.05]"
      />

      {/* CROSS-SECTION GLOW */}
      <motion.div
        animate={{ opacity: [0.15, 0.4, 0.15] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full bg-radial-gradient(circle, rgba(95, 248, 232, 0.04), transparent 70%)"
      />
    </div>
  );
}
