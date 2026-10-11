import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchActiveResume, fetchMyResumes, setActiveResume } from '../api/resume.js';
import { 
  TRACKS, 
  QUESTIONS_BY_TRACK, 
  getTrackForSkill, 
  getSkillIcon 
} from '../data/interviewQuestions.js';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Award, 
  HelpCircle, 
  ArrowRight, 
  Brain, 
  Layers, 
  Code2, 
  Check, 
  RotateCcw, 
  Compass, 
  Cpu, 
  ChevronRight, 
  Filter,
  FileText,
  AlertCircle
} from 'lucide-react';

const InterviewSetupPage = () => {
  const { token } = useAuth();
  const [userResumes, setUserResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [activeResume, setActiveResumeState] = useState(null);
  const [resumeSkills, setResumeSkills] = useState([]);
  const [loadingResume, setLoadingResume] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [viewMode, setViewMode] = useState('resume'); // 'resume' or 'all'
  const [switchNotice, setSwitchNotice] = useState('');

  const [selectedTrackId, setSelectedTrackId] = useState('mern');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({}); // { [questionId]: { selected, isCorrect } }
  const [isCompleted, setIsCompleted] = useState(false);

  // Load all user resumes + active candidate resume
  useEffect(() => {
    const loadResumeData = async () => {
      try {
        setLoadingResume(true);
        const [activeRes, allRes] = await Promise.allSettled([
          fetchActiveResume(token),
          fetchMyResumes(token)
        ]);

        let loadedResumes = [];
        if (allRes.status === 'fulfilled' && allRes.value?.resumes) {
          loadedResumes = allRes.value.resumes;
          setUserResumes(loadedResumes);
        }

        let currentActive = null;
        if (activeRes.status === 'fulfilled' && activeRes.value?.success && activeRes.value?.resume) {
          currentActive = activeRes.value.resume;
        } else if (loadedResumes.length > 0) {
          currentActive = loadedResumes[0];
        }

        if (currentActive) {
          setActiveResumeState(currentActive);
          setSelectedResumeId(currentActive._id);
          const rawSkills = currentActive.skills || currentActive.structuredData?.skills || [];
          const unique = Array.from(new Set(rawSkills.map((s) => s && s.trim()))).filter(Boolean);
          setResumeSkills(unique);
          if (unique.length > 0) {
            const firstSkill = unique[0];
            setSelectedSkill(firstSkill);
            setSelectedTrackId(getTrackForSkill(firstSkill));
            setViewMode('resume');
          } else {
            setViewMode('all');
          }
        } else {
          setViewMode('all');
        }
      } catch (e) {
        console.warn('InterviewSetupPage: Error loading resumes', e);
        setViewMode('all');
      } finally {
        setLoadingResume(false);
      }
    };
    loadResumeData();
  }, [token]);

  // Handler for switching selected resume & resetting question progress
  const handleSwitchResume = async (newResumeId) => {
    if (!newResumeId || newResumeId === selectedResumeId) return;

    const chosenResume = userResumes.find(r => r._id === newResumeId);
    if (!chosenResume) return;

    setSelectedResumeId(newResumeId);
    setActiveResumeState(chosenResume);

    // Call backend to persist active resume choice
    try {
      await setActiveResume(newResumeId, token);
    } catch (err) {
      console.warn('Backend active resume update:', err);
    }

    // Extract verified skills from newly selected resume
    const rawSkills = chosenResume.skills || chosenResume.structuredData?.skills || [];
    const unique = Array.from(new Set(rawSkills.map((s) => s && s.trim()))).filter(Boolean);
    setResumeSkills(unique);

    if (unique.length > 0) {
      const firstSkill = unique[0];
      setSelectedSkill(firstSkill);
      setSelectedTrackId(getTrackForSkill(firstSkill));
      setViewMode('resume');
    } else {
      setSelectedSkill(null);
      setViewMode('all');
    }

    // CRUCIAL: RESET PRACTICE PROGRESS WHEN NEW RESUME IS SELECTED
    setCurrentIdx(0);
    setSelectedOption(null);
    setSubmitted(false);
    setAnswers({});
    setIsCompleted(false);

    setSwitchNotice(`Domains loaded from ${chosenResume.filename}. Practice progress reset to Question 1.`);
    setTimeout(() => setSwitchNotice(''), 4500);
  };

  const activeTrack = TRACKS.find(t => t.id === selectedTrackId) || TRACKS[0];
  const questionsList = QUESTIONS_BY_TRACK[selectedTrackId] || QUESTIONS_BY_TRACK.mern;
  const currentQ = questionsList[currentIdx] || questionsList[0];
  const totalQuestions = questionsList.length;

  // Calculate current score and completed questions progress
  const correctCount = Object.values(answers).filter(a => a.isCorrect).length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectResumeSkill = (skill) => {
    if (skill === selectedSkill) return;
    setSelectedSkill(skill);
    setSelectedTrackId(getTrackForSkill(skill));
    setCurrentIdx(0);
    setSelectedOption(null);
    setSubmitted(false);
    setAnswers({});
    setIsCompleted(false);
  };

  const handleSwitchTrack = (trackId) => {
    if (trackId === selectedTrackId && !selectedSkill) return;
    setSelectedTrackId(trackId);
    setSelectedSkill(null);
    setCurrentIdx(0);
    setSelectedOption(null);
    setSubmitted(false);
    setAnswers({});
    setIsCompleted(false);
  };

  const handleSelectOption = (optionId) => {
    if (submitted) return; // Locked once confirmed
    setSelectedOption(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || submitted) return;

    const isCorrect = selectedOption === currentQ.correct;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        selected: selectedOption,
        isCorrect
      }
    }));
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      const nextQ = questionsList[nextIdx];
      // Restore answer state if previously answered
      if (answers[nextQ.id]) {
        setSelectedOption(answers[nextQ.id].selected);
        setSubmitted(true);
      } else {
        setSelectedOption(null);
        setSubmitted(false);
      }
    } else {
      setIsCompleted(true);
    }
  };

  const handleJumpToQuestion = (idx) => {
    setCurrentIdx(idx);
    const targetQ = questionsList[idx];
    if (answers[targetQ.id]) {
      setSelectedOption(answers[targetQ.id].selected);
      setSubmitted(true);
    } else {
      setSelectedOption(null);
      setSubmitted(false);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setSubmitted(false);
    setAnswers({});
    setIsCompleted(false);
  };

  const finalPercentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.35 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
    >
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#0f172a' }}>
            <Sparkles size={32} color="#0ea5e9" />
            HireLens Interview Simulator
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Select your interview technology domain below to practice 15 adaptive technical questions with instant validation.
          </p>
        </div>

        {/* Live Score Counter Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
            <Award size={18} color="#0ea5e9" />
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>
              Score: <span style={{ color: '#0284c7' }}>{correctCount}</span> / {answeredCount}
            </div>
          </div>
          <button 
            onClick={handleRestart}
            className="btn btn-red"
            style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            title="Restart current domain quiz"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* CANDIDATE RESUME SELECTOR BAR */}
      <div 
        className="card" 
        style={{ 
          padding: '1.15rem 1.5rem', 
          background: '#ffffff', 
          border: '1px solid #e2e8f0', 
          borderRadius: '16px',
          boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #e0f2fe 0%, #f3e8ff 100%)',
            border: '1px solid #7dd3fc',
            color: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.04em' }}>
              Selected Candidate Resume:
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{activeResume?.filename || 'No Resume Selected'}</span>
              {resumeSkills.length > 0 && (
                <span className="badge badge-success" style={{ fontSize: '0.675rem', padding: '0.1rem 0.45rem' }}>
                  {resumeSkills.length} Skills Detected
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Dropdown Selector when multiple resumes exist */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {userResumes.length > 1 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label htmlFor="resume-select" style={{ fontSize: '0.825rem', fontWeight: '700', color: '#475569' }}>
                Switch Resume:
              </label>
              <select
                id="resume-select"
                value={selectedResumeId}
                onChange={(e) => handleSwitchResume(e.target.value)}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#0f172a',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  outline: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}
              >
                {userResumes.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.filename} ({r.skills?.length || 0} skills)
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <Link 
              to="/resume" 
              className="btn btn-glass" 
              style={{ fontSize: '0.825rem', padding: '0.45rem 0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <FileText size={14} />
              <span>{userResumes.length === 0 ? 'Upload Resume PDF' : 'Manage Resumes'}</span>
            </Link>
          )}
        </div>
      </div>

      {/* Switch Notification Toast */}
      {switchNotice && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="alert alert-success"
          style={{ marginBottom: 0 }}
        >
          <CheckCircle2 size={16} />
          <span>{switchNotice}</span>
        </motion.div>
      )}

      {/* DOMAIN / TECHNOLOGY TRACK SELECTOR RIBBON */}
      <div className="card" style={{ padding: '1.35rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <Filter size={16} color="#0ea5e9" />
            <span style={{ fontSize: '0.875rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#0f172a' }}>
              {viewMode === 'resume' && resumeSkills.length > 0
                ? 'Resume Verified Skill Domains:'
                : 'Choose Interview Domain / Tech Stack:'}
            </span>
            {resumeSkills.length > 0 && (
              <span className="badge badge-success" style={{ fontSize: '0.7rem', padding: '0.15rem 0.55rem' }}>
                {resumeSkills.length} Verified Skills From {activeResume?.filename || 'Resume'}
              </span>
            )}
          </div>

          {/* Toggle Between Resume Skills and All Tracks */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {resumeSkills.length > 0 ? (
              <div style={{ display: 'flex', gap: '0.35rem', background: '#f1f5f9', padding: '0.2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <button
                  type="button"
                  onClick={() => setViewMode('resume')}
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    background: viewMode === 'resume' ? '#ffffff' : 'transparent',
                    border: viewMode === 'resume' ? '1px solid #cbd5e1' : '1px solid transparent',
                    color: viewMode === 'resume' ? '#0284c7' : 'var(--text-secondary)',
                    boxShadow: viewMode === 'resume' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  My Resume Skills ({resumeSkills.length})
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('all')}
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    background: viewMode === 'all' ? '#ffffff' : 'transparent',
                    border: viewMode === 'all' ? '1px solid #cbd5e1' : '1px solid transparent',
                    color: viewMode === 'all' ? '#8b5cf6' : 'var(--text-secondary)',
                    boxShadow: viewMode === 'all' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  All Tech Tracks ({TRACKS.length})
                </button>
              </div>
            ) : (
              <Link to="/resume" className="badge badge-warning" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <FileText size={12} />
                <span>Upload Resume to Auto-Extract Skills</span>
                <ArrowRight size={12} />
              </Link>
            )}
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              15 Questions • Instant Feedback
            </span>
          </div>
        </div>

        {/* View Mode: Dynamic Resume Skills */}
        {viewMode === 'resume' && resumeSkills.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '0.65rem' }}>
            {resumeSkills.map((skill) => {
              const isSelected = selectedSkill === skill;
              const icon = getSkillIcon(skill);
              return (
                <button
                  key={skill}
                  onClick={() => handleSelectResumeSkill(skill)}
                  style={{
                    padding: '0.75rem 0.85rem',
                    borderRadius: '10px',
                    background: isSelected ? '#e0f2fe' : '#ffffff',
                    border: isSelected ? '2px solid #0ea5e9' : '1px solid #e2e8f0',
                    color: isSelected ? '#0284c7' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 15px rgba(14, 165, 233, 0.2)' : 'none'
                  }}
                  className={!isSelected ? 'option-hover' : ''}
                >
                  <span style={{ fontSize: '1.25rem' }}>{icon}</span>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontWeight: '800', fontSize: '0.85rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {skill}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: isSelected ? '#0284c7' : 'var(--text-muted)' }}>
                      15 Questions • Practice
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* View Mode: All Standard Tracks */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.65rem' }}>
            {TRACKS.map((track) => {
              const isSelected = selectedTrackId === track.id && !selectedSkill;
              return (
                <button
                  key={track.id}
                  onClick={() => handleSwitchTrack(track.id)}
                  style={{
                    padding: '0.75rem 0.85rem',
                    borderRadius: '10px',
                    background: isSelected ? '#f3e8ff' : '#ffffff',
                    border: isSelected ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                    color: isSelected ? '#7c3aed' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 15px rgba(139, 92, 246, 0.2)' : 'none'
                  }}
                  className={!isSelected ? 'option-hover' : ''}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: isSelected ? '#ede9fe' : '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isSelected ? '#7c3aed' : '#0284c7', flexShrink: 0 }}>
                    <Code2 size={16} />
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontWeight: '800', fontSize: '0.85rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {track.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: isSelected ? '#7c3aed' : 'var(--text-muted)' }}>
                      15 Questions
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Progress Bar & Question Jump Nav */}
      <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
              {selectedSkill ? selectedSkill : activeTrack.name}
            </span>
            {selectedSkill && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                (Resume Skill from {activeResume?.filename || 'Document'})
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>
              Question {currentIdx + 1} of {totalQuestions}
            </span>
            <span 
              className={answeredCount > 0 ? "badge badge-primary" : "badge badge-neutral"} 
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', fontWeight: '800' }}
            >
              {progressPercent}% Solved ({answeredCount}/{totalQuestions})
            </span>
          </div>
        </div>

        {/* Progress Bar Track: Fills dynamically as questions are answered */}
        <div style={{ width: '100%', height: '7px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
          <motion.div 
            style={{ 
              height: '100%', 
              background: 'linear-gradient(90deg, #0ea5e9 0%, #8b5cf6 50%, #ef4444 100%)', 
              borderRadius: '9999px' 
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* 15 Question Quick Number Jump Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.25rem' }}>
          {questionsList.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isQCorrect = answers[q.id]?.isCorrect;
            const isCurrent = currentIdx === idx;

            let bgColor = '#f8fafc';
            let textColor = 'var(--text-secondary)';
            let borderStyle = '1px solid #e2e8f0';

            if (isCurrent) {
              borderStyle = '2px solid #0ea5e9';
              textColor = '#0284c7';
              bgColor = '#e0f2fe';
            }

            if (isAnswered) {
              if (isQCorrect) {
                bgColor = '#ecfdf5';
                textColor = '#059669';
                borderStyle = '1px solid #10b981';
              } else {
                bgColor = '#fee2e2';
                textColor = '#dc2626';
                borderStyle = '1px solid #ef4444';
              }
            }

            return (
              <button
                key={q.id}
                onClick={() => handleJumpToQuestion(idx)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: bgColor,
                  color: textColor,
                  border: borderStyle,
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content: Quiz Question or Completed Summary */}
      {!isCompleted ? (
        <div className="grid-2" style={{ alignItems: 'start' }}>
          {/* Left: Question & MCQ Options */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="badge badge-primary">{selectedSkill || currentQ.category}</span>
                <span className="badge badge-warning">{currentQ.difficulty}</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Q{currentIdx + 1} / {totalQuestions}
              </span>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', lineHeight: '1.45', color: '#0f172a' }}>
              {currentQ.question}
            </h2>

            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const isCorrect = opt.id === currentQ.correct;

                let optionStyle = {
                  padding: '1rem 1.15rem',
                  borderRadius: '12px',
                  cursor: submitted ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.2s ease',
                  color: '#1e293b'
                };

                // Styling logic when user selected or submitted
                if (!submitted) {
                  if (isSelected) {
                    optionStyle.background = '#f3e8ff';
                    optionStyle.border = '2px solid #8b5cf6';
                  }
                } else {
                  if (isCorrect) {
                    optionStyle.background = '#ecfdf5';
                    optionStyle.border = '2px solid #10b981';
                  } else if (isSelected && !isCorrect) {
                    optionStyle.background = '#fee2e2';
                    optionStyle.border = '2px solid #ef4444';
                  }
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    style={optionStyle}
                    className={!submitted ? 'option-hover' : ''}
                  >
                    {/* Option Letter Indicator */}
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '0.9rem',
                      flexShrink: 0,
                      background: isSelected ? '#8b5cf6' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)'
                    }}>
                      {submitted && isCorrect ? (
                        <Check size={18} color="#10b981" />
                      ) : (
                        opt.id
                      )}
                    </div>

                    {/* Option Text */}
                    <div style={{ fontSize: '0.925rem', color: isSelected && !submitted ? '#7c3aed' : submitted && isCorrect ? '#065f46' : submitted && isSelected && !isCorrect ? '#991b1b' : '#334155', lineHeight: '1.45', fontWeight: isSelected || (submitted && isCorrect) ? '600' : '400' }}>
                      {opt.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit & Next Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
              {!submitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem' }}
                  disabled={!selectedOption}
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <span>{currentIdx < totalQuestions - 1 ? 'Next Question' : 'View Complete Report'}</span>
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Right: Instant Feedback & Architectural Explanation */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a' }}>
              <Brain size={20} color="#0ea5e9" />
              Technical Feedback &amp; Analysis
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                {/* Result Status Banner */}
                {answers[currentQ.id]?.isCorrect ? (
                  <div style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    color: '#065f46',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem'
                  }}>
                    <CheckCircle2 size={20} />
                    <div>
                      <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>Correct Answer!</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                        Option {currentQ.correct} is accurate according to core specifications.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    background: '#fee2e2',
                    border: '1px solid #fca5a5',
                    color: '#991b1b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem'
                  }}>
                    <XCircle size={20} />
                    <div>
                      <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>Incorrect Selection</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                        Option {selectedOption} was chosen. The correct answer is <strong>Option {currentQ.correct}</strong>.
                      </div>
                    </div>
                  </div>
                )}

                {/* In-Depth Architectural Breakdown */}
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#0284c7', marginBottom: '0.5rem' }}>
                    Architectural Deep-Dive
                  </div>
                  <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: '1.65' }}>
                    {currentQ.explanation}
                  </p>
                </div>

                {/* Domain Tag */}
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569' }}>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Domain Competency Tested:
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#0f172a' }}>
                    {activeTrack.name} • {currentQ.category} ({currentQ.difficulty})
                  </div>
                </div>
              </motion.div>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-secondary)' }}>
                <HelpCircle size={44} style={{ margin: '0 auto 0.75rem auto', opacity: 0.3 }} color="#0ea5e9" />
                <p style={{ fontWeight: '600', fontSize: '1rem', color: '#0f172a' }}>Select an option to evaluate</p>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Click your preferred answer and hit "Confirm Answer" to reveal detailed technical explanation.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Completed Practice Summary Scorecard */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card" 
          style={{ padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem', background: '#ffffff', border: '1px solid #e2e8f0' }}
        >
          <div style={{ background: '#e0f2fe', color: '#0284c7', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={36} />
          </div>

          <div>
            <span className="badge badge-success" style={{ marginBottom: '0.75rem' }}>
              {selectedSkill ? `${selectedSkill} Track Complete` : `${activeTrack.name} Track Complete`}
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', letterSpacing: '-0.02em', color: '#0f172a' }}>
              Your Practice Score: <span style={{ color: finalPercentage >= 70 ? '#0284c7' : '#ef4444' }}>{correctCount} / {totalQuestions}</span> ({finalPercentage}%)
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
              {finalPercentage >= 80 
                ? `Outstanding performance in ${selectedSkill || activeTrack.name}! You demonstrated a deep understanding of core mechanisms.`
                : finalPercentage >= 60
                ? `Good effort in ${selectedSkill || activeTrack.name}! Review the missed questions to solidify your system fundamentals.`
                : `Keep practicing ${selectedSkill || activeTrack.name}! Review the architectural explanations below to strengthen key gaps.`}
            </p>
          </div>

          {/* Metrics Overview Pill */}
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div className="card" style={{ padding: '1rem 1.5rem', minWidth: '150px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>TOTAL QUESTIONS</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>{totalQuestions}</div>
            </div>
            <div className="card" style={{ padding: '1rem 1.5rem', minWidth: '150px', background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
              <div style={{ fontSize: '0.8rem', color: '#059669' }}>CORRECT</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#059669' }}>{correctCount}</div>
            </div>
            <div className="card" style={{ padding: '1rem 1.5rem', minWidth: '150px', background: '#fee2e2', border: '1px solid #fca5a5' }}>
              <div style={{ fontSize: '0.8rem', color: '#dc2626' }}>INCORRECT</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#dc2626' }}>{totalQuestions - correctCount}</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={handleRestart} className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
              <RotateCcw size={16} /> Retake {selectedSkill || activeTrack.name}
            </button>
            <button onClick={() => { setIsCompleted(false); setCurrentIdx(0); }} className="btn btn-glass" style={{ padding: '0.85rem 1.75rem' }}>
              Review All {totalQuestions} Answers
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InterviewSetupPage;
