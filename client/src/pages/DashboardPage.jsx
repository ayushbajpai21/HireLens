import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchActiveResume } from '../api/resume.js';
import { 
  FileText, 
  Briefcase, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
  UploadCloud,
  Code2,
  Check,
  Zap,
  HelpCircle
} from 'lucide-react';

const DashboardPage = () => {
  const { user, token } = useAuth();
  const [activeResume, setActiveResume] = useState(null);
  const [targetJob, setTargetJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read active target job from storage if set
    try {
      const savedJob = localStorage.getItem('activeTargetJob');
      if (savedJob) {
        setTargetJob(JSON.parse(savedJob));
      }
    } catch (e) {
      console.warn('Error reading target job:', e);
    }

    const loadResume = async () => {
      try {
        const res = await fetchActiveResume(token);
        if (res.success && res.resume) {
          setActiveResume(res.resume);
        }
      } catch (e) {
        console.warn('Dashboard load resume note:', e.message);
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [token]);

  // Skill normalization helper
  const normalize = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  // Calculate real match score if both resume and target job exist
  let realMatchScore = null;
  let missingSkills = [];
  if (activeResume?.skills && targetJob?.requiredSkills) {
    const candSkills = activeResume.skills;
    const reqSkills = targetJob.requiredSkills;
    const matched = reqSkills.filter(req => 
      candSkills.some(cand => {
        const nc = normalize(cand);
        const nr = normalize(req);
        return nc.includes(nr) || nr.includes(nc);
      })
    );
    missingSkills = reqSkills.filter(req => !matched.includes(req));
    realMatchScore = Math.round((matched.length / reqSkills.length) * 100);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show" 
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      {/* Header Greeting */}
      <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#0f172a' }}>
            Welcome back, <span style={{ color: '#0ea5e9' }}>{user?.name || 'Candidate'}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {activeResume 
              ? 'Your active resume is synchronized. Review real telemetry and next actions below.'
              : 'Welcome to your career workspace. Upload your resume to begin analyzing your profile.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/resume" className="btn btn-secondary">
            <FileText size={16} /> Manage Resume
          </Link>
          <Link to="/interview" className="btn btn-primary">
            <Sparkles size={16} /> Practice 15 Questions
          </Link>
        </div>
      </motion.div>

      {/* ZERO-STATE ONBOARDING BANNER (Shown when no resume is uploaded yet) */}
      {!activeResume && !loading && (
        <motion.div 
          variants={itemVariants}
          className="card"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
            border: '1px solid #e2e8f0',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge badge-warning" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
              Action Required
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Step 1 of 4: Setup Candidate Profile</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ maxWidth: '680px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
                Upload Your Resume to Unlock HireLens AI Telemetry
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: '1.6' }}>
                All match scores, skill gap analytics, and customized interview preparation are generated directly from your real resume. Upload your PDF now to extract verified technical skills.
              </p>
            </div>

            <Link to="/resume" className="btn btn-primary" style={{ padding: '0.85rem 1.85rem', fontSize: '0.95rem' }}>
              <UploadCloud size={18} />
              <span>Upload Resume (PDF)</span>
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Extracts verified skills & project history</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Computes exact resume ↔ job alignment</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Zero invented experience or fake metrics</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Primary KPI Metrics (Pure Real Data, No Hardcoded Dummies) */}
      <motion.div variants={itemVariants} className="grid-4">
        {/* Resume Status Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>RESUME STATUS</span>
            <FileText size={18} className="text-indigo-400" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            {activeResume ? (
              <span className="badge badge-success">
                <CheckCircle2 size={13} /> Active & Parsed
              </span>
            ) : (
              <span className="badge badge-warning">
                <UploadCloud size={13} /> Not Uploaded
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {activeResume ? activeResume.fileName : 'Awaiting PDF upload'}
          </p>
        </div>

        {/* Latest Job Match Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>JOB MATCH SCORE</span>
            <Target size={18} className="text-emerald-400" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: '800', color: realMatchScore !== null ? (realMatchScore >= 70 ? '#34d399' : '#fbbf24') : 'var(--text-dim)' }}>
            {realMatchScore !== null ? `${realMatchScore}%` : '--'}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {targetJob ? `Role: ${targetJob.role}` : 'Configure target in Job Analyzer'}
          </p>
        </div>

        {/* Technical Verified Skills Count */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>VERIFIED SKILLS</span>
            <Code2 size={18} className="text-cyan-400" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: '800', color: activeResume ? '#38bdf8' : 'var(--text-dim)' }}>
            {activeResume?.skills?.length || 0}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {activeResume ? 'Extracted from resume' : 'Upload resume to extract'}
          </p>
        </div>

        {/* Practice Interview Status */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>MOCK INTERVIEW</span>
            <Award size={18} className="text-amber-400" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: '800', color: '#fbbf24' }}>
            15 Qs
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Technical Practice Simulator
          </p>
        </div>
      </motion.div>

      {/* Skills Matrix & Action Items */}
      <motion.div variants={itemVariants} className="grid-2">
        {/* Left: Verified Skills & Skill Gaps */}
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Code2 size={20} className="text-indigo-400" /> Verified Technical Skills
          </h2>

          {activeResume && activeResume.skills && activeResume.skills.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={14} /> Extracted from {activeResume.fileName} ({activeResume.skills.length} skills)
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.65rem' }}>
                  {activeResume.skills.map((skill) => (
                    <span key={skill} className="badge badge-success">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {missingSkills.length > 0 && (
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Target size={14} /> Target Job Skill Gaps ({missingSkills.length})
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.65rem' }}>
                    {missingSkills.map((skill) => (
                      <span key={skill} className="badge badge-danger">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ padding: '2.5rem 1.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', textAlign: 'center' }}>
              <FileText size={36} className="text-slate-400" style={{ margin: '0 auto 0.75rem auto', opacity: 0.5 }} />
              <p style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '1rem' }}>No Active Resume Loaded</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', maxWidth: '400px', margin: '0.25rem auto 1.25rem auto' }}>
                Upload your resume in PDF format to automatically extract verified technical skills with zero invented data.
              </p>
              <Link to="/resume" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}>
                <UploadCloud size={16} /> Upload Resume PDF
              </Link>
            </div>
          )}
        </div>

        {/* Right: Guided Workflow Cards */}
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.25rem' }}>
            Recommended Preparation Pipeline
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/resume" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>1. Upload & Manage Resumes</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Inspect extracted experience, education, and ATS data</div>
              </div>
              <ArrowRight size={18} className="text-indigo-400" />
            </Link>

            <Link to="/jobs" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>2. Analyze Target Job Description</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Select a role template or paste customized employer job requirements</div>
              </div>
              <ArrowRight size={18} className="text-emerald-400" />
            </Link>

            <Link to="/match" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>3. Resume ↔ Job Match Engine</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Compare candidate skills against target role and detect skill gaps</div>
              </div>
              <ArrowRight size={18} className="text-amber-400" />
            </Link>

            <Link to="/interview" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>4. Practice 15 Technical Questions</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Interactive assessment questions tailored to your skills, architecture, and systems</div>
              </div>
              <ArrowRight size={18} className="text-purple-400" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
