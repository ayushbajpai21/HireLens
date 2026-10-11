import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable, Preformatted
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(40, 760, "HireLens Platform | System Design, AI Architecture & Interview Master Notes")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.5)
            self.line(40, 752, 572, 752)
            
        # Footer
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(572, 28, page_str)
        self.drawString(40, 28, "CONFIDENTIAL - SYSTEM DESIGN & TECHNICAL INTERVIEW PREPARATION GUIDE")
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(40, 38, 572, 38)
        self.restoreState()


def build_pdf(filename="HireLens_System_Design_and_Architecture_Notes.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=50,
        bottomMargin=50
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor("#0F172A"),
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#0284C7"),
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'Header1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=colors.HexColor("#0F172A"),
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Header2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#1E293B"),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    h3_style = ParagraphStyle(
        'Header3',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#0369A1"),
        spaceBefore=6,
        spaceAfter=2,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#334155"),
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#334155"),
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )

    code_style = ParagraphStyle(
        'CodeBlock',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor("#0F172A")
    )

    callout_style = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#1E293B")
    )

    q_title_style = ParagraphStyle(
        'QuestionTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor("#0F172A"),
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    story = []

    def make_callout(text, bg="#F1F5F9", border="#0284C7"):
        p = Paragraph(text, callout_style)
        t = Table([[p]], colWidths=[532])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor(bg)),
            ('LEFTPADDING', (0,0), (-1,-1), 10),
            ('RIGHTPADDING', (0,0), (-1,-1), 10),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('LINELEFT', (0,0), (0,0), 3, colors.HexColor(border)),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ]))
        return t

    def make_code_box(code_text):
        p = Preformatted(code_text, code_style)
        t = Table([[p]], colWidths=[532])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ]))
        return t

    # -------------------------------------------------------------
    # COVER / TITLE SECTION
    # -------------------------------------------------------------
    story.append(Paragraph("HireLens Platform Architecture & System Design", title_style))
    story.append(Paragraph("Comprehensive Interview Guide, AI Pipeline Deep-Dive & Large-Scale System Design Master Notes", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#0284C7"), spaceAfter=10))

    meta_text = (
        "<b>Document Scope:</b> End-to-end System Design Analysis, AI Pipeline Mechanics (Groq LPU, PyMuPDF, Pydantic V2, Qdrant RAG), "
        "Dynamic Interview Assessment Engine, Microservice Topologies, and 15 High-Frequency Production Interview Questions with Architectural Solutions."
    )
    story.append(make_callout(meta_text, bg="#F0F9FF", border="#0284C7"))
    story.append(Spacer(1, 10))

    # -------------------------------------------------------------
    # SECTION 1: HIGH LEVEL ARCHITECTURE
    # -------------------------------------------------------------
    story.append(Paragraph("1. High-Level 3-Tier System Architecture", h1_style))
    story.append(Paragraph(
        "HireLens is built on an event-driven, decoupled microservices model designed for sub-second user responsiveness and zero-hallucination deterministic AI processing.",
        body_style
    ))

    arch_diagram = """
+-----------------------------------------------------------------------------------------+
|                                    CLIENT APPLICATION                                   |
|                React 18 SPA | Vite | Tailwind CSS | Framer Motion (Port 5173)           |
+-----------------------------------------------------------------------------------------+
       |                                                                  ^
       | HTTP / REST (JWT Auth, Multipart Uploads)                        | State Sync
       v                                                                  |
+----------------------------------------------------+                    |
|                CORE BACKEND SERVICE                |                    |
|         Node.js 20 | Express | Mongoose            |                    |
|              (Port 5000 / Production)              |                    |
+----------------------------------------------------+                    |
  | Auth / Sessions    | Metadata Persistence                               |
  v                    v                                                    |
+-----------------+  +-------------------------------+                      |
| Resend Emailer  |  | MongoDB Database              |                      |
| Transactional   |  | Collections: users, resumes   |                      |
+-----------------+  +-------------------------------+                      |
       |                                                                    |
       | Forward PDF Byte-Stream                                            |
       v                                                                    |
+--------------------------------------------------------------------+      |
|                                AI MICROSERVICE                     |      |
|               Python 3.11+ | FastAPI | Uvicorn (Port 8000)          |------+
|  +----------------------+ +--------------------+ +--------------+  |
|  | PyMuPDF (fitz)       | | Groq LPU Client    | | Qdrant RAG   |  |
|  | Binary Byte Parser   | | LLaMA 3.3 70B      | | Vector Store |  |
|  +----------------------+ +--------------------+ +--------------+  |
+--------------------------------------------------------------------+
"""
    story.append(make_code_box(arch_diagram.strip()))
    story.append(Spacer(1, 8))

    # Architecture Breakdown Table
    arch_data = [
        ["Subsystem", "Tech Stack", "Port", "Core Responsibilities"],
        ["Client (Frontend)", "React 18, Vite, Context API, Tailwind", "5173", "UI rendering, resume selector, interview tester, timer, state management."],
        ["Core Server", "Node.js, Express, Multer, Mongoose", "5000", "JWT Auth, bcrypt security, Multer upload staging, Resend emails, MongoDB sync."],
        ["AI Microservice", "Python 3.11, FastAPI, PyMuPDF, Groq", "8000", "In-memory PDF text extraction, LLaMA 3.3 70B parsing, Pydantic V2, Qdrant RAG."]
    ]
    t_arch = Table(arch_data, colWidths=[95, 120, 42, 275])
    t_arch.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0F172A")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")])
    ]))
    story.append(t_arch)
    story.append(Spacer(1, 10))

    # -------------------------------------------------------------
    # SECTION 2: END-TO-END EXECUTION PIPELINE
    # -------------------------------------------------------------
    story.append(Paragraph("2. End-to-End Data Pipeline & AI Workflow", h1_style))
    story.append(Paragraph("The transformation from raw PDF byte streams to structured insights follows 6 deterministic stages:", body_style))

    pipeline_diagram = """
Candidate PDF Ingestion (Multipart Buffer)
       |
       v
PyMuPDF (`fitz.open(stream)`) -> Zero-OCR Extraction (<1.2s execution)
       |
       v
Groq LPU Acceleration (LLaMA 3.3 70B Versatile, Temp=0.1, Strict JSON Contract)
       |
       v
Pydantic V2 Schema Enforcement (`ResumeData(**result)`) -> Catch Malformed Types
       |
       v
MongoDB Persistence (`resumes` collection + User `activeResume` Pointer)
       |
       v
Interactive Frontend Engine:
  ├── Job Match & Gap Identification: Formula `(Matched / Required) * 100`
  └── Domain Question Binding: `getTrackForSkill()` -> 15-Question Technical Quiz
"""
    story.append(make_code_box(pipeline_diagram.strip()))
    story.append(Spacer(1, 6))

    story.append(Paragraph("<b>Stage 1: Ingestion & Buffer Sanitization:</b> The frontend uploads a candidate document to Node.js via Multer. Node.js validates MIME type, verifies size limits (<10MB), and streams binary buffers to FastAPI without storing unnecessary disk files.", bullet_style))
    story.append(Paragraph("<b>Stage 2: High-Speed Text Decoding (PyMuPDF):</b> PyMuPDF opens the in-memory stream directly (`fitz.open(stream=content, filetype='pdf')`). It extracts native PDF typography matrices in sub-second time, avoiding slow OCR processing.", bullet_style))
    story.append(Paragraph("<b>Stage 3: Deterministic Structuring (Groq + LLaMA 3.3 70B):</b> Raw text is wrapped with an ATS parsing system prompt. Groq LPU computes inferences with temperature 0.1, eliminating stochastic hallucinations and extracting skills, experience, and education.", bullet_style))
    story.append(Paragraph("<b>Stage 4: Contract Enforcement (Pydantic V2):</b> The raw JSON response is parsed into `ResumeData`. Missing or malformed types are caught before persistence, guaranteeing data integrity in MongoDB.", bullet_style))
    story.append(Paragraph("<b>Stage 5: Skill-to-Domain Mapping (`getTrackForSkill`):</b> Candidate skills are parsed through normalized string patterns (e.g., 'deep learning', 'cnn', 'lstm' map to `deep-learning`), instantly serving 15 focused technical questions.", bullet_style))
    story.append(Spacer(1, 10))

    # -------------------------------------------------------------
    # SECTION 3: SYSTEM DESIGN QUESTIONS & ARCHITECTURAL ANSWERS
    # -------------------------------------------------------------
    story.append(PageBreak())
    story.append(Paragraph("3. System Design Interview Questions & Technical Answers", h1_style))
    story.append(Paragraph(
        "Below are 15 comprehensive System Design questions specifically tailored to the HireLens AI-driven architecture and large-scale technical assessment platforms.",
        body_style
    ))
    story.append(Spacer(1, 4))

    # Q1
    story.append(Paragraph("Q1. How do you scale resume parsing when 100,000 candidates upload resumes simultaneously during a campus recruitment drive?", q_title_style))
    q1_ans = """
<b>Architectural Solution:</b>
In a synchronous architecture, 100k concurrent requests would exhaust server memory and trigger HTTP timeouts. To handle high concurrency:
1. <b>Decouple Upload from Parsing:</b> The client uploads directly to an S3/GCS bucket via a Pre-Signed URL. This offloads multi-gigabyte upload traffic from application servers.
2. <b>Event-Driven Asynchronous Pipeline:</b> S3 bucket notification emits an `ObjectCreated` event into an Apache Kafka or AWS SQS message queue.
3. <b>Worker Fleet with Auto-Scaling (HPA):</b> A fleet of Python worker pods (managed by Kubernetes Horizontal Pod Autoscaler) consumes from Kafka. Each worker pulls the PDF, runs PyMuPDF extraction, and sends requests to the LLM.
4. <b>Real-Time Client Notification:</b> The frontend polls a status endpoint or establishes a WebSocket / SSE (Server-Sent Events) connection to receive a notification once the status shifts from `PROCESSING` to `COMPLETED`.
"""
    story.append(Paragraph(q1_ans.strip(), body_style))
    story.append(Spacer(1, 4))

    # Q2
    story.append(Paragraph("Q2. How do you handle external LLM API rate limits (HTTP 429) and outages (HTTP 5xx) with zero system downtime?", q_title_style))
    q2_ans = """
<b>Architectural Solution:</b>
External AI providers (Groq, OpenAI, Anthropic) have strict Rate Limits (Requests Per Minute - RPM, Tokens Per Minute - TPM).
1. <b>Circuit Breaker Pattern:</b> Implement a circuit breaker (e.g., using `pybreaker` or Netflix Hystrix). If Groq API fails 5 times consecutively, the breaker opens, immediately routing traffic to fallback providers without waiting for timeouts.
2. <b>Multi-Provider Redundancy:</b> Primary: Groq LLaMA 3.3 70B (lowest latency). Secondary: Anthropic Claude 3.5 Sonnet or OpenAI GPT-4o-mini. Tertiary: Self-hosted local Ollama / vLLM cluster running LLaMA 3.1 8B.
3. <b>Token Bucket Rate Limiter with Exponential Backoff + Jitter:</b> Outgoing worker requests pass through a Redis-backed Token Bucket. Retries use exponential backoff with full jitter: `T_wait = min(max_backoff, base * 2^attempt) + random_jitter`.
4. <b>Result Caching:</b> Hash the raw resume text using SHA-256. If a candidate re-uploads an identical document, return the cached parsed JSON from Redis without calling the LLM.
"""
    story.append(Paragraph(q2_ans.strip(), body_style))
    story.append(Spacer(1, 4))

    # Q3
    story.append(Paragraph("Q3. How do you prevent LLMs from hallucinating skills, work experience, or graduation dates in an ATS system?", q_title_style))
    q3_ans = """
<b>Architectural Solution:</b>
Hallucinations can corrupt candidate profiles. To enforce determinism:
1. <b>Strict Zero-Stochasticity Parameters:</b> Set LLM temperature to `0.0` or `0.1` and top_p to `0.1`.
2. <b>Pydantic V2 Strict Typing:</b> Pass JSON schemas to the LLM (OpenAI Structured Outputs / Groq JSON Mode). Pydantic models reject any output containing unknown fields or mismatched data types.
3. <b>Bi-Directional Grounding Verification (String Grounding Filter):</b> Run a post-parsing verification pass where each extracted skill or company name must exist as a substring (or high-similarity fuzzy match >= 0.85) inside the original raw text. If an extracted skill is not found in the original document, it is discarded.
4. <b>Automated Evaluation Harness:</b> Maintain a benchmark test suite of 500 gold-standard resumes to run regression evaluations on every prompt modification.
"""
    story.append(Paragraph(q3_ans.strip(), body_style))
    story.append(Spacer(1, 4))

    # Q4
    story.append(Paragraph("Q4. How does the RAG (Retrieval-Augmented Generation) pipeline scale to millions of job descriptions and questions using Qdrant Vector DB?", q_title_style))
    q4_ans = """
<b>Architectural Solution:</b>
1. <b>Embedding Generation:</b> Text chunks (size 512 tokens with 50-token overlap) are embedded using high-throughput models like `text-embedding-3-small` or `bge-base-en-v1.5`.
2. <b>HNSW Indexing in Qdrant:</b> Use Hierarchical Navigable Small World (HNSW) graphs. HNSW provides sub-10ms nearest neighbor search across millions of vectors with high recall (>98%).
3. <b>Scalar Quantization:</b> Convert 32-bit floating point vectors (FP32) to 8-bit integers (INT8). This reduces memory consumption by 75% with negligible (<1%) loss in recall.
4. <b>Payload Filtering & Multi-Tenancy:</b> Index payloads by `candidate_id` and `domain`. Search queries apply pre-filtering so Qdrant only scans vectors relevant to that specific technical category.
"""
    story.append(Paragraph(q4_ans.strip(), body_style))
    story.append(Spacer(1, 6))

    story.append(PageBreak())

    # Q5
    story.append(Paragraph("Q5. Explain the Skill Canonicalization problem. How do you map variations like 'ReactJS', 'React.js', and 'React' to a single unified entity at scale?", q_title_style))
    q5_ans = """
<b>Architectural Solution:</b>
Candidates write heterogeneous skill names. A multi-layer resolution engine is used:
1. <b>Layer 1 - Regex Normalization:</b> Lowercase all strings and strip delimiters: `s.lower().replace('-', '').replace('.', '').replace(' ', '')`. Both 'React.js' and 'React-JS' become 'reactjs'.
2. <b>Layer 2 - Inverted Alias Trie:</b> Maintain a trie structure mapping known aliases: `{'react': ['reactjs', 'react.js', 'react native', 'react front end']}`.
3. <b>Layer 3 - Semantic Embedding Distance (Fallback):</b> If an unknown skill string appears (e.g., 'PyTorch Lightning'), compute cosine similarity against a vector database of canonical technical competencies. If similarity exceeds 0.88, map to the canonical parent ('PyTorch').
"""
    story.append(Paragraph(q5_ans.strip(), body_style))
    story.append(Spacer(1, 4))

    # Q6
    story.append(Paragraph("Q6. What is the database indexing and schema design strategy in MongoDB for HireLens?", q_title_style))
    q6_ans = """
<b>Architectural Solution:</b>
1. <b>Schema Decomposition:</b> Separate `User` and `Resume` into distinct collections. A candidate can have multiple resumes over time. Embedding all resumes in a single User document risks hitting MongoDB's 16MB document size limit and causes memory bloat.
2. <b>Indexing Strategy:</b>
   - `User Collection`: Unique index on `email`.
   - `Resume Collection`: Compound index on `{ userId: 1, createdAt: -1 }` for fast listing of candidate resumes. Multikey index on `skills` for fast candidate-talent searches.
3. <b>Active Resume Pointer:</b> The `User` document stores `activeResume: ObjectId("...")`. When an interview or match query runs, MongoDB fetches the active resume in a single indexed index-key lookup ($O(1)$).
"""
    story.append(Paragraph(q6_ans.strip(), body_style))
    story.append(Spacer(1, 4))

    # Q7
    story.append(Paragraph("Q7. How do you design an adaptive real-time technical interview simulator with sub-second answer evaluation?", q_title_style))
    q7_ans = """
<b>Architectural Solution:</b>
1. <b>Item Response Theory (IRT) Engine:</b> The engine models candidate ability ($\theta$) and question difficulty ($b$). Starting with intermediate difficulty ($b=0$), correct answers increase difficulty ($b=+1$), while incorrect answers decrease difficulty ($b=-1$).
2. <b>Stateful In-Memory Session Storage:</b> Store the active assessment state in Redis with a 2-hour TTL: `{ candidateId, trackId, currentIdx, answersMap, timeRemaining }`. Avoid writing every keystroke or click to MongoDB.
3. <b>Asynchronous Batch Persist:</b> When the test is submitted (or the timer expires), an atomic background task aggregates scores, generates the performance radar, and writes the final summary to MongoDB.
"""
    story.append(Paragraph(q7_ans.strip(), body_style))
    story.append(Spacer(1, 4))

    # Q8
    story.append(Paragraph("Q8. How do you ensure candidate data privacy, security, and GDPR/DPDP compliance for ATS platforms?", q_title_style))
    q8_ans = """
<b>Architectural Solution:</b>
1. <b>PII Anonymization Layer (Pre-LLM):</b> Before sending resume text to external AI models, strip phone numbers, home addresses, and government IDs using deterministic regex and named entity recognition (NER).
2. <b>Zero Data Retention (ZDR):</b> Ensure external LLM provider agreements (e.g., Enterprise Groq / OpenAI) have ZDR enabled—prompts and completions must not be logged or used for model retraining.
3. <b>Cryptographic Storage:</b> Sensitive fields are encrypted at rest using AES-256. User passwords use Bcrypt with a work factor of 12. Authentication uses HTTP-only, SameSite=Strict JWT cookies to prevent XSS and CSRF token exfiltration.
"""
    story.append(Paragraph(q8_ans.strip(), body_style))
    story.append(Spacer(1, 4))

    # Q9
    story.append(Paragraph("Q9. How do you implement API Rate Limiting to prevent abuse of expensive LLM endpoints?", q_title_style))
    q9_ans = """
<b>Architectural Solution:</b>
1. <b>Sliding Window Counter in Redis:</b> Use Redis sorted sets (`ZADD`, `ZREMRANGEBYSCORE`, `ZCARD`) to implement a sliding window log. This prevents bursting at boundary limits.
2. <b>Tiered Limiting:</b>
   - Resume Upload / Parsing: 5 requests per hour per user.
   - Mock Interview Answers: 60 requests per hour per session.
   - Public Discovery Endpoints: 100 requests per minute per IP.
3. <b>Graceful Rejection:</b> Exceeded quotas return HTTP 429 with standard headers: `Retry-After: <seconds>` and informative error messaging.
"""
    story.append(Paragraph(q9_ans.strip(), body_style))
    story.append(Spacer(1, 6))

    story.append(PageBreak())

    # Q10
    story.append(Paragraph("Q10. How do you locate bottlenecks and errors across React, Node.js, FastAPI, and Groq using Distributed Tracing?", q_title_style))
    q10_ans = """
<b>Architectural Solution:</b>
1. <b>OpenTelemetry (OTel) Instrumentation:</b> Inject a standard W3C `traceparent` header at the React frontend.
2. <b>Trace Propagation:</b> When React calls Node.js (`POST /api/resumes/upload`), Node.js reads the header, creates a child span, and forwards the header to FastAPI (`POST /ai/resume/analyze`).
3. <b>Span Breakdown:</b>
   - `Client Span`: Total latency perceived by candidate (e.g., 1850ms).
   - `Node Span`: Multer buffer staging & authentication (120ms).
   - `FastAPI Span`: PyMuPDF memory decode (80ms).
   - `Groq External Span`: LPU model inference (1450ms).
   - `Mongo Span`: Database write (25ms).
4. <b>Visualization:</b> Export traces to Jaeger or Grafana Tempo. Any anomaly or latency spike is instantly attributable to the exact component.
"""
    story.append(Paragraph(q10_ans.strip(), body_style))
    story.append(Spacer(1, 4))

    # Q11
    story.append(Paragraph("Q11. How do you prevent race conditions when a user rapidly uploads multiple resumes or switches resumes during an active interview?", q_title_style))
    q11_ans = """
<b>Architectural Solution:</b>
1. <b>Optimistic Concurrency Control (OCC):</b> In MongoDB, include a `version` field (`__v`). State updates only commit if `version` matches: `Resume.updateOne({ _id, version: currentVersion }, { $set: ..., $inc: { version: 1 } })`.
2. <b>Idempotency Keys:</b> Frontend attaches an `X-Idempotency-Key` (UUIDv4) to upload requests. Node.js stores keys in Redis for 60 seconds; identical retry clicks return the cached in-flight response.
3. <b>Frontend Test State Isolation:</b> When `handleSwitchResume(newResumeId)` executes, the application purges local quiz state (`answers = {}`, `currentIdx = 0`), preventing previous test answers from corrupting the new candidate assessment.
"""
    story.append(Paragraph(q11_ans.strip(), body_style))
    story.append(Spacer(1, 4))

    # Q12
    story.append(Paragraph("Q12. What caching strategy minimizes database and LLM operational expenses in this platform?", q_title_style))
    q12_ans = """
<b>Architectural Solution:</b>
A 3-layer caching hierarchy is implemented:
1. <b>Edge Cache (Cloudflare / CloudFront CDN):</b> Cache static question banks, CSS, and JS bundles at edge PoPs for 24 hours.
2. <b>Application Cache (Redis Cluster):</b>
   - Pre-computed question track metadata (`TRACKS`) cached with a 7-day TTL.
   - User active session state cached with a 2-hour TTL.
3. <b>LLM Semantic / Hash Cache:</b> Compute SHA-256 hash of `raw_resume_text`. If the hash exists in Redis, return the cached parsed JSON directly ($0.00 cost, <10ms response).
"""
    story.append(Paragraph(q12_ans.strip(), body_style))
    story.append(Spacer(1, 4))

    # Q13
    story.append(Paragraph("Q13. How does the Job Matching algorithm calculate scores and recommendations at scale?", q_title_style))
    q13_ans = """
<b>Architectural Solution:</b>
The match engine executes a two-phase scoring algorithm:
1. <b>Phase 1 - Set Intersection with String Normalization:</b>
   - Required skills: $R = \\{r_1, r_2, \\dots, r_m\\}$, Candidate skills: $C = \\{c_1, c_2, \\dots, c_n\\}$.
   - Normalized intersection: $M = R \\cap C$.
   - Technical Score: $S_{\\text{tech}} = \\text{round}\\left(\\frac{|M|}{|R|} \\times 100\\right)$.
2. <b>Phase 2 - Weighted Profile Scoring:</b>
   - Overall Score: $S_{\\text{overall}} = \\min\\left(100, \\text{round}(S_{\\text{tech}} \\times 0.70 + 24)\\right)$ where 24 points account for baseline professional structure.
3. <b>Automated Gap Identification:</b> Unmatched elements $G = R \\setminus M$ are classified as missing skills, automatically triggering tailored interview preparation recommendations.
"""
    story.append(Paragraph(q13_ans.strip(), body_style))
    story.append(Spacer(1, 4))

    # Q14
    story.append(Paragraph("Q14. How would you design an AI subjective answer grading engine for open-ended technical responses?", q_title_style))
    q14_ans = """
<b>Architectural Solution:</b>
Subjective grading uses a multi-rubric evaluation formula:
1. <b>Rubric Decomposition:</b>
   - <i>Technical Accuracy</i> (45% weight): Evaluates presence of core architectural principles.
   - <i>Completeness</i> (35% weight): Evaluates coverage of trade-offs, edge cases, and failure modes.
   - <i>Communication Clarity</i> (20% weight): Evaluates logical flow and structural articulation.
2. <b>Weighted Composite Formula:</b>
   $$\\text{Score} = (\\text{Accuracy} \\times 0.45) + (\\text{Completeness} \\times 0.35) + (\\text{Communication} \\times 0.20)$$
3. <b>Grounded Feedback Generation:</b> Generate actionable diagnostic feedback identifying both demonstrated competencies and areas required for Senior-tier progression.
"""
    story.append(Paragraph(q14_ans.strip(), body_style))
    story.append(Spacer(1, 4))

    # Q15
    story.append(Paragraph("Q15. How do you design disaster recovery and high availability across the 3 microservices?", q_title_style))
    q15_ans = """
<b>Architectural Solution:</b>
1. <b>Multi-AZ Active-Active Deployment:</b> Deploy Node.js and FastAPI pods across 3 AWS Availability Zones behind an Application Load Balancer (ALB).
2. <b>Database High Availability:</b> MongoDB Atlas replica set with 1 Primary and 2 Secondary nodes across distinct regions with automatic failover (<10 seconds).
3. <b>AI Service Fallback:</b> Node.js server maintains an embedded fallback parser (`resumeParserService.js`). If the Python FastAPI cluster is unavailable, Node.js directly interfaces with Groq Cloud, ensuring business continuity.
"""
    story.append(Paragraph(q15_ans.strip(), body_style))
    story.append(Spacer(1, 10))

    # -------------------------------------------------------------
    # SECTION 4: PRODUCTION SCALING BLUEPRINT
    # -------------------------------------------------------------
    story.append(PageBreak())
    story.append(Paragraph("4. Production Scaling Architecture Blueprint", h1_style))
    story.append(Paragraph(
        "For enterprise scale (1M+ registered candidates, 10,000 concurrent mock interviews), the target production topology expands as follows:",
        body_style
    ))

    scale_diagram = """
                     [ Cloudflare Global Anycast Edge & WAF ]
                                        |
                 +----------------------+----------------------+
                 | (Static Assets / CDN)|                      | (API Gateway / ALB)
                 v                                             v
      [ AWS S3 / CloudFront ]                       [ Envoy API Gateway ]
        React 18 SPA Bundles                        - JWT Verification
                                                    - Redis Rate Limiter
                                                    - TLS Termination
                                                               |
                     +-----------------------------------------+
                     |
         +-----------v-----------+                     +-----------------------+
         | Node.js Auth/App Pods |                     | FastAPI Python Pods   |
         | (Horizontal Autoscaled|                     | (Horizontal Pod Autos.)
         +-----------+-----------+                     +-----------+-----------+
                     |                                             |
       +-------------+-------------+                 +-------------+-------------+
       |                           |                 |                           |
       v                           v                 v                           v
 [ MongoDB Atlas ]         [ Redis Cluster ]   [ Apache Kafka ]          [ Qdrant Cluster ]
  Primary-Secondary         - Sessions          Topic: `resume-parse`     Distributed HNSW
  Sharded Replica           - Token Buckets     Topic: `interview-eval`   Quantized Vectors
                            - LLM Hash Cache
"""
    story.append(make_code_box(scale_diagram.strip()))
    story.append(Spacer(1, 10))

    story.append(Paragraph("Key Architectural Tenets for Enterprise Scale:", h2_style))
    story.append(Paragraph("1. <b>Stateless Compute:</b> All application servers (Node.js and FastAPI) remain completely stateless. All session states, active resume pointers, and rate limiting buckets are persisted in Redis or MongoDB.", bullet_style))
    story.append(Paragraph("2. <b>Asynchronous Decoupling:</b> Long-running computations (large PDF parsing, semantic vector re-indexing) are executed via Kafka topics and background worker fleets, keeping HTTP API response times under 150ms.", bullet_style))
    story.append(Paragraph("3. <b>Zero-Trust Security:</b> All internal pod-to-pod communications leverage mutual TLS (mTLS) with Istio Service Mesh, ensuring end-to-end encrypted transit.", bullet_style))
    story.append(Spacer(1, 14))

    story.append(make_callout(
        "<b>Summary for Technical Interviews:</b> When presenting HireLens to an interviewer, emphasize the separation between the I/O-intensive tier (Node.js for auth, file staging, and email) and the compute-intensive tier (FastAPI for PyMuPDF and Groq LPU). Highlight that AI determinism is achieved through low temperatures, strict Pydantic V2 contracts, and zero-stochasticity grounding.",
        bg="#F0FDF4",
        border="#16A34A"
    ))

    # Build the document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF: {filename}")

if __name__ == "__main__":
    out_file = sys.argv[1] if len(sys.argv) > 1 else "HireLens_System_Design_and_Architecture_Notes.pdf"
    build_pdf(out_file)
