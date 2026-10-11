import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Terminal, 
  Lock, 
  ArrowRight, 
  Code2, 
  FileCheck2, 
  Target, 
  Compass,
  AlertCircle 
} from 'lucide-react';

const AboutPage = () => {
  const { isAuthenticated } = useAuth();

  const techStack = [
    {
      category: 'Frontend Client',
      badge: 'React 19 & Vite',
      color: '#0284c7',
      details: 'React 19, Vite HMR, Framer Motion for smooth physics, Three.js WebGL canvas for interactive 3D particle telemetry, Lucide icons, responsive CSS variables design system.'
    },
    {
      category: 'API Gateway & Auth',
      badge: 'Node.js & Express',
      color: '#0ea5e9',
      details: 'Node.js / Express microservice handling secure JWT session management via HTTP-Only cookies, bcrypt credential hashing, Multer file upload pipelines, and Resend transactional email.'
    },
    {
      category: 'Deterministic AI Engine',
      badge: 'Python & FastAPI',
      color: '#8b5cf6',
      details: 'Python FastAPI microservice utilizing PyMuPDF (Fitz) for lossless binary PDF text extraction, Pydantic V2 schema validation, and Groq Llama 3.3 high-throughput inference.'
    },
    {
      category: 'Data & Vector Tier',
      badge: 'MongoDB & Qdrant',
      color: '#ef4444',
      details: 'MongoDB with Mongoose schemas for persistent user telemetry, structured candidate profiles, and job specs. Qdrant Cloud Vector Database for semantic candidate embedding retrieval.'
    }
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      color: '#0ea5e9',
      title: 'Zero Autonomous Hallucinations',
      desc: 'Generic AI models frequently invent fake job titles, fabricated metrics, and false companies that get candidates blacklisted. HireLens enforces deterministic extraction and strict schema verification — only skills verified from your actual document are recorded.'
    },
    {
      icon: Cpu,
      color: '#8b5cf6',
      title: 'Deterministic Microservices',
      desc: 'Instead of unpredictable multi-agent loops that get stuck in execution cycles and rack up latency, HireLens uses dedicated REST microservices with single-pass validation and sub-second execution speeds.'
    },
    {
      icon: Target,
      color: '#0284c7',
      title: 'Mathematical Skill Intersection',
      desc: 'Our match engine runs canonical alias normalization across engineering skills, calculating actual matched coverage and pinpointing real missing gaps against employer requirements.'
    },
    {
      icon: Zap,
      color: '#ef4444',
      title: '15 High-Yield Technical Questions',
      desc: 'Direct, instant-feedback technical practice tailored specifically to the candidate’s active resume skills or chosen domains, with comprehensive architectural explanations.'
    }
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3.5rem', paddingBottom: '3rem' }}>
      
      {/* Hero Header */}
      <section style={{ textAlign: 'center', maxWidth: '850px', margin: '1rem auto 0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="badge badge-success"
          style={{
            padding: '0.4rem 1.1rem',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Compass size={14} />
          <span>Platform Architecture &amp; Engineering Rationale</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: '900',
            letterSpacing: '-0.03em',
            lineHeight: '1.15',
            color: '#0f172a'
          }}
        >
          Engineered for Accuracy. <br />
          <span style={{ 
            background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Built for Technical Careers.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.15rem',
            lineHeight: '1.65',
            marginTop: '1.25rem'
          }}
        >
          HireLens is a production-grade career intelligence platform that bridges candidate resumes with real employer job requirements — eliminating AI hallucinations, providing honest skill gap telemetry, and testing readiness with 15 adaptive technical questions.
        </motion.p>
      </section>

      {/* The Problem & Solution Breakdown */}
      <section className="card card-hud-border" style={{ padding: '2.5rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
        <h2 style={{ fontSize: '1.65rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '1.5rem', color: '#0f172a' }}>
          Why Generic Career Tools Fail Candidates
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
          <div style={{ padding: '1.5rem', background: '#fee2e2', borderRadius: '14px', border: '1px solid #fca5a5' }}>
            <div style={{ color: '#dc2626', fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={18} color="#dc2626" />
              <span>The Industry Status Quo</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#991b1b' }}>
              <li style={{ display: 'flex', gap: '0.5rem', lineHeight: '1.5' }}>
                <span style={{ color: '#dc2626' }}>•</span>
                <span><strong>Black-box ATS screeners:</strong> Reject valid PDF resumes due to minor styling or multi-column layout without actionable feedback.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', lineHeight: '1.5' }}>
                <span style={{ color: '#dc2626' }}>•</span>
                <span><strong>Unchecked AI Hallucinations:</strong> Standard LLM prompts invent unearned accomplishments, leading to candidate disqualification during interviews.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', lineHeight: '1.5' }}>
                <span style={{ color: '#dc2626' }}>•</span>
                <span><strong>Superficial Keyword Stuffing:</strong> Gives candidates false confidence with random 99% scores that don't match engineering expectations.</span>
              </li>
            </ul>
          </div>

          <div style={{ padding: '1.5rem', background: '#e0f2fe', borderRadius: '14px', border: '1px solid #7dd3fc' }}>
            <div style={{ color: '#0284c7', fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="#0284c7" />
              <span>The HireLens Architecture</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#0369a1' }}>
              <li style={{ display: 'flex', gap: '0.5rem', lineHeight: '1.5' }}>
                <CheckCircle2 size={16} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Lossless PyMuPDF Engine:</strong> Direct binary text extraction handles diverse PDF layouts reliably in under 1.2s.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', lineHeight: '1.5' }}>
                <CheckCircle2 size={16} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Pydantic Schema Validation:</strong> Every extracted entity is typed and verified before it reaches your dashboard.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', lineHeight: '1.5' }}>
                <CheckCircle2 size={16} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>15 Focused Interview Qs:</strong> Comprehensive testing tailored to your resume stack to verify real technical understanding.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem', fontSize: '0.75rem' }}>
            <Layers size={13} /> Engineering Standards
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#0f172a' }}>
            Core Platform Pillars
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="card card-hud-border"
                style={{ padding: '1.65rem', background: '#ffffff', border: '1px solid #e2e8f0' }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: `${item.color}15`,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <Icon size={22} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0f172a' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.55' }}>
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Production Technology Stack */}
      <section className="card card-hud-border" style={{ padding: '2.5rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
        <div style={{ marginBottom: '1.75rem' }}>
          <span className="badge badge-success" style={{ marginBottom: '0.5rem', fontSize: '0.75rem' }}>
            <Terminal size={13} /> Full-Stack Architecture
          </span>
          <h2 style={{ fontSize: '1.85rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#0f172a' }}>
            Production Microservices Architecture
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
            Built using modern, decoupled microservices for high throughput, maintainability, and clean separation of concerns.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
          {techStack.map((tech) => (
            <div
              key={tech.category}
              style={{
                padding: '1.35rem',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>
                  {tech.category}
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    color: tech.color,
                    background: `${tech.color}15`,
                    padding: '0.15rem 0.5rem',
                    borderRadius: '9999px',
                    border: `1px solid ${tech.color}35`
                  }}
                >
                  {tech.badge}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', lineHeight: '1.5' }}>
                {tech.details}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section
        style={{
          padding: '2.5rem',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #faf5ff 100%)',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' }}>
            Ready to Analyze Your Real Resume?
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Upload your PDF and get instant deterministic skill analysis in under 2 seconds.
          </p>
        </div>

        <Link
          to={isAuthenticated ? "/dashboard" : "/register"}
          className="btn btn-primary"
          style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}
        >
          <span>{isAuthenticated ? "Launch Dashboard" : "Get Started Free"}</span>
          <ArrowRight size={16} />
        </Link>
      </section>

    </div>
  );
};

export default AboutPage;
