import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Sparkles, CheckCircle2, ArrowRight, Building, Code2, ListFilter } from 'lucide-react';

const SAMPLE_JOBS = [
  {
    role: 'Senior Full Stack Software Engineer',
    company: 'TechCorp Solutions',
    experienceRequired: '2-4 Years',
    requiredSkills: ['TypeScript', 'React.js', 'Node.js', 'PostgreSQL', 'REST APIs', 'Git', 'Docker'],
    preferredSkills: ['Next.js', 'Kubernetes', 'AWS', 'Redis', 'GraphQL'],
    responsibilities: [
      'Design, build, and maintain high-performance web applications and backend microservices.',
      'Develop scalable APIs and integrate relational and NoSQL databases.',
      'Collaborate with product designers and engineers to implement clean UI components.',
      'Optimize database queries, indexing, and API response latency.'
    ],
    jobDescription: `We are looking for a motivated Full Stack Software Engineer to join our core engineering team. 
You will be responsible for creating full-lifecycle features across frontend and backend systems. 
Experience with modern web architecture, databases, authentication, and RESTful APIs is required.`
  },
  {
    role: 'Backend Systems & Cloud Engineer',
    company: 'CloudScale Infrastructure',
    experienceRequired: '2-5 Years',
    requiredSkills: ['Python', 'Node.js', 'PostgreSQL', 'Docker', 'Redis', 'Microservices', 'REST APIs'],
    preferredSkills: ['Kubernetes', 'Go', 'Kafka', 'AWS', 'CI/CD'],
    responsibilities: [
      'Architect resilient backend services and high-throughput data processing pipelines.',
      'Implement distributed caching, rate-limiting, and microservice communication.',
      'Ensure 99.9% uptime, observability, and cloud infrastructure security.'
    ],
    jobDescription: `Looking for a Backend Systems Engineer to build robust services and distributed cloud infrastructure. 
You will design scalable database schemas, optimize concurrent workflows, and build resilient services.`
  },
  {
    role: 'AI / Machine Learning Engineer',
    company: 'Nexus AI Labs',
    experienceRequired: '1-4 Years',
    requiredSkills: ['Python', 'PyTorch', 'Vector Databases', 'RAG Pipelines', 'LLMs', 'SQL', 'FastAPI'],
    preferredSkills: ['LangChain', 'Docker', 'HuggingFace', 'Model Quantization'],
    responsibilities: [
      'Build and deploy deterministic RAG architectures and embedding search pipelines.',
      'Evaluate LLM generation quality and optimize prompt and inference latency.',
      'Integrate vector search indices with enterprise backend microservices.'
    ],
    jobDescription: `Seeking an AI / ML Engineer passionate about applying modern generative AI and retrieval-augmented systems. 
You will develop production inference pipelines, vector embeddings, and schema-validated agentic workflows.`
  }
];

const JobAnalysisPage = () => {
  const [selectedJob, setSelectedJob] = useState(() => {
    try {
      const saved = localStorage.getItem('activeTargetJob');
      return saved ? JSON.parse(saved) : SAMPLE_JOBS[0];
    } catch {
      return SAMPLE_JOBS[0];
    }
  });
  const [customRole, setCustomRole] = useState('');
  const [customCompany, setCustomCompany] = useState('');
  const [customJd, setCustomJd] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    try {
      localStorage.setItem('activeTargetJob', JSON.stringify(job));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  };

  const handleAnalyzeCustom = (e) => {
    e.preventDefault();
    if (!customRole || !customJd) return;

    setAnalyzing(true);
    setTimeout(() => {
      // Heuristic extraction for instant interactive preview
      const techList = ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'TypeScript', 'Python', 'Docker', 'AWS', 'SQL', 'Git'];
      const extractedReq = techList.filter(t => new RegExp(`\\b${t}\\b`, 'i').test(customJd));

      const analyzed = {
        role: customRole,
        company: customCompany || 'Target Employer',
        experienceRequired: '1-3 Years',
        requiredSkills: extractedReq.length > 0 ? extractedReq : ['JavaScript', 'React', 'Node.js', 'REST APIs'],
        preferredSkills: ['Docker', 'AWS', 'TypeScript'],
        responsibilities: [
          'Design and implement scalable backend and frontend features.',
          'Collaborate across cross-functional engineering teams.',
          'Ensure code quality through unit testing and peer code reviews.'
        ],
        jobDescription: customJd
      };

      setSelectedJob(analyzed);
      try {
        localStorage.setItem('activeTargetJob', JSON.stringify(analyzed));
      } catch (err) {
        console.warn('Storage error:', err);
      }
      setAnalyzing(false);
    }, 600);
  };

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
            <Briefcase className="text-emerald-400" size={32} />
            Job Description Analysis
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Parse target job requirements, extract essential skills, and prepare for precise resume matching.
          </p>
        </div>

        <Link to="/match" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Run Resume ↔ Job Match</span>
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Grid: Left = Input / Samples, Right = Analyzed Job Card */}
      <div className="grid-2">
        {/* Left Column: Sample Templates & Custom Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Quick Sample Selector */}
          <div className="card">
            <h2 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ListFilter size={18} className="text-indigo-400" /> Choose a Pre-configured Role Template
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Select a pre-analyzed target position or paste your own job description below:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {SAMPLE_JOBS.map((job, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectJob(job)}
                  style={{
                    padding: '0.85rem 1rem',
                    background: selectedJob.role === job.role ? '#e0f2fe' : '#ffffff',
                    border: selectedJob.role === job.role ? '2px solid #0ea5e9' : '1px solid #e2e8f0',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedJob.role === job.role ? '0 4px 15px rgba(14, 165, 233, 0.15)' : 'none'
                  }}
                >
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: selectedJob.role === job.role ? '#0284c7' : '#0f172a' }}>{job.role}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{job.company} • {job.experienceRequired}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom JD Input */}
          <div className="card">
            <h2 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} className="text-emerald-400" /> Analyze Custom Job Description
            </h2>

            <form onSubmit={handleAnalyzeCustom}>
              <div className="form-group">
                <label className="form-label">Job Title / Role</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Backend Node.js Developer"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company Name (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Google, Amazon, Startup"
                  value={customCompany}
                  onChange={(e) => setCustomCompany(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Paste Job Description</label>
                <textarea
                  className="form-input"
                  rows={4}
                  placeholder="Paste the full job requirements, skills, and responsibilities here..."
                  value={customJd}
                  onChange={(e) => setCustomJd(e.target.value)}
                  required
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.8rem' }}
                disabled={analyzing}
              >
                {analyzing ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="spinner"></span> Parsing Requirements...
                  </span>
                ) : (
                  'Analyze Job Description'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Analyzed Job Overview Card */}
        {selectedJob && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card" 
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: 'fit-content' }}
          >
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
                Active Target Position
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{selectedJob.role}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Building size={14} /> {selectedJob.company}
                </span>
                <span>•</span>
                <span>Experience: {selectedJob.experienceRequired}</span>
              </div>
            </div>

            {/* Required Skills */}
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Required Technical Skills ({selectedJob.requiredSkills.length})
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedJob.requiredSkills.map((s, idx) => (
                  <span key={idx} className="badge badge-success">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Preferred Skills */}
            {selectedJob.preferredSkills?.length > 0 && (
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Preferred / Nice-to-Have
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedJob.preferredSkills.map((s, idx) => (
                    <span key={idx} className="badge badge-primary">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Responsibilities */}
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Key Responsibilities
              </h3>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {selectedJob.responsibilities.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>

            {/* Action CTA */}
            <div style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <Link to="/match" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>
                Match My Resume Against This Job <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default JobAnalysisPage;
