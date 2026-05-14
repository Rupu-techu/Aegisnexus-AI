import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useGovernance } from "./context/GovernanceContext";
import { BootScreen } from "./components/BootScreen";
import { Sidebar } from "./components/Sidebar";
import { TopCommandBar } from "./components/TopCommandBar";
import { AuditLogsSection } from "./sections/AuditLogsSection";
import { OverviewSection } from "./sections/OverviewSection";
import { PoliciesSection } from "./sections/PoliciesSection";
import { SettingsSection } from "./sections/SettingsSection";
import { SimulatorSection } from "./sections/SimulatorSection";
import { ThreatsSection } from "./sections/ThreatsSection";

const sectionComponents = {
  overview: OverviewSection,
  threats: ThreatsSection,
  audit: AuditLogsSection,
  policies: PoliciesSection,
  simulator: SimulatorSection,
  settings: SettingsSection,
};

export default function App() {
  const { currentSystemState } = useGovernance();
  const [bootComplete, setBootComplete] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const haloNodes = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => ({
        id: index,
        top: `${12 + ((index * 17) % 72)}%`,
        left: `${8 + ((index * 19) % 82)}%`,
        delay: index * 0.45,
      })),
    [],
  );
  const ActiveSection = sectionComponents[activeSection];

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const { body } = document;
    const previousOverflow = body.style.overflow;

    body.style.overflow =
      !bootComplete || mobileSidebarOpen ? "hidden" : previousOverflow || "";

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [bootComplete, mobileSidebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!bootComplete ? (
          <BootScreen key="boot" onComplete={() => setBootComplete(true)} />
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(18,24,32,0.95),rgba(5,6,12,0.99)_42%,rgba(2,2,5,1)_100%)] text-white"
          >
            <div className="ambient-grid pointer-events-none fixed inset-0 opacity-[0.04] animate-gridshift" />
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(95,248,232,0.05),transparent_20%),radial-gradient(circle_at_82%_14%,rgba(255,159,67,0.08),transparent_20%),radial-gradient(circle_at_66%_50%,rgba(255,90,111,0.06),transparent_25%),radial-gradient(circle_at_48%_100%,rgba(255,204,102,0.06),transparent_32%)]" />

            <motion.div
              animate={{ x: ["-15%", "110%"], opacity: [0.18, 0.3, 0.18] }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none fixed inset-y-0 w-36 bg-[linear-gradient(90deg,transparent,rgba(95,248,232,0.035),transparent)] blur-xl will-change-transform"
            />
            <motion.div
              animate={{ opacity: [0.18, 0.34, 0.18] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none fixed right-0 top-1/4 h-80 w-80 bg-[radial-gradient(circle,rgba(255,159,67,0.07),transparent_70%)] blur-2xl"
            />

            {haloNodes.map((node) => (
              <motion.div
                key={node.id}
                animate={{
                  opacity: [0.12, 0.4, 0.12],
                  scale: [1, 1.2, 1],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 6.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: node.delay,
                }}
                className="pointer-events-none fixed h-1 w-1 rounded-full will-change-transform"
                style={{
                  top: node.top,
                  left: node.left,
                  backgroundColor:
                    node.id % 5 === 0
                      ? currentSystemState.accent
                      : node.id % 3 === 0
                        ? currentSystemState.secondary
                        : "#5ff8e8",
                  boxShadow:
                    node.id % 7 === 0
                      ? `0 0 8px ${
                          node.id % 3 === 0
                            ? currentSystemState.secondary
                            : "#5ff8e8"
                        }`
                      : "none",
                }}
              />
            ))}

            <motion.div
              animate={{ opacity: [0.14, 0.28, 0.14] }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="pointer-events-none fixed bottom-1/4 left-0 h-64 w-64 bg-[radial-gradient(circle,rgba(95,248,232,0.05),transparent_65%)] blur-2xl"
            />

            <AnimatePresence initial={false}>
              {mobileSidebarOpen ? (
                <>
                  <motion.button
                    key="sidebar-overlay"
                    type="button"
                    aria-label="Close navigation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    onClick={() => setMobileSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-[rgba(2,6,14,0.68)] backdrop-blur-sm lg:hidden"
                  />
                  <motion.div
                    key="sidebar-drawer"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="fixed inset-y-0 left-0 z-50 w-[min(86vw,360px)] p-3 sm:p-4 lg:hidden"
                  >
                    <div className="relative h-full">
                      <button
                        type="button"
                        onClick={() => setMobileSidebarOpen(false)}
                        className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/72 backdrop-blur-md transition hover:border-warning/20 hover:text-white"
                      >
                        <X className="h-4.5 w-4.5" />
                      </button>
                      <Sidebar
                        systemState={currentSystemState}
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                        onNavigate={() => setMobileSidebarOpen(false)}
                      />
                    </div>
                  </motion.div>
                </>
              ) : null}
            </AnimatePresence>

            <div className="relative flex min-h-screen w-full flex-col gap-4 px-3 py-3 sm:gap-5 sm:px-5 sm:py-5 lg:flex-row lg:items-start lg:gap-6 lg:px-5 lg:py-6">
              <div className="hidden shrink-0 lg:block lg:min-h-[calc(100vh-3rem)] lg:w-[168px] xl:w-[180px]">
                <Sidebar
                  systemState={currentSystemState}
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                />
              </div>

              <main className="min-w-0 flex-1">
                <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileSidebarOpen(true)}
                    className="glass-panel edge-glow inline-flex items-center gap-3 rounded-[20px] px-4 py-3 text-left backdrop-blur-md"
                  >
                    <Menu className="h-4.5 w-4.5 text-warning" />
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/72">
                      Navigation
                    </span>
                  </button>

                  <div className="glass-panel edge-glow flex items-center gap-3 rounded-[20px] px-4 py-3 backdrop-blur-md">
                    <ShieldCheck className="h-4 w-4 text-glowSoft" />
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">
                        Tactical View
                      </p>
                      <p className="text-sm text-white/78">
                        {activeSection.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                <TopCommandBar
                  activeSection={activeSection}
                  systemState={currentSystemState}
                />
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="min-w-0 will-change-transform"
                >
                  <ActiveSection systemState={currentSystemState} />
                </motion.div>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
