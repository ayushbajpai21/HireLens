# HireLens

AI-Powered Career Intelligence, Automated Resume Parsing, Skill Gap Analysis & Adaptive Technical Interview Simulator.

---

## Overview

HireLens is an enterprise-grade AI career platform designed to bridge the gap between candidate resumes, target job descriptions, and technical interview readiness. The platform operates on a decoupled 3-tier microservices architecture:

1. **Frontend Client (React 18 + Vite):** Modern responsive web application featuring candidate dashboards, resume switcher, interactive assessment engines, and performance metrics.
2. **Core Server (Node.js + Express + MongoDB):** Authentication (JWT + Bcrypt), session management, Multer multipart upload staging, Resend transactional emails, and candidate persistence.
3. **AI Microservice (Python FastAPI + PyMuPDF + Groq LPU):** High-speed sub-second PDF byte-stream extraction, deterministic LLaMA 3.3 70B ATS resume parsing, Pydantic V2 schema validation, and Qdrant vector-based semantic RAG search.

---

## Architecture Diagram

```
[ Frontend: React 18 SPA (Vite) ]  <--->  [ Core Server: Node.js / Express (Port 5000) ]
       (Port 5173)                                        | (JWT Auth, Multipart Staging)
                                                          v
                                          [ MongoDB Database (Port 27017) ]
                                                          |
                                                          v (Binary PDF Stream)
                                          [ AI Microservice: FastAPI (Port 8000) ]
                                            ├── PyMuPDF (In-memory text decoding)
                                            ├── Groq LPU (LLaMA 3.3 70B, Temp 0.1)
                                            ├── Pydantic V2 (Strict Schema Contract)
                                            └── Qdrant Cloud (Vector Knowledge Base)
```

---

## Key Features

- **Sub-Second PDF Parsing:** PyMuPDF (`fitz`) decodes raw PDF documents in memory without heavy OCR latency.
- **Deterministic AI Extraction:** LLaMA 3.3 70B hosted on Groq LPU hardware parses candidate skills, work history, education, and projects with temperature 0.1 to eliminate hallucinations.
- **Strict Pydantic V2 Validation:** All structured JSON outputs conform to strict schema contracts before database persistence.
- **Automated Skill Canonicalization:** Advanced alias matching engine normalizes skill variants (e.g., `ReactJS`, `React.js` -> `react`).
- **Target Job Description Matcher:** Deterministic intersection and weighted profile scoring algorithm calculating technical fit and identifying skill gaps.
- **Dynamic 15-Question Technical Interview Tracks:** Skills from active candidate resumes map directly to target tracks (Deep Learning, React, Node.js, Python, System Design, DevOps) serving in-depth technical questions with immediate rationales.
- **Multi-Resume Switcher:** Seamless switching between multiple uploaded resumes with isolated test state and progress tracking.

---

## Project Structure

```
HireLens/
├── client/                  # React 18 SPA Frontend (Vite, TailwindCSS)
│   ├── src/
│   │   ├── api/             # API client services
│   │   ├── components/      # UI components & Modals
│   │   ├── context/         # AuthContext & global state
│   │   ├── data/            # Domain tracks & 15-question banks
│   │   └── pages/           # Application route pages
│   └── package.json
│
├── server/                  # Core Node.js / Express Backend
│   ├── controllers/         # Authentication & Resume controllers
│   ├── models/              # Mongoose schemas (User, Resume)
│   ├── routes/              # Express REST API endpoints
│   ├── services/            # Fallback parsing & business logic
│   ├── utils/               # Resend email helpers & JWT tokens
│   ├── server.js            # Express entry point
│   └── package.json
│
├── ai-service/              # Python FastAPI AI Microservice
│   ├── app/
│   │   ├── models/          # Pydantic V2 schemas
│   │   ├── rag/             # Qdrant knowledge base & retrieval
│   │   ├── routes/          # FastAPI routers (resume, match, interview)
│   │   └── services/        # Groq LPU client & vector integrations
│   ├── main.py              # FastAPI application root
│   └── requirements.txt     # Python dependencies
│
├── generate_system_design_pdf.py
├── HireLens_System_Design_and_Architecture_Notes.pdf
├── README.md
└── .gitignore
```

---

## Getting Started

### 1. Prerequisites
- Node.js (v18+ recommended)
- Python (v3.11+ recommended)
- MongoDB running locally or MongoDB Atlas connection string
- Groq Cloud API Key

### 2. Environment Configuration

#### Core Server (`server/.env`):
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/ai_career_copilot
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
AI_SERVICE_URL=http://127.0.0.1:8000
RESEND_API_KEY=your_resend_api_key
RESEND_FROM=onboarding@yourdomain.com
GROQ_API_KEY=your_groq_api_key
```

#### AI Microservice (`ai-service/.env`):
```env
HOST=0.0.0.0
PORT=8000
GROQ_API_KEY=your_groq_api_key
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
SIMILARITY_THRESHOLD=0.70
```

---

### 3. Installation & Running

#### Terminal 1: Core Backend
```bash
cd server
npm install
npm run start
```

#### Terminal 2: AI Microservice
```bash
cd ai-service
pip install -r requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

#### Terminal 3: Frontend Client
```bash
cd client
npm install
npm run dev -- --host
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Documentation & System Design Notes
A complete 7-page system design and architecture guide covering high concurrency (100k+ uploads), LLM rate limit mitigations, circuit breaker designs, RAG scaling, and top 15 interview solutions is included in `HireLens_System_Design_and_Architecture_Notes.pdf`.

---

## License
MIT License.
