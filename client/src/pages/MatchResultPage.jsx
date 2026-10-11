import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchActiveResume } from '../api/resume.js';
import { 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  Briefcase, 
  Sparkles, 
  TrendingUp, 
  Award,
  Layers,
  UploadCloud,
  Check,
  AlertTriangle
} from 'lucide-react';

const DEFAULT_TARGET_JOB = {
  role: 'Senior Full Stack Software Engineer',
  company: 'TechCorp Solutions',
  experienceRequired: '2-4 Years',
  requiredSkills: ['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'JavaScript (ES6+)', 'REST APIs', 'Git', 'Docker', 'System Design']
};

const MatchResultPage = () => {
  const { token } = useAuth();
  const [activeResume, setActiveResume] = useState(null);
  const [targetJob, setTargetJob] = useState(DEFAULT_TARGET_JOB);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load target job from localStorage if set in JobAnalysisPage
    try {
      const savedJob = localStorage.getItem('activeTargetJob');
      if (savedJob) {
        setTargetJob(JSON.parse(savedJob));
      }
    } catch (e) {
      console.warn('Error reading activeTargetJob from storage:', e);
    }

    // Load active resume from API
    const loadResume = async () => {
      try {
        const res = await fetchActiveResume(token);
        if (res.success && res.resume) {
          setActiveResume(res.resume);
        }
      } catch (err) {
        console.warn('Error fetching active resume:', err.message);
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [token]);

  // Skill normalization helper
  const normalize = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  const candidateSkills = activeResume?.skills || [];
  const requiredSkills = targetJob?.requiredSkills || [];

  // Realistic dynamic matching algorithm based on candidate's real parsed resume
  const matchedSkills = requiredSkills.filter(req => 
    candidateSkills.some(cand => {
      const normCand = normalize(cand);
      const normReq = normalize(req);
      return normCand.includes(normReq) || normReq.includes(normCand);
    })
  );

  const missingSkills = requiredSkills.filter(req => 
    !matchedSkills.includes(req)
  );

  const matchPercentage = requiredSkills.length > 0 
    ? Math.round((matchedSkills.length / requiredSkills.length) * 100) 
    : 0;

  // Dynamic projects alignment based on parsed resume projects
  const candidateProjects = activeResume?.structuredData?.projects || [];
  const projectsScore = candidateProjects.length >= 2 ? 90 : candidateProjects.length === 1 ? 75 : 45;

  // Dynamic experience alignment based on parsed resume experience
  const candidateExp = activeResume?.structuredData?.experience || [];
  const experienceScore = candidateExp.length >= 2 ? 85 : candidateExp.length === 1 ? 70 : 50;

  const candidateDisplayName = activeResume?.structuredData?.name || activeResume?.fileName;

  if (loading) {
    return (
      <div style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div className="spinner" style={{ margin: '0 auto 1rem auto' }}></div>
        <p style={{ color: 'var(--text-secondary)' }}>Comparing resume against job requirements...</p>
      </div>
    );
  }

  // ZERO-STATE: User has not uploaded any resume yet
  if (!activeResume) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.35 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
      >
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Target className="text-amber-400" size={32} />
            Resume ↔ Job Match Engine
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Dynamic skill gap comparison and ATS compatibility score.
          </p>
        </div>

        {/* Empty state card */}
        <div className="card" style={{ padding: '3.5rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', border: '1px dashed var(--border-color)' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#818cf8', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UploadCloud size={32} />
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              No Active Resume Uploaded Yet
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto', fontSize: '0.925rem', lineHeight: '1.5' }}>
              The Match Engine compares your verified candidate skills against target employer requirements. Please upload your resume in the <strong>Resume AI</strong> module to generate your personalized match score.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/resume" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
              <UploadCloud size={18} />
              <span>Upload Resume (PDF)</span>
            </Link>
            <Link to="/jobs" className="btn btn-secondary" style={{ padding: '0.85rem 1.75rem' }}>
              <Briefcase size={18} />
              <span>Configure Target Job</span>
            </Link>
          </div>

          {/* Target Job Preview Box */}
          <div style={{ marginTop: '1.5rem', width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Active Target Job Waiting for Resume:
            </div>
            <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>{targetJob.role}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
              {targetJob.company} • {requiredSkills.length} Required Skills
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {requiredSkills.map((s, idx) => (
                <span key={idx} className="badge badge-primary" style={{ fontSize: '0.75rem' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ACTIVE MATCH STATE: User has uploaded a real resume!
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.35 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Target className="text-amber-400" size={32} />
            Resume ↔ Job Match Engine
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Comparing verified skills from your uploaded resume against target role requirements.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/jobs" className="btn btn-secondary">
            <Briefcase size={16} /> Switch Target Job
          </Link>
          <Link to="/interview" className="btn btn-primary">
            <Sparkles size={16} /> Practice Interview
          </Link>
        </div>
      </div>

      {/* Comparison Entities Header */}
      <div className="grid-2">
        {/* Real Candidate Resume Card */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.85rem', borderRadius: '12px', color: '#818cf8' }}>
            <FileText size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>ACTIVE CANDIDATE RESUME</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>
              {candidateDisplayName}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {candidateSkills.length} Verified Extracted Skills
            </div>
          </div>
        </div>

        {/* Selected Target Job Card */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.85rem', borderRadius: '12px', color: '#34d399' }}>
            <Briefcase size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>TARGET JOB POSTING</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{targetJob.role}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {targetJob.company} • {requiredSkills.length} Required Skills
            </div>
          </div>
        </div>
      </div>

      {/* Main Scorecard Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
              Dynamic Match Score
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
              <motion.span 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                style={{ fontSize: '3.5rem', fontWeight: '900', color: matchPercentage >= 70 ? '#0284c7' : matchPercentage >= 40 ? '#f59e0b' : '#ef4444', letterSpacing: '-0.03em' }}
              >
                {matchPercentage}%
              </motion.span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: '600' }}>
                Overall Fit
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '500px', marginTop: '0.25rem' }}>
              {matchPercentage >= 70 
                ? 'Strong candidate alignment! Your verified resume matches the majority of required technologies.'
                : matchPercentage >= 40
                ? 'Moderate alignment. Addressing the missing skills will increase your interview shortlisting rate.'
                : 'Low skill overlap. Review the identified missing skills below or tailor your resume experience.'}
            </p>
          </div>

          {/* Breakdown Dynamic Meters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '260px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Technical Skills Match</span>
                <span style={{ fontWeight: '700', color: '#0f172a' }}>{matchPercentage}%</span>
              </div>
              <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${matchPercentage}%`, height: '100%', background: '#0ea5e9', borderRadius: '3px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Projects Alignment</span>
                <span style={{ fontWeight: '700', color: '#0f172a' }}>{projectsScore}%</span>
              </div>
              <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${projectsScore}%`, height: '100%', background: '#8b5cf6', borderRadius: '3px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Experience History</span>
                <span style={{ fontWeight: '700', color: '#0f172a' }}>{experienceScore}%</span>
              </div>
              <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${experienceScore}%`, height: '100%', background: '#ef4444', borderRadius: '3px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Matched vs Missing Skills Grid */}
      <div className="grid-2">
        {/* Matched Skills */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <CheckCircle2 size={20} className="text-emerald-400" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>
              Matched Skills ({matchedSkills.length})
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            These required technologies are confirmed and present in your uploaded resume:
          </p>
          {matchedSkills.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {matchedSkills.map((s, idx) => (
                <span key={idx} className="badge badge-success" style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}>
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>None of the target skills matched your resume.</p>
          )}
        </div>

        {/* Missing Skills */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <AlertCircle size={20} className="text-red-400" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>
              Identified Skill Gaps ({missingSkills.length})
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Technologies requested in the job description that were not found in your resume:
          </p>
          {missingSkills.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {missingSkills.map((s, idx) => (
                <span key={idx} className="badge badge-danger" style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}>
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: '#16a34a', fontSize: '0.85rem', fontWeight: '600' }}>Excellent: No missing technical skills identified.</p>
          )}
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1rem' }}>
            Recommendation: Practice these topics in the <strong>Interview Prep</strong> simulator.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchResultPage;
