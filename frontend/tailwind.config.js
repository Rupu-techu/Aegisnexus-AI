/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#040814",
        midnight: "#071120",
        graphite: "#06080d",
        panel: "rgba(9, 16, 28, 0.7)",
        border: "rgba(120, 255, 241, 0.14)",
        glow: "#5ff8e8",
        glowSoft: "#94fff4",
        warning: "#ff9f43",
        amber: "#ffcc66",
        gold: "#f6d188",
        critical: "#ff5a6f",
        ember: "#ffb46a",
        alert: "#ff5f7d",
      },
      boxShadow: {
        glow: "0 0 40px rgba(95, 248, 232, 0.14)",
        panel: "0 18px 50px rgba(2, 8, 18, 0.45)",
        ember: "0 0 40px rgba(255, 180, 106, 0.18)",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        grid:
          "linear-gradient(rgba(148,255,244,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,255,244,0.05) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blink: {
          "0%, 45%": { opacity: "1" },
          "46%, 100%": { opacity: "0" },
        },
        drift: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(-18px, -12px, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
        pulsewave: {
          "0%": { transform: "scale(0.2)", opacity: "0.75" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateX(-18%)", opacity: "0" },
          "20%": { opacity: "0.7" },
          "100%": { transform: "translateX(120%)", opacity: "0" },
        },
        levitate: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        gridshift: {
          "0%": { backgroundPosition: "0px 0px, 0px 0px" },
          "100%": { backgroundPosition: "120px 120px, 120px 120px" },
        },
        telemetryPulse: {
          "0%, 100%": { opacity: "0.3", boxShadow: "0 0 4px rgba(95, 248, 232, 0.4)" },
          "50%": { opacity: "1", boxShadow: "0 0 12px rgba(95, 248, 232, 0.8)" },
        },
        radarSweep: {
          "0%": { transform: "scale(0)", opacity: "0.6" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
        threatPulse: {
          "0%, 100%": { opacity: "0.06" },
          "50%": { opacity: "0.12" },
        },
        dataFlow: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        connectorGlow: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "0.6" },
        },
        orbitalRotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.1)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        blink: "blink 1.1s steps(2, start) infinite",
        drift: "drift 16s ease-in-out infinite",
        pulsewave: "pulsewave 2.4s ease-out infinite",
        scan: "scan 4.8s linear infinite",
        levitate: "levitate 6s ease-in-out infinite",
        gridshift: "gridshift 26s linear infinite",
        telemetryPulse: "telemetryPulse 2s ease-in-out infinite",
        radarSweep: "radarSweep 4s linear infinite",
        threatPulse: "threatPulse 3.2s ease-in-out infinite",
        dataFlow: "dataFlow 3s linear infinite",
        connectorGlow: "connectorGlow 2.5s ease-in-out infinite",
        orbitalRotate: "orbitalRotate linear infinite",
        glowPulse: "glowPulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
