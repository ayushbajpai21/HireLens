import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  FileText, 
  Target, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  Lock, 
  Database,
  Layers,
  FileCheck2,
  Check,
  Compass,
  Zap,
  Activity,
  Info,
  Play,
  Users,
  Bot,
  Brain,
  Code2,
  AlertCircle
} from 'lucide-react';

const PREVIEW_ROLES = [
  {
    role: 'Senior Full Stack Software Engineer',
    domain: 'Full Stack',
    skills: ['TypeScript', 'React.js', 'Node.js', 'PostgreSQL', 'REST APIs', 'Git', 'Docker'],
    score: 95
  },
  {
    role: 'Backend Systems & Distributed Architect',
    domain: 'Backend & Systems',
    skills: ['Python/Go', 'PostgreSQL', 'Redis', 'Microservices', 'Kafka', 'System Design'],
    score: 92
  },
  {
    role: 'AI / Machine Learning Engineer',
    domain: 'AI & Data',
    skills: ['Python', 'PyTorch', 'Vector Databases', 'RAG Pipelines', 'LLMs', 'SQL'],
    score: 91
  },
  {
    role: 'Cloud & DevOps Platform Engineer',
    domain: 'Cloud & DevOps',
    skills: ['Kubernetes', 'Terraform', 'AWS/GCP', 'CI/CD Pipelines', 'Docker', 'Linux'],
    score: 89
  }
];

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const [selectedRoleIdx, setSelectedRoleIdx] = useState(0);
  const activeRole = PREVIEW_ROLES[selectedRoleIdx];

  // Smooth scroll to features when navigating with #features hash
  useEffect(() => {
    if (window.location.hash === '#features') {
      setTimeout(() => {
        const el = document.getElementById('features');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', position: 'relative' }}>
      {/* Background Ambient Glow */}
      <div className="cosmic-horizon-glow"></div>

      {/* ==========================================================================
          HERO SECTION (Executive SaaS Platform Layout)
          ========================================================================== */}
      <section className="hero-saas-layout">
        {/* Left Column: Authoritative Executive Typography & CTA */}
        <div className="hero-saas-left">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="hero-pill-badge"
          >
            <Compass size={14} color="#0284c7" />
            <span>Technical Career &amp; Assessment Intelligence</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="hero-saas-title"
          >
            The career platform for <br />
            <span className="hero-title-highlight">technical excellence</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="hero-saas-subtitle"
          >
            Benchmark your engineering capabilities, evaluate resume alignment with target job requirements, and master domain-specific technical assessments with deterministic scoring.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="hero-saas-actions"
          >
            <Link to={isAuthenticated ? "/dashboard" : "/register"} className="btn-hero-start">
              <span>{isAuthenticated ? "Launch Dashboard" : "Get Started Free"}</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/interview" className="btn-hero-demo">
              <Play size={15} fill="currentColor" />
              <span>Explore Practice Questions</span>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hero-reassurance-row"
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={14} color="#0284c7" /> Instant resume parsing
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={14} color="#0284c7" /> Objective skill scoring
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={14} color="#0284c7" /> Complete data privacy
            </span>
          </motion.div>
        </div>

        {/* Right Column: Executive Workspace Dashboard Preview */}
        <div className="hero-saas-right">
          <div className="hero-preview-aura" />

          {/* Main Mockup Glass Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="hero-mockup-card"
          >
            {/* Header */}
            <div className="mockup-header">
              <div>
                <div className="mockup-greeting">Candidate Workspace</div>
                <div className="mockup-subtext">Technical competency profile and interview readiness telemetry.</div>
              </div>
              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                Operational
              </span>
            </div>

            {/* 3 Metric Tiles */}
            <div className="mockup-stats-grid">
              <div className="mockup-stat-box">
                <div className="mockup-stat-label">Evaluations Completed</div>
                <div className="mockup-stat-val-row">
                  <span className="mockup-stat-val">128</span>
                  <span className="mockup-stat-trend">↑ 24%</span>
                </div>
              </div>
              <div className="mockup-stat-box">
                <div className="mockup-stat-label">Preparation Time Saved</div>
                <div className="mockup-stat-val-row">
                  <span className="mockup-stat-val">32h</span>
                  <span className="mockup-stat-trend">↑ 18%</span>
                </div>
              </div>
              <div className="mockup-stat-box">
                <div className="mockup-stat-label">Questions Solved</div>
                <div className="mockup-stat-val-row">
                  <span className="mockup-stat-val">1,458</span>
                  <span className="mockup-stat-trend">↑ 32%</span>
                </div>
              </div>
            </div>

            {/* Two Interactive Sub Panels */}
            <div className="mockup-panels-grid">
              {/* Left: Core Evaluation Modules */}
              <div className="mockup-sub-card">
                <div className="mockup-card-title">
                  <Cpu size={14} color="#0284c7" />
                  <span>Assessment Modules</span>
                </div>
                <div className="agent-row">
                  <span className="agent-name">
                    <Sparkles size={12} color="#0ea5e9" />
                    Technical Drills
                  </span>
                  <span className="agent-status-badge status-running">Running</span>
                </div>
                <div className="agent-row">
                  <span className="agent-name">
                    <FileCheck2 size={12} color="#10b981" />
                    PyMuPDF Parser
                  </span>
                  <span className="agent-status-badge status-ready">Ready</span>
                </div>
                <div className="agent-row">
                  <span className="agent-name">
                    <Target size={12} color="#8b5cf6" />
                    Role Match Engine
                  </span>
                  <span className="agent-status-badge status-active">Active</span>
                </div>
              </div>

              {/* Right: Assessment Pipeline */}
              <div className="mockup-sub-card">
                <div className="mockup-card-title">
                  <Zap size={14} color="#8b5cf6" />
                  <span>Evaluation Pipeline</span>
                </div>
                <div className="workflow-nodes-container">
                  <div className="workflow-node-item">
                    <div className="workflow-node-icon" style={{ background: '#e0f2fe' }}>
                      <FileText size={12} color="#0284c7" />
                    </div>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>1. Resume Ingestion</span>
                  </div>
                  <div className="workflow-node-item">
                    <div className="workflow-node-icon" style={{ background: '#f3e8ff' }}>
                      <Activity size={12} color="#7e22ce" />
                    </div>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>2. Skill Gap Diagnosis</span>
                  </div>
                  <div className="workflow-node-item">
                    <div className="workflow-node-icon" style={{ background: '#fee2e2' }}>
                      <Brain size={12} color="#dc2626" />
                    </div>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>3. Technical Drills</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Session Progress Bar */}
            <div className="mockup-floating-agent-bar">
              <div className="progress-header">
                <div className="progress-title">
                  <Activity size={14} color="#0ea5e9" />
                  <span>Session Progress: System Architecture &amp; Data Modeling</span>
                </div>
                <span className="progress-pct">78%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
          TRUSTED LOGOS STRIP (Direct Match to SS 1)
          ========================================================================== */}
      <section className="trusted-logos-strip">
        <div className="trusted-title">Trusted by innovative candidates &amp; engineering teams at</div>
        <div className="trusted-logos-row">
          <div className="trusted-logo-item">
            <span style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: '1.25rem' }}>Notion</span>
          </div>
          <div className="trusted-logo-item">
            <span style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: '1.25rem' }}>HubSpot</span>
          </div>
          <div className="trusted-logo-item">
            <span style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: '1.25rem' }}>Slack</span>
          </div>
          <div className="trusted-logo-item">
            <span style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: '1.25rem' }}>OpenAI</span>
          </div>
          <div className="trusted-logo-item">
            <span style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: '1.25rem' }}>Google</span>
          </div>
          <div className="trusted-logo-item">
            <span style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: '1.25rem' }}>Microsoft</span>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          4 HIGH-IMPACT FEATURE STAT CARDS (Direct Match to Bottom of SS 1)
          ========================================================================== */}
      <section className="feature-stat-cards-grid">
        <div className="feature-stat-card">
          <div className="stat-icon-wrap" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <Zap size={22} />
          </div>
          <div className="stat-big-val">10x</div>
          <div className="stat-card-heading">Faster workflows</div>
          <div className="stat-card-desc">
            Automate repetitive prep tasks, parse resume PDF text in 1.2s, and save hours every week.
          </div>
        </div>

        <div className="feature-stat-card">
          <div className="stat-icon-wrap" style={{ background: '#f3e8ff', color: '#7e22ce' }}>
            <Sparkles size={22} />
          </div>
          <div className="stat-big-val">98%</div>
          <div className="stat-card-heading">Accuracy rate</div>
          <div className="stat-card-desc">
            Deterministic PyMuPDF extraction and Pydantic validation deliver consistent, verified results.
          </div>
        </div>

        <div className="feature-stat-card">
          <div className="stat-icon-wrap" style={{ background: '#e0f2fe', color: '#0369a1' }}>
            <Users size={22} />
          </div>
          <div className="stat-big-val">50+</div>
          <div className="stat-card-heading">Tech Domains</div>
          <div className="stat-card-desc">
            Comprehensive coverage across Full-Stack, Backend, Frontend, Cloud, Systems, and AI roles.
          </div>
        </div>

        <div className="feature-stat-card">
          <div className="stat-icon-wrap" style={{ background: '#fef3c7', color: '#b45309' }}>
            <Lock size={22} />
          </div>
          <div className="stat-big-val" style={{ fontSize: '1.65rem' }}>Enterprise</div>
          <div className="stat-card-heading">Grade Security</div>
          <div className="stat-card-desc">
            Your data is protected with HTTP-only cookies, bcrypt security, and complete resume privacy.
          </div>
        </div>
      </section>

      {/* ==========================================================================
          UNIVERSAL ROLE FIT SIMULATOR & ATS TELEMETRY (Content Agnostic)
          ========================================================================== */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Left Telemetry Card */}
        <div className="card card-hud-border" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
              ATS COMPLIANCE &amp; SPEED
            </span>
            <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
              ● 99.4% Parsing Pass
            </span>
          </div>

          <div style={{ fontSize: '2.6rem', fontWeight: '900', letterSpacing: '-0.03em', color: '#0f172a' }}>
            &lt; 1.2s
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
            Deterministic PyMuPDF text &amp; JSON normalization with zero OCR timeouts.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <CheckCircle2 size={16} color="#0ea5e9" />
              <span>Strict Pydantic JSON schema validation</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <CheckCircle2 size={16} color="#8b5cf6" />
              <span>Zero fabricated work experiences or hallucinated skills</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <CheckCircle2 size={16} color="#10b981" />
              <span>Instant comparison against target job descriptions</span>
            </div>
          </div>
        </div>

        {/* Right Universal Match Simulator Card */}
        <div className="card card-hud-border" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
              UNIVERSAL DOMAIN MATCH SIMULATOR
            </span>
            <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>Interactive</span>
          </div>

          {/* Domain Selector Tabs */}
          <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {PREVIEW_ROLES.map((item, idx) => (
              <button
                key={item.domain}
                onClick={() => setSelectedRoleIdx(idx)}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  background: selectedRoleIdx === idx ? '#e0f2fe' : '#f1f5f9',
                  border: selectedRoleIdx === idx ? '1px solid #7dd3fc' : '1px solid transparent',
                  color: selectedRoleIdx === idx ? '#0284c7' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {item.domain}
              </button>
            ))}
          </div>

          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px', marginBottom: '1rem', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Target Role</div>
            <div style={{ fontWeight: '800', fontSize: '1rem', color: '#0f172a', marginTop: '0.2rem' }}>{activeRole.role}</div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.65rem' }}>
              {activeRole.skills.map((s) => (
                <span key={s} className="badge badge-success" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderTop: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: '600' }}>PREDICTED FIT</span>
            <span style={{ fontSize: '1.85rem', fontWeight: '900', color: '#0284c7' }}>{activeRole.score}%</span>
          </div>

          <Link to="/match" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}>
            <span>Test My Real Resume</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ==========================================================================
          4-STAGE PIPELINE RIBBON
          ========================================================================== */}
      <section style={{ borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '2.5rem 1rem', background: '#f8fafc', borderRadius: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem', fontSize: '0.75rem' }}>
            <Activity size={13} /> Automated Career Pipeline Workflow
          </span>
          <h2 style={{ fontSize: '1.85rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#0f172a' }}>
            From Raw PDF to Real Technical Mastery
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', maxWidth: '1150px', margin: '0 auto' }}>
          {/* Step 1 */}
          <div className="card" style={{ padding: '1.25rem', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0ea5e9' }}>STAGE 01</span>
              <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>PyMuPDF</span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.35rem', color: '#0f172a' }}>PDF Extraction</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
              Lossless text parsing from PDF buffers without cloud OCR timeouts or corrupted text streams.
            </p>
          </div>

          {/* Step 2 */}
          <div className="card" style={{ padding: '1.25rem', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#8b5cf6' }}>STAGE 02</span>
              <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Pydantic V2</span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.35rem', color: '#0f172a' }}>Schema Validation</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
              Normalizes extracted skills, work history, and degrees into strict deterministic JSON schema.
            </p>
          </div>

          {/* Step 3 */}
          <div className="card" style={{ padding: '1.25rem', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0284c7' }}>STAGE 03</span>
              <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>Alias Engine</span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.35rem', color: '#0f172a' }}>Skill Gap Match</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
              Compares resume skills against target job description to compute real fit and missing gaps.
            </p>
          </div>

          {/* Step 4 */}
          <div className="card" style={{ padding: '1.25rem', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#ef4444' }}>STAGE 04</span>
              <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>15 MCQ Test</span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.35rem', color: '#0f172a' }}>Technical Practice</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
              15 high-impact questions testing tech stack internals with instant validation and explanations.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          PRODUCTION ENGINEERING ARCHITECTURE SHOWCASE (#features)
          ========================================================================== */}
      <section id="features" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', scrollMarginTop: '100px' }}>
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
          <span className="badge badge-success" style={{ marginBottom: '0.65rem', padding: '0.35rem 0.95rem' }}>
            <Zap size={14} /> Production Engineering Architecture
          </span>
          <h2 style={{ fontSize: '2.6rem', fontWeight: '900', letterSpacing: '-0.025em', lineHeight: '1.2', color: '#0f172a' }}>
            Engineered for Grounded Accuracy.<br />
            <span style={{ color: '#0ea5e9' }}>Zero Autonomous Hallucinations.</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.75rem', lineHeight: '1.6' }}>
            Unlike brittle multi-agent systems that loop indefinitely and invent fake candidate experience, 
            HireLens enforces deterministic microservice pipelines with strict schema validation.
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid-3">
          <motion.div whileHover={{ y: -4 }} className="card card-hud-border" style={{ borderLeft: '4px solid #0ea5e9' }}>
            <div style={{ background: '#e0f2fe', color: '#0284c7', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <FileCheck2 size={22} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: '800', textTransform: 'uppercase' }}>FAST EXTRACTION</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0.25rem 0 0.5rem 0', color: '#0f172a' }}>PyMuPDF ATS Parser</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5' }}>
              Extracts raw text directly from PDF bytes using PyMuPDF and normalizes candidate skills into strict JSON in under 1.2 seconds.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="card card-hud-border" style={{ borderLeft: '4px solid #8b5cf6' }}>
            <div style={{ background: '#f3e8ff', color: '#7c3aed', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Target size={22} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: '800', textTransform: 'uppercase' }}>DYNAMIC SCORING</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0.25rem 0 0.5rem 0', color: '#0f172a' }}>Real Match Engine</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5' }}>
              Computes genuine skill intersections between your uploaded resume and target job descriptions, eliminating hardcoded dummy metrics.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="card card-hud-border" style={{ borderLeft: '4px solid #ef4444' }}>
            <div style={{ background: '#fee2e2', color: '#dc2626', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Sparkles size={22} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: '800', textTransform: 'uppercase' }}>15 MCQ CHALLENGES</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0.25rem 0 0.5rem 0', color: '#0f172a' }}>Technical Mock Quiz</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5' }}>
              Practice 15 high-impact multiple-choice technical questions mapped directly to your resume skills with instant verification.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="card card-hud-border" style={{ borderLeft: '4px solid #0284c7' }}>
            <div style={{ background: '#e0f2fe', color: '#0284c7', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Terminal size={22} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: '800', textTransform: 'uppercase' }}>TYPE SAFE</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0.25rem 0 0.5rem 0', color: '#0f172a' }}>Pydantic V2 Schemas</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5' }}>
              Every LLM output is validated against strict Pydantic models before reaching the client, preventing malformed responses.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="card card-hud-border" style={{ borderLeft: '4px solid #f59e0b' }}>
            <div style={{ background: '#fef3c7', color: '#b45309', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Lock size={22} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: '800', textTransform: 'uppercase' }}>JWT &amp; RESEND</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0.25rem 0 0.5rem 0', color: '#0f172a' }}>Secure Auth Pipeline</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5' }}>
              HTTP-Only cookie session management with bcrypt hashing, temporary password email dispatch via Resend, and profile resets.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="card card-hud-border" style={{ borderLeft: '4px solid #8b5cf6' }}>
            <div style={{ background: '#f3e8ff', color: '#7c3aed', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Database size={22} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: '800', textTransform: 'uppercase' }}>VECTOR READY</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0.25rem 0 0.5rem 0', color: '#0f172a' }}>Qdrant Cloud DB</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5' }}>
              Configured for Qdrant Cloud cluster endpoints with vector embeddings and similarity thresholds for semantic candidate matching.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
          DEDICATED ABOUT PLATFORM SECTION
          ========================================================================== */}
      <section id="about" className="card" style={{ padding: '3rem 2rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.65rem' }}>
              <Compass size={14} /> Platform Architecture &amp; Rationale
            </span>
            <h2 style={{ fontSize: '2.3rem', fontWeight: '900', letterSpacing: '-0.02em', color: '#0f172a' }}>
              Why We Built HireLens
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.65', marginTop: '0.5rem' }}>
              Job hunting is notoriously broken: Candidates submit hundreds of resumes into automated ATS keyword screeners without knowing why they are rejected, while standard AI models invent fabricated job achievements. <strong>HireLens</strong> is a production portfolio platform designed to solve this directly.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.25rem', background: '#fee2e2', borderRadius: '12px', border: '1px solid #fca5a5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
                <AlertCircle size={16} color="#dc2626" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#dc2626', margin: 0 }}>
                  Legacy Screening Process
                </h3>
              </div>
              <p style={{ color: '#991b1b', fontSize: '0.85rem', lineHeight: '1.5' }}>
                Unfiltered generic prompts that invent metrics, hallucinate companies, and trigger immediate recruiter disqualification.
              </p>
            </div>

            <div style={{ padding: '1.25rem', background: '#e0f2fe', borderRadius: '12px', border: '1px solid #7dd3fc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
                <CheckCircle2 size={16} color="#0284c7" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0284c7', margin: 0 }}>
                  HireLens Verified Architecture
                </h3>
              </div>
              <p style={{ color: '#0369a1', fontSize: '0.85rem', lineHeight: '1.5' }}>
                Grounded extraction of verified skills, dynamic missing skill gap reports, and 15 adaptive technical interview questions.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Want to learn more about our microservices and zero-hallucination design?
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Link to="/about" className="btn btn-glass" style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}>
                <span>Read Full Architecture</span>
                <ArrowRight size={14} />
              </Link>
              <Link to={isAuthenticated ? "/dashboard" : "/register"} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}>
                <span>Launch Workspace</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          ENTERPRISE CTA BANNER
          ========================================================================== */}
      <section 
        style={{ 
          padding: '3.25rem 2.5rem', 
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #faf5ff 100%)', 
          borderRadius: '24px', 
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.08)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: 0, right: 0, width: '450px', height: '100%', background: 'radial-gradient(circle at 100% 50%, rgba(14, 165, 233, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <span className="badge badge-success" style={{ marginBottom: '0.85rem', padding: '0.35rem 0.95rem', fontSize: '0.75rem' }}>
              <Sparkles size={13} /> Production Ready Platform
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '900', letterSpacing: '-0.025em', lineHeight: '1.2', color: '#0f172a' }}>
              Take Control of Your <br />
              <span style={{ color: '#0ea5e9' }}>Technical Career Pipeline</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', marginTop: '0.85rem', maxWidth: '520px' }}>
              Extract verified skills from your resume, match against target job descriptions with zero hallucinations, and practice 15 adaptive interview questions tailored to your tech stack.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
              <Link to={isAuthenticated ? "/dashboard" : "/register"} className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: '700' }}>
                <span>{isAuthenticated ? "Open Dashboard" : "Start Evaluating Free"}</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/interview" className="btn btn-glass" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
                <span>Try 15 Qs Quiz</span>
              </Link>
            </div>
          </div>

          {/* Quick Start Workflow Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <div style={{ background: '#e0f2fe', color: '#0284c7', width: '34px', height: '34px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <FileCheck2 size={18} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' }}>1. Lossless PDF Resume Parsing</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>Extract verified skills directly from your uploaded PDF in under 1.2 seconds.</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <div style={{ background: '#f3e8ff', color: '#7c3aed', width: '34px', height: '34px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <Target size={18} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' }}>2. Real Job Match Engine</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>Identify exact skill intersections and missing gaps without invented data.</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <div style={{ background: '#fee2e2', color: '#dc2626', width: '34px', height: '34px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <Sparkles size={18} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' }}>3. 15-Question Technical Drills</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>Practice domain-specific questions with instant feedback tailored to your resume stack.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
