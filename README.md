# AegisNexus AI

![AegisNexus AI Banner](https://placehold.co/1200x420/0b1220/7df9ff?text=AegisNexus+AI)

[![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61dafb?style=for-the-badge&logo=react&logoColor=06151f)](./frontend)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=ffffff)](./backend)
[![Styling](https://img.shields.io/badge/UI-TailwindCSS-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=06151f)](./frontend)
[![Animation](https://img.shields.io/badge/Motion-Framer-ff4d8d?style=for-the-badge&logo=framer&logoColor=ffffff)](./frontend)
[![Database](https://img.shields.io/badge/Database-SQLAlchemy%20%2B%20SQLite-4c8bf5?style=for-the-badge&logo=sqlite&logoColor=ffffff)](./backend)
[![AI Layer](https://img.shields.io/badge/AI-Gemini%20Ready-fbbc05?style=for-the-badge&logo=google&logoColor=202124)](./backend)

## 🚀 Introduction

**AegisNexus AI** is an AI Governance and Autonomous Threat Containment Platform built for modern agentic systems, LLM security workflows, and cyber-defense simulations. It combines a cinematic SOC-style frontend with a FastAPI-powered governance backend to analyze malicious prompts, simulate adversarial activity, stream telemetry, and surface real-time containment decisions.

Designed with a startup-grade product lens and hackathon speed, AegisNexus AI demonstrates how governance, detection, auditability, and simulation can live inside one unified command surface.

## ✨ Core Features

- Real-time AI governance dashboard with a premium futuristic UI
- Prompt threat analysis with policy-aware decisioning
- Autonomous threat containment simulation workflows
- Telemetry streaming over WebSockets for live operational visibility
- Audit log retrieval for post-incident review
- Policy simulation routes for governance validation
- Interactive attack simulator for testing adversarial prompt behavior
- Gemini-assisted trust analysis with deterministic fallback behavior

## 🖼 Screenshots

| Surface | Preview |
| --- | --- |
| Overview Dashboard | ![Overview Screenshot](https://placehold.co/1200x700/0a1020/c7f9ff?text=Overview+Dashboard) |
| Threat Console | ![Threat Console Screenshot](https://placehold.co/1200x700/0a1020/ffcc70?text=Threat+Console) |
| Simulator Workspace | ![Simulator Screenshot](https://placehold.co/1200x700/0a1020/9ef7d7?text=Simulator+Workspace) |

## 🎥 Demo Video

Demo video placeholder: `Add your project walkthrough URL here`

## 🌐 Live Deployment

Live deployment placeholder: `Add your hosted frontend URL here`

## 📚 API Documentation

When the backend is running locally, FastAPI docs are available at:

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

## 🧠 Architecture Overview

```text
┌──────────────────────────────────────────────────────────────┐
│                        AegisNexus AI                        │
├──────────────────────────────────────────────────────────────┤
│ Frontend: React + Vite + Tailwind + Framer Motion          │
│  ├─ Governance dashboard                                   │
│  ├─ Threat analysis views                                  │
│  ├─ Policy and audit visualization                         │
│  └─ Attack simulator + telemetry surfaces                  │
├──────────────────────────────────────────────────────────────┤
│ Backend: FastAPI + SQLAlchemy + WebSockets                 │
│  ├─ Threat analysis routes                                 │
│  ├─ Governance / policy simulation                         │
│  ├─ Attack simulation engine                               │
│  ├─ Audit log services                                     │
│  └─ Live telemetry stream manager                          │
├──────────────────────────────────────────────────────────────┤
│ AI Layer                                                   │
│  ├─ Gemini trust assessment integration                    │
│  └─ Deterministic fallback detection logic                 │
└──────────────────────────────────────────────────────────────┘
```

## 🏗 Repository Structure

```bash
.
├── backend/
│   ├── app/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── websocket/
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── sections/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🖥 Frontend Stack

| Layer | Technology |
| --- | --- |
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| Icons | Lucide React |
| State / App Context | React Context |

## ⚙️ Backend Stack

| Layer | Technology |
| --- | --- |
| API Framework | FastAPI |
| ASGI Server | Uvicorn |
| ORM | SQLAlchemy 2 |
| Validation | Pydantic 2 |
| Database | SQLite by default |
| Realtime Transport | WebSockets |
| Config Management | python-dotenv |
| AI Integration | google-generativeai |

## 🛡 AI Governance Capabilities

- Governance-aware prompt inspection
- Trust scoring and adversarial signal extraction
- Recommended action generation for AI traffic
- Policy evaluation before unsafe actions propagate
- Middleware-driven governance interception
- Human-review friendly decision payloads for downstream dashboards

## 🔍 Threat Detection Capabilities

- Prompt injection detection
- Credential exfiltration pattern recognition
- Privilege escalation intent analysis
- Instruction override detection
- Risk scoring and severity labeling
- Sample threat feed endpoints for testing and demonstrations

## 🧪 Simulator Features

- Scenario-driven adversarial rehearsal console
- Synthetic prompt attack execution
- Attack simulation route by simulation type
- Integrated policy and threat visibility inside the frontend
- Enterprise-style operator workspace for safe experimentation

## 📡 Telemetry System

- Backend telemetry snapshots via REST
- Live operational events streamed over WebSockets
- Mock stream metadata for client integration and demos
- Dashboard-ready event surfaces for SOC visualization

### Telemetry Endpoints

| Type | Endpoint | Purpose |
| --- | --- | --- |
| REST | `GET /telemetry/snapshot` | Fetch current telemetry snapshot |
| REST | `GET /telemetry/mock-stream` | Discover example telemetry event types |
| WebSocket | `/ws/telemetry` | Receive live telemetry events |

## 🧰 Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd "AI secutiry and governence"
```

### 2. Backend setup

```bash
cd backend
python -m venv .venv
```

#### Windows

```bash
.venv\Scripts\activate
pip install -r requirements.txt
```

#### macOS / Linux

```bash
source .venv/bin/activate
pip install -r requirements.txt
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

## 💻 Local Development

### Start the backend

```bash
cd backend
uvicorn app.main:app --reload
```

Backend default URL:

```text
http://127.0.0.1:8000
```

### Start the frontend

```bash
cd frontend
npm run dev
```

Frontend default URL:

```text
http://127.0.0.1:5173
```

## 🔐 Environment Variables

Create environment files before running the project.

### Backend `.env`

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `DATABASE_URL` | No | SQLAlchemy database connection string | `sqlite:///./aegisnexus.db` |
| `GEMINI_API_KEY` | No | Google Gemini API key for AI-assisted trust analysis | `your_api_key_here` |
| `GEMINI_MODEL` | No | Gemini model name override | `gemini-1.5-flash` |

### Frontend `.env`

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `VITE_API_BASE_URL` | No | Base URL for the FastAPI backend | `http://127.0.0.1:8000` |

## 🔌 API Routes

### Core Platform

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Platform identity and status payload |
| `GET` | `/health` | Health check endpoint |

### Threat Analysis

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/analyze` | Analyze a prompt for threats |
| `POST` | `/analyze/governance` | Analyze a prompt and return governance decision |
| `GET` | `/threats/samples` | Return sample threat inputs |

### Policies

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/policies` | List governance policies |
| `POST` | `/policies/simulate` | Simulate policy behavior for a prompt |

### Simulator

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/simulator/{simulation_type}` | Run a named attack simulation |

### Audit

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/audit/logs` | Retrieve audit logs with optional `limit` |

### Telemetry

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/telemetry/snapshot` | Return current telemetry snapshot |
| `GET` | `/telemetry/mock-stream` | Return WebSocket stream metadata |
| `WS` | `/ws/telemetry` | Subscribe to live telemetry |

## 🚢 Deployment

### Frontend

- Build with `npm run build`
- Deploy the `frontend/dist` output to Vercel, Netlify, Cloudflare Pages, or a static host
- Set `VITE_API_BASE_URL` to your production backend URL

### Backend

- Run with `uvicorn app.main:app --host 0.0.0.0 --port 8000`
- Deploy on Render, Railway, Fly.io, Azure, AWS, or any ASGI-compatible platform
- Provide `DATABASE_URL`, `GEMINI_API_KEY`, and `GEMINI_MODEL` as environment variables
- Use a production-grade database if moving beyond local SQLite

### Suggested Production Hardening

- Restrict CORS to approved frontend origins
- Replace SQLite with PostgreSQL
- Add authentication and role-based access control
- Add structured logging and observability pipelines
- Add rate limiting and API gateway protections

## 🛣 Future Roadmap

- Multi-tenant governance workspaces
- Fine-grained RBAC and operator identities
- Policy versioning with approval workflows
- SIEM and SOC tool integrations
- Persistent incident timelines and forensic bundles
- LLM red-team campaign automation
- Model registry and agent trust scoring
- Cloud deployment templates and CI/CD pipelines

## 🤝 Contribution

Contributions are welcome.

### Recommended workflow

1. Fork the repository
2. Create a feature branch
3. Make focused changes with clear commit messages
4. Validate frontend and backend locally
5. Open a pull request with context, screenshots, and testing notes

### Contribution guidelines

- Keep UI changes aligned with the AegisNexus visual system
- Prefer small, reviewable commits
- Document new routes, environment variables, and system behavior
- Preserve security-first defaults when extending governance logic

## 📄 License

This project is currently unlicensed.

If you plan to open source AegisNexus AI publicly, add a license file such as `MIT`, `Apache-2.0`, or a custom commercial license before release.

