import { motion } from "framer-motion";
import { useId, useMemo } from "react";

const orbitSegments = [
  { d: "M66 152 C78 104 114 72 164 66", color: "secondary", width: 2.1 },
  { d: "M188 74 C228 88 252 118 256 162", color: "accent", width: 1.8 },
  { d: "M238 188 C222 224 190 248 148 252", color: "amber", width: 2.2 },
  { d: "M118 246 C82 236 56 208 46 170", color: "soft", width: 1.5 },
];

const innerArcs = [
  { d: "M112 134 C126 112 154 104 182 114", color: "accent", width: 1.5 },
  { d: "M106 176 C126 196 160 202 188 190", color: "secondary", width: 1.4 },
];

const stabilizerLines = [
  { x1: 92, y1: 92, x2: 132, y2: 122, color: "secondary" },
  { x1: 206, y1: 88, x2: 174, y2: 120, color: "accent" },
  { x1: 214, y1: 210, x2: 174, y2: 188, color: "amber" },
  { x1: 84, y1: 206, x2: 128, y2: 182, color: "soft" },
];

const nodeData = [
  { cx: 92, cy: 92, r: 3.2, color: "secondary" },
  { cx: 206, cy: 88, r: 3.4, color: "accent" },
  { cx: 214, cy: 210, r: 3.2, color: "amber" },
  { cx: 84, cy: 206, r: 2.8, color: "soft" },
  { cx: 150, cy: 150, r: 5.2, color: "secondary" },
];

const fracturePanels = [
  "M132 95 L152 78 L162 108 L142 120 Z",
  "M170 124 L202 134 L182 162 L160 148 Z",
  "M132 182 L160 190 L146 220 L118 206 Z",
];

function getTone(colorKey, tones) {
  if (colorKey === "accent") return tones.accent;
  if (colorKey === "amber") return tones.amber;
  if (colorKey === "soft") return tones.soft;
  return tones.secondary;
}

export function AegisNexusLogo({
  compact = false,
  showWordmark = true,
  className = "",
  accent = "#5ff8e8",
  secondary = "#94fff4",
  showScan = true,
}) {
  const instanceId = useId().replace(/:/g, "");
  const singularityId = `${instanceId}-singularity`;
  const haloId = `${instanceId}-halo`;
  const glowId = `${instanceId}-glow`;
  const amberGlowId = `${instanceId}-amber-glow`;
  const clipId = `${instanceId}-clip`;

  const tones = useMemo(
    () => ({
      accent,
      secondary,
      amber: "#ffb46a",
      soft: "rgba(255,255,255,0.56)",
      red: "#ff6c78",
    }),
    [accent, secondary],
  );

  const particles = useMemo(
    () =>
      Array.from({ length: compact ? 0 : 6 }, (_, index) => ({
        id: index,
        x: 38 + ((index * 19) % 220),
        y: 34 + ((index * 23) % 228),
        duration: 5 + (index % 3) * 0.8,
        delay: index * 0.22,
        color:
          index % 5 === 0
            ? tones.red
            : index % 3 === 0
              ? tones.amber
              : tones.secondary,
      })),
    [compact, tones],
  );

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55 }}
        className={`relative ${compact ? "h-14 w-14" : "h-[360px] w-[360px] sm:h-[430px] sm:w-[430px]"} will-change-transform`}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(95,248,232,0.13),rgba(255,180,106,0.06)_35%,transparent_68%)] blur-xl" />

        {!compact &&
          particles.map((particle) => (
            <motion.span
              key={particle.id}
              animate={{
                opacity: [0.12, 0.42, 0.12],
                scale: [0.95, 1.12, 0.95],
                y: [0, -6, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay,
              }}
              className="absolute h-1 w-1 rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                backgroundColor: particle.color,
              }}
            />
          ))}

        <svg
          viewBox="0 0 300 300"
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
        >
          <defs>
            <radialGradient id={singularityId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={secondary} />
              <stop offset="20%" stopColor={accent} />
              <stop offset="48%" stopColor="#ffb46a" />
              <stop offset="72%" stopColor="rgba(255,108,120,0.18)" />
              <stop offset="100%" stopColor="rgba(3,9,20,0)" />
            </radialGradient>
            <radialGradient id={haloId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="35%" stopColor="rgba(148,255,244,0.36)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={amberGlowId} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id={clipId}>
              <circle cx="150" cy="150" r={compact ? 34 : 58} />
            </clipPath>
          </defs>

          {!compact && (
            <motion.path
              d="M44 152 C50 88 96 42 160 38"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              strokeLinecap="round"
              animate={{ opacity: [0.16, 0.34, 0.16] }}
              transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          <motion.g
            animate={{ rotate: compact ? 0 : 360 }}
            transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "150px 150px" }}
          >
            {orbitSegments.map((segment, index) => (
              <motion.path
                key={segment.d}
                d={segment.d}
                stroke={getTone(segment.color, tones)}
                strokeWidth={compact ? Math.max(1.2, segment.width - 0.6) : segment.width}
                strokeLinecap="round"
                strokeDasharray={compact ? undefined : "2 8"}
                filter={compact ? undefined : segment.color === "amber" ? `url(#${amberGlowId})` : `url(#${glowId})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0.2, 0.72, 0.32],
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + index * 0.12,
                  opacity: { duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
                }}
              />
            ))}
          </motion.g>

          {!compact &&
            innerArcs.map((arc, index) => (
              <motion.path
                key={arc.d}
                d={arc.d}
                stroke={getTone(arc.color, tones)}
                strokeWidth={arc.width}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0.18, 0.55, 0.18],
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.75 + index * 0.08,
                  opacity: { duration: 5.4, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            ))}

          <motion.circle
            cx="150"
            cy="150"
            r={compact ? "12" : "18"}
            fill="url(#singularityId)"
            filter={compact ? undefined : `url(#${glowId})`}
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{
              scale: [0.2, 1.04, 0.98, 1.02],
              opacity: [0, 1, 0.78, 0.9],
            }}
            transition={{
              duration: 1.6,
              times: [0, 0.45, 0.75, 1],
              ease: "easeOut",
            }}
            style={{ transformOrigin: "150px 150px" }}
          />

          <motion.circle
            cx="150"
            cy="150"
            r={compact ? "28" : "50"}
            fill="url(#haloId)"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{
              scale: [0.3, 1.1, 1],
              opacity: [0, 0.5, 0.24],
            }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{ transformOrigin: "150px 150px" }}
          />

          <g clipPath={`url(#${clipId})`}>
            <motion.path
              d="M120 186 C138 136 182 114 214 126"
              stroke={tones.amber}
              strokeWidth={compact ? "1.4" : "2.3"}
              strokeLinecap="round"
              filter={`url(#${amberGlowId})`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0.15, 0.82, 0.45],
              }}
              transition={{
                duration: 1.15,
                delay: 0.75,
                opacity: { duration: 3.9, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.path
              d="M104 138 C124 116 154 112 176 124"
              stroke={tones.secondary}
              strokeWidth={compact ? "1.2" : "1.8"}
              strokeLinecap="round"
              filter={`url(#${glowId})`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0.1, 0.86, 0.3],
              }}
              transition={{
                duration: 1.1,
                delay: 0.95,
                opacity: { duration: 4.1, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </g>

          {!compact &&
            fracturePanels.map((panel, index) => (
              <motion.path
                key={panel}
                d={panel}
                fill={index === 1 ? "rgba(255,180,106,0.14)" : "rgba(95,248,232,0.12)"}
                stroke={index === 1 ? tones.amber : tones.secondary}
                strokeWidth="1"
                filter={undefined}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 0.4, 0.2],
                  scale: [0.9, 1, 0.98],
                }}
                transition={{
                  duration: 0.75,
                  delay: 0.8 + index * 0.12,
                  opacity: { duration: 6.8, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{ transformOrigin: "150px 150px" }}
              />
            ))}

          {!compact &&
            stabilizerLines.map((line, index) => (
              <motion.line
                key={`${line.x1}-${line.y1}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={getTone(line.color, tones)}
                strokeWidth="1.3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0.1, 0.45, 0.2],
                }}
                transition={{
                  duration: 0.65,
                  delay: 1.05 + index * 0.08,
                  opacity: { duration: 6.4, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            ))}

          {!compact &&
            nodeData.map((node, index) => (
              <motion.circle
                key={`${node.cx}-${node.cy}`}
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill={getTone(node.color, tones)}
                filter={undefined}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0.92, 1],
                  opacity: [0, 0.72, 0.34, 0.62],
                }}
                transition={{
                  duration: 0.75,
                  delay: 1.15 + index * 0.08,
                  opacity: { duration: 6.6, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 6.6, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
              />
            ))}

          {!compact && showScan && (
            <>
              <motion.path
                d="M86 150 C118 140 176 138 216 150"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1"
                strokeLinecap="round"
                animate={{ opacity: [0.12, 0.46, 0.12] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          )}
        </svg>

        {!compact && showScan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.55, 0] }}
            transition={{ duration: 1.8, delay: 1.1, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
            className="absolute inset-x-[24%] top-[20%] h-[46%] rotate-[18deg] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),rgba(255,180,106,0.16),transparent)] blur-sm"
          />
        )}
      </motion.div>

      {showWordmark && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: compact ? 0.18 : 0.75, ease: "easeOut" }}
          className={`text-center ${compact ? "mt-2" : "mt-8"}`}
        >
          <div
            className={`font-semibold uppercase tracking-[0.34em] text-white ${
              compact ? "text-[10px]" : "text-[clamp(1.35rem,2vw,2.35rem)]"
            }`}
          >
            AEGISNEXUS{" "}
            <span
              className="drop-shadow-[0_0_14px_rgba(255,180,106,0.35)]"
              style={{ color: secondary }}
            >
              AI
            </span>
          </div>
          {!compact && (
            <p className="mt-3 text-xs uppercase tracking-[0.48em] text-white/42 sm:text-sm">
              AI Governance Operating System
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
