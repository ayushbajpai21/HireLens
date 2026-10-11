import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const Footer = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        {/* Main 4-Column Layout */}
        <div className="footer-grid">
          {/* Column 1: Brand & Mission */}
          <div className="footer-col-brand">
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="footer-brand-logo">
              <div className="footer-logo-badge">
                <Compass size={18} color="#ffffff" strokeWidth={2.6} />
              </div>
              <span className="footer-brand-title">
                Hire<span className="footer-brand-accent">Lens</span>
              </span>
            </Link>

            <p className="footer-description">
              Deterministic career intelligence and technical interview evaluation platform engineered for modern software and engineering professionals.
            </p>

            <div className="footer-status-pill">
              <span className="footer-status-dot"></span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Column 2: Platform Modules */}
          <div className="footer-col">
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-link-list">
              <li>
                <Link to="/resume" className="footer-link">Resume AI Ingestion</Link>
              </li>
              <li>
                <Link to="/jobs" className="footer-link">Job Analyzer</Link>
              </li>
              <li>
                <Link to="/match" className="footer-link">Match Engine</Link>
              </li>
              <li>
                <Link to="/interview" className="footer-link">Technical Assessments</Link>
              </li>
              <li>
                <Link to={isAuthenticated ? "/dashboard" : "/login"} className="footer-link">
                  Candidate Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Architecture & Security */}
          <div className="footer-col">
            <h4 className="footer-heading">Architecture</h4>
            <ul className="footer-link-list">
              <li>
                <Link to="/about" className="footer-link">Platform Architecture</Link>
              </li>
              <li>
                <a href="#features" className="footer-link">PyMuPDF Lossless Engine</a>
              </li>
              <li>
                <a href="#features" className="footer-link">Pydantic V2 Schemas</a>
              </li>
              <li>
                <Link to="/about" className="footer-link">Candidate Privacy &amp; Security</Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">Deterministic Evaluation</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Account & Access */}
          <div className="footer-col">
            <h4 className="footer-heading">Account</h4>
            <ul className="footer-link-list">
              {!isAuthenticated ? (
                <>
                  <li>
                    <Link to="/login" className="footer-link">Sign In</Link>
                  </li>
                  <li>
                    <Link to="/register" className="footer-link">Create Free Account</Link>
                  </li>
                  <li>
                    <Link to="/login" className="footer-link">Password Reset</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/dashboard" className="footer-link">My Workspace</Link>
                  </li>
                  <li>
                    <Link to="/resume" className="footer-link">Upload New Resume</Link>
                  </li>
                  <li>
                    <Link to="/interview" className="footer-link">Practice 15 Questions</Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/about" className="footer-link">About HireLens</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} HireLens. All rights reserved. Precision Career Intelligence.
          </div>

          <div className="footer-legal-links">
            <Link to="/about" className="footer-sublink">Privacy Policy</Link>
            <span className="footer-sep">&bull;</span>
            <Link to="/about" className="footer-sublink">Terms of Service</Link>
            <span className="footer-sep">&bull;</span>
            <Link to="/about" className="footer-sublink">Security &amp; Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
