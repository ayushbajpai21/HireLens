import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  uploadResumeFile, 
  fetchMyResumes, 
  fetchActiveResume, 
  setActiveResume as apiSetActive, 
  deleteResume as apiDeleteResume 
} from '../api/resume.js';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Star, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Sparkles, 
  ArrowRight,
  User,
  Mail,
  Phone,
  RefreshCw
} from 'lucide-react';

const ResumeUploadPage = () => {
  const { token } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [activeResume, setActiveResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);

  // Load resumes on mount
  useEffect(() => {
    loadResumes();
  }, [token]);

  const loadResumes = async () => {
    try {
      setLoading(true);
      const res = await fetchMyResumes(token);
      if (res.success) {
        setResumes(res.resumes || []);
        // Find default or select first
        const currentActive = res.resumes.find(r => r.isDefault) || res.resumes[0];
        if (currentActive) {
          const detailRes = await fetchActiveResume(token);
          setActiveResume(detailRes.resume || currentActive);
        } else {
          setActiveResume(null);
        }
      }
    } catch (err) {
      console.error('Failed to load resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    setErrorMessage('');
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage('Please upload a PDF file only.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 5 MB limit.');
      return;
    }
    setSelectedFile(file);
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      setErrorMessage('');
      setSuccessMessage('');

      const res = await uploadResumeFile(selectedFile, token);
      if (res.success) {
        setSuccessMessage('Resume parsed and structured successfully!');
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        await loadResumes();
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error uploading resume.');
    } finally {
      setUploading(false);
    }
  };

  const handleSelectActive = async (id) => {
    try {
      await apiSetActive(id, token);
      await loadResumes();
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      await apiDeleteResume(id, token);
      await loadResumes();
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.35 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <FileText className="text-indigo-400" size={32} />
            Resume Ingestion & Analysis
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Upload your PDF resume to extract verified skills, career milestones, and project architecture.
          </p>
        </div>

        {activeResume && (
          <Link to="/match" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Compare with Target Job</span>
            <ArrowRight size={18} />
          </Link>
        )}
      </div>

      {/* Notifications */}
      {errorMessage && (
        <div className="alert alert-danger">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success">
          <CheckCircle2 size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Top Section: Upload Area + Resumes List Drawer */}
      <div className="grid-2">
        {/* Upload Dropzone */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UploadCloud size={20} className="text-indigo-400" /> Upload New Resume
          </h2>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: dragActive ? '2px dashed #818cf8' : '2px dashed rgba(255, 255, 255, 0.15)',
              background: dragActive ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.02)',
              borderRadius: '12px',
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />

            <motion.div 
              whileHover={{ scale: 1.08 }} 
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(99, 102, 241, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#818cf8'
              }}
            >
              <UploadCloud size={30} />
            </motion.div>

            <div>
              <p style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--text-primary)' }}>
                {selectedFile ? selectedFile.name : 'Click to browse or drag & drop PDF'}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : 'Maximum file size: 5 MB'}
              </p>
            </div>
          </div>

          {selectedFile && (
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleUploadSubmit}
              disabled={uploading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              {uploading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="spinner"></span> Parsing PDF with ATS Engine...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={18} /> Parse & Analyze Resume
                </span>
              )}
            </motion.button>
          )}
        </div>

        {/* Uploaded Resumes Library */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} className="text-emerald-400" /> Resume Library ({resumes.length})
            </h2>
            <button 
              onClick={loadResumes} 
              className="btn btn-secondary" 
              style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
              title="Refresh"
            >
              <RefreshCw size={13} />
            </button>
          </div>

          {resumes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-secondary)' }}>
              <FileText size={36} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
              <p style={{ fontSize: '0.9rem' }}>No resumes uploaded yet.</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Upload your first PDF to begin.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '280px', overflowY: 'auto' }}>
              {resumes.map((r) => {
                const isActive = activeResume?._id === r._id;
                return (
                  <motion.div
                    key={r._id}
                    whileHover={{ scale: 1.01 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      background: isActive ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-color)',
                      borderRadius: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                      <FileText size={20} className={isActive ? 'text-indigo-400' : 'text-slate-400'} />
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontWeight: '600', fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                          {r.fileName}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {(r.fileSize / 1024).toFixed(0)} KB • {new Date(r.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {!isActive ? (
                        <button
                          onClick={() => handleSelectActive(r._id)}
                          className="btn btn-secondary"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                        >
                          Select
                        </button>
                      ) : (
                        <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                          <CheckCircle2 size={12} /> Active
                        </span>
                      )}

                      <button
                        onClick={() => handleDelete(r._id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#f87171',
                          cursor: 'pointer',
                          padding: '0.4rem',
                          borderRadius: '6px'
                        }}
                        title="Delete resume"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Real Extracted Data Viewer */}
      {activeResume && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Candidate Profile Header Card */}
          <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  <Sparkles size={14} /> Active Extracted Profile
                </div>
                <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: '#0f172a' }}>
                  {activeResume.structuredData?.name || 'Candidate Name'}
                </h2>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginTop: '0.65rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {activeResume.structuredData?.email && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Mail size={15} /> {activeResume.structuredData.email}
                    </span>
                  )}
                  {activeResume.structuredData?.phone && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Phone size={15} /> {activeResume.structuredData.phone}
                    </span>
                  )}
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileText size={15} /> {activeResume.fileName}
                  </span>
                </div>
              </div>

              <span className="badge badge-success" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                <CheckCircle2 size={14} /> Verified Text Extraction
              </span>
            </div>

            {activeResume.structuredData?.summary && (
              <div style={{ marginTop: '1.25rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #0ea5e9', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#334155', fontSize: '0.925rem', lineHeight: '1.5' }}>
                  {activeResume.structuredData.summary}
                </p>
              </div>
            )}
          </div>

          {/* Technical Skills Extracted */}
          <div className="card">
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Code2 size={20} className="text-indigo-400" /> Extracted Technical Skills ({activeResume.skills?.length || 0})
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {(activeResume.skills || []).map((skill, idx) => (
                <motion.span 
                  key={idx} 
                  whileHover={{ scale: 1.05 }}
                  className="badge badge-primary" 
                  style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          {activeResume.structuredData?.experience?.length > 0 && (
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase size={20} className="text-amber-400" /> Work Experience ({activeResume.structuredData.experience.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {activeResume.structuredData.experience.map((exp, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      padding: '1rem', 
                      background: 'rgba(255, 255, 255, 0.02)', 
                      borderRadius: '10px', 
                      border: '1px solid var(--border-color)' 
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                          {exp.role || 'Software Engineer'}
                        </div>
                        <div style={{ color: '#818cf8', fontWeight: '600', fontSize: '0.9rem' }}>
                          {exp.company}
                        </div>
                      </div>
                      <span className="badge badge-secondary" style={{ fontSize: '0.8rem' }}>
                        {exp.duration || 'Duration'}
                      </span>
                    </div>

                    {exp.highlights?.length > 0 && (
                      <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects & Education Grid */}
          <div className="grid-2">
            {/* Projects */}
            {activeResume.structuredData?.projects?.length > 0 && (
              <div className="card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Code2 size={20} className="text-sky-400" /> Highlighted Projects
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {activeResume.structuredData.projects.map((proj, idx) => (
                    <div key={idx} style={{ padding: '0.85rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{proj.title}</div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                        {proj.description}
                      </p>
                      {proj.technologies?.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem' }}>
                          {proj.technologies.map((t, tIdx) => (
                            <span key={tIdx} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', borderRadius: '4px' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {activeResume.structuredData?.education?.length > 0 && (
              <div className="card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <GraduationCap size={20} className="text-purple-400" /> Education
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {activeResume.structuredData.education.map((edu, idx) => (
                    <div key={idx} style={{ padding: '0.85rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{edu.degree}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                        {edu.institution}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                        {edu.year}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResumeUploadPage;
