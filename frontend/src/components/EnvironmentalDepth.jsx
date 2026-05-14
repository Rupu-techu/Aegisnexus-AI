import { motion } from "framer-motion";
import { useMemo } from "react";

export function EnvironmentalDepth({
  variant = "default",
  intensity = "medium",
  className = "",
}) {
  const radarArcs = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        size: 60 + i * 40,
        delay: i * 0.4,
      })),
    [],
  );

  const topographicLines = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        position: `${20 + i * 15}%`,
      })),
    [],
  );

  const threatZones = useMemo(
    () =>
      Array.from({ length: 2 }, (_, i) => ({
        id: i,
        top: `${25 + i * 30}%`,
        left: `${15 + i * 60}%`,
        size: 80 + i * 40,
      })),
    [],
  );

  const glowRegions = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        top: `${10 + i * 35}%`,
        left: `${10 + i * 40}%`,
        size: 100 + i * 50,
        type: i % 3 === 0 ? "cyan" : i % 3 === 1 ? "orange" : "red",
      })),
    [],
  );

  const intensitySettings = {
    light: { opacity: 0.03, animationIntensity: 0.4 },
    medium: { opacity: 0.06, animationIntensity: 0.6 },
    heavy: { opacity: 0.1, animationIntensity: 0.8 },
  };

  const settings = intensitySettings[intensity];

  return (
    <div className={`environment-depth ${className}`}>
      {/* TOPOGRAPHIC LINE STRUCTURE */}
      {topographicLines.map((line) => (
        <motion.div
          key={`topo-${line.id}`}
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: line.id * 0.3,
          }}
          className="topographic-line"
          style={{ top: line.position }}
        />
      ))}

      {/* RADAR SWEEP ARCS */}
      {radarArcs.map((arc) => (
        <motion.div
          key={`radar-${arc.id}`}
          animate={{ opacity: [0.08, 0.25, 0], scale: [0.8, 1.2, 1.5] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
            delay: arc.delay,
          }}
          className={`radar-arc ${arc.id === 0 ? "primary" : "secondary"}`}
          style={{
            width: `${arc.size}px`,
            height: `${arc.size}px`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* THREAT ENERGY ZONES */}
      {threatZones.map((zone) => (
        <motion.div
          key={`threat-${zone.id}`}
          animate={{ opacity: [0.04, 0.12, 0.04] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: zone.id * 1.2,
          }}
          className="threat-zone glow"
          style={{
            width: `${zone.size}px`,
            height: `${zone.size}px`,
            top: zone.top,
            left: zone.left,
          }}
        />
      ))}

      {/* BLURRED GLOW REGIONS */}
      {glowRegions.map((region) => (
        <motion.div
          key={`glow-${region.id}`}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 5 + region.id,
            repeat: Infinity,
            ease: "easeInOut",
            delay: region.id * 1.5,
          }}
          className={`glow-region ${region.type}`}
          style={{
            width: `${region.size}px`,
            height: `${region.size}px`,
            top: region.top,
            left: region.left,
          }}
        />
      ))}

      {/* ANIMATED DATA STREAMS */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-x-0 top-1/4 h-32 bg-gradient-to-b from-glow/[0.03] via-transparent to-transparent"
      />

      {/* SUBTLE GEOMETRIC OVERLAYS */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.02]"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="geometric-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(95, 248, 232, 0.5)" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="rgba(95, 248, 232, 0.5)" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(95, 248, 232, 0.3)" />
          </pattern>
        </defs>
        <rect width="1000" height="1000" fill="url(#geometric-pattern)" />
      </svg>
    </div>
  );
}
