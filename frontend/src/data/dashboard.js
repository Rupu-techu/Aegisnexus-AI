import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  FileClock,
  FlaskConical,
  LayoutDashboard,
  Settings,
  Shield,
} from "lucide-react";

export const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "threats", label: "Threats", icon: AlertTriangle },
  { id: "audit", label: "Audit Logs", icon: FileClock },
  { id: "policies", label: "Policies", icon: Shield },
  { id: "simulator", label: "Simulator", icon: FlaskConical },
  { id: "settings", label: "Settings", icon: Settings },
];

export const sectionMeta = {
  overview: {
    eyeline: "Strategic View",
    code: "NX-01",
    status: "Containment sync active",
  },
  threats: {
    eyeline: "Incident Grid",
    code: "NX-02",
    status: "Escalation branch online",
  },
  audit: {
    eyeline: "Forensic Ledger",
    code: "NX-03",
    status: "Evidence pipeline stable",
  },
  policies: {
    eyeline: "Governance Mesh",
    code: "NX-04",
    status: "Policy arbitration stable",
  },
  simulator: {
    eyeline: "Adversarial Lab",
    code: "NX-05",
    status: "Synthetic telemetry armed",
  },
  settings: {
    eyeline: "Control Surface",
    code: "NX-06",
    status: "Operator profile secured",
  },
};

export const rightCards = [
  {
    title: "Containment Tier",
    value: "Escalated",
    detail: "Three hostile prompt chains isolated before tool execution.",
    icon: AlertTriangle,
    tone: "text-warning",
    glow: "rgba(255,159,67,0.18)",
  },
  {
    title: "Trust Fabric",
    value: "96.4%",
    detail: "Authenticated agent lanes remain inside approved operating bounds.",
    icon: BadgeCheck,
    tone: "text-glowSoft",
    glow: "rgba(95,248,232,0.16)",
  },
  {
    title: "Recent Alerts",
    value: "07",
    detail: "Newest event cluster tied to a coordinated evasion rehearsal.",
    icon: Activity,
    tone: "text-amber",
    glow: "rgba(255,204,102,0.16)",
  },
];

export const simulatorActions = [
  {
    title: "Prompt Injection",
    summary: "Validate prompt sanitation and chain-of-thought boundary controls.",
  },
  {
    title: "Jailbreak Cascade",
    summary: "Measure policy recovery when an agent attempts layered guardrail evasion.",
  },
  {
    title: "Credential Exfiltration",
    summary: "Simulate covert outbound transfer attempts from protected memory and tools.",
  },
  {
    title: "Privilege Escalation",
    summary: "Challenge tool invocation trust boundaries and delegated authority checks.",
  },
];

export const seedLogs = [
  "[SECURE] Agent enclave attestation completed",
  "[TRACE] Governance ledger synchronized",
  "[ALERT] Prompt injection pattern matched adversarial signature",
  "[BLOCKED] Credential exfiltration route denied",
  "[WARN] Tool escalation threshold exceeded",
  "[CRITICAL] Autonomous lateral movement contained",
  "[SECURE] Containment policy redeployed",
  "[TRACE] Forensic evidence snapshot committed",
];

export const heroStats = [
  {
    label: "Autonomous Policy Nodes",
    value: "128",
    className: "border border-glow/15 bg-glow/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_24px_rgba(95,248,232,0.08)]",
  },
  {
    label: "Active Policies",
    value: "24 live",
    className: "border border-amber/15 bg-amber/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_24px_rgba(246,209,136,0.08)]",
  },
  {
    label: "Response Latency",
    value: "98 ms",
    className: "border border-critical/15 bg-critical/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_24px_rgba(255,90,111,0.08)]",
  },
];

export const introSequence = [
  "Verifying Secure Enclave",
  "Synchronizing Governance Mesh",
  "Activating Threat Lattice",
  "Command Surface Online",
];

export const systemState = {
  level: "warning",
  label: "Critical containment escalation detected",
  detail: "Adaptive countermeasures are throttling unsafe tool access across monitored AI workloads.",
  accentClass: "text-warning",
  accent: "#ff9f43",
  accentSoft: "rgba(255,159,67,0.18)",
  accentStrong: "rgba(255,90,111,0.2)",
  secondary: "#f6d188",
  grid: "rgba(255,204,102,0.06)",
};

export const threatFeed = [
  {
    title: "Prompt Injection Cluster",
    severity: "Critical",
    source: "Research Copilot Mesh",
    status: "Contained",
    detail: "A coordinated prompt sequence attempted to override instruction lineage across two federated analyst agents.",
  },
  {
    title: "Privilege Escalation Probe",
    severity: "High",
    source: "Workflow Automation Agent",
    status: "Monitoring",
    detail: "Delegated tool access exceeded approved authority scope and triggered trust arbitration before execution.",
  },
  {
    title: "Context Leakage Attempt",
    severity: "Medium",
    source: "Executive Summarization Agent",
    status: "Blocked",
    detail: "Restricted memory references were suppressed before an external summary package could be emitted.",
  },
];

export const incidentStream = [
  "Untrusted connector invocation denied",
  "Containment confidence dropped below 84%",
  "Escalation fingerprint matched known rehearsal",
  "Emergency policy branch deployed successfully",
];

export const auditFilters = ["All Events", "Blocked Prompts", "Policy Actions", "Tool Access"];

export const auditTimeline = [
  {
    time: "20:43:12",
    title: "Blocked prompt sequence",
    detail: "A multi-hop jailbreak attempt was intercepted before the planning agent assembled an execution graph.",
    tag: "Blocked Prompt",
  },
  {
    time: "20:38:04",
    title: "Policy override rejected",
    detail: "A temporary scope elevation request failed trust attestation and was returned for human review.",
    tag: "Policy Action",
  },
  {
    time: "20:31:55",
    title: "Sensitive connector shielded",
    detail: "Outbound summarization was scrubbed after a token reference approached a protected connector boundary.",
    tag: "Connector Access",
  },
  {
    time: "20:27:19",
    title: "Compliance snapshot archived",
    detail: "Evidence, agent state, and policy branch history were committed to the immutable review ledger.",
    tag: "Governance",
  },
];

export const policyRules = [
  {
    name: "Prompt Instruction Isolation",
    level: "Strict",
    description: "Maintains hard separation between user content, orchestration logic, and hidden system directives.",
    enabled: true,
  },
  {
    name: "Credential Boundary Lock",
    level: "Maximum",
    description: "Prevents secret extraction attempts across tools, file handles, model memory, and connector channels.",
    enabled: true,
  },
  {
    name: "Autonomous Tool Approval",
    level: "Conditional",
    description: "Requires trust scoring and signed policy attestation before an agent can execute external actions.",
    enabled: false,
  },
];

export const permissionLayers = [
  { label: "Agent Memory Isolation", status: "Stable" },
  { label: "Connector Allowlisting", status: "Enforced" },
  { label: "Human Escalation Review", status: "Standby" },
];

export const settingsGroups = [
  {
    title: "Telemetry Layer",
    items: ["Live threat streaming", "Radar sweep overlays", "Ambient system particles"],
  },
  {
    title: "Governance Layer",
    items: ["Strict review mode", "Evidence retention", "Executive digest summaries"],
  },
];
