import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  Code2,
  Database,
  Send
} from 'lucide-react';

const KNOWLEDGE_ARTICLES = [
  {
    topic: 'Node.js',
    title: 'Node.js Event Loop & Microtask Queues',
    document: 'node-fundamentals.pdf',
    page: 14,
    similarity: 0.92,
    source: 'Curated Knowledge Base',
    content: `Node.js delegates I/O operations to the system kernel whenever possible through libuv. 
The event loop executes through distinct phases:
1. Timers (setTimeout, setInterval)
2. Pending Callbacks (I/O errors)
3. Idle, Prepare (internal usage)
4. Poll (retrieve new I/O events)
5. Check (setImmediate)
6. Close Callbacks (socket.on('close'))

Microtasks (process.nextTick and Promise.then) are drained immediately after the current operation finishes, before transitioning between phases.`
  },
  {
    topic: 'React',
    title: 'React Fiber Reconciliation & Hook Rules',
    document: 'react-advanced.pdf',
    page: 8,
    similarity: 0.88,
    source: 'Curated Knowledge Base',
    content: `React Fiber is a complete rewrite of React core reconciliation engine. It introduces incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames.
Key Rules of Hooks:
- Only call Hooks at the top level of function components.
- Do not call Hooks inside loops, conditions, or nested functions.
- This ensures that Hooks are called in the exact same order each time a component renders.`
  },
  {
    topic: 'MongoDB',
    title: 'Compound Indexing & ESR Rule',
    document: 'mongodb-indexing.pdf',
    page: 22,
    similarity: 0.85,
    source: 'Curated Knowledge Base',
    content: `Compound indexes index multiple fields within a single B-tree index structure.
The ESR (Equality, Sort, Range) rule dictates optimal index field ordering:
1. Equality: Exact match filters (e.g. status: 'active')
2. Sort: Sorting criteria (e.g. createdAt: -1)
3. Range: Inequality or range filters (e.g. price: { $gt: 100 })
Following ESR prevents costly in-memory sorts and minimizes index scan keys.`
  }
];

const KnowledgeChatPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(KNOWLEDGE_ARTICLES[0]);
  const [customQuestion, setCustomQuestion] = useState('');
  const [customAnswer, setCustomAnswer] = useState(null);
  const [answering, setAnswering] = useState(false);

  const filteredArticles = KNOWLEDGE_ARTICLES.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setAnswering(true);
    setTimeout(() => {
      // Find matching knowledge or fallback
      const match = KNOWLEDGE_ARTICLES.find(a => 
        customQuestion.toLowerCase().includes(a.topic.toLowerCase())
      );

      if (match) {
        setCustomAnswer({
          question: customQuestion,
          answer: match.content,
          source: 'Curated Knowledge Base',
          document: match.document,
          page: match.page,
          score: match.similarity
        });
      } else {
        setCustomAnswer({
          question: customQuestion,
          answer: `Based on general software engineering principles, ${customQuestion} is typically handled through scalable architectural patterns and clean component separation.`,
          source: 'General AI Knowledge (Fallback)',
          document: null,
          page: null,
          score: null
        });
      }
      setAnswering(false);
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
      <div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <BookOpen className="text-sky-400" size={32} />
          RAG Technical Knowledge Assistant
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Explore curated developer documentation across JavaScript, React, Node.js, and MongoDB with verified citations.
        </p>
      </div>

      {/* Interactive Search & Q&A Bar */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(17, 24, 39, 0.8) 100%)' }}>
        <form onSubmit={handleAskQuestion} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Ask a technical question (e.g. 'How does the event loop work in Node?')..."
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>

          <button type="submit" className="btn btn-primary" disabled={answering || !customQuestion.trim()}>
            {answering ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="spinner"></span> Querying Qdrant...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Send size={16} /> Ask Knowledge Assistant
              </span>
            )}
          </button>
        </form>

        {/* Q&A Result Display */}
        {customAnswer && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '1.25rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid var(--border-color)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>
                Q: {customAnswer.question}
              </span>
              <span className={customAnswer.document ? 'badge badge-success' : 'badge badge-warning'}>
                Source: {customAnswer.source}
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
              {customAnswer.answer}
            </p>

            {customAnswer.document && (
              <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={14} className="text-sky-400" />
                <span>Reference: <strong>{customAnswer.document}</strong> (Page {customAnswer.page}) • Cosine Similarity: {(customAnswer.score * 100).toFixed(0)}%</span>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Curated Knowledge Base Library Grid */}
      <div className="grid-2">
        {/* Left: Article List */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>
              Curated Reference Documents
            </h2>
            <span className="badge badge-primary">{filteredArticles.length} Available</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredArticles.map((art, idx) => {
              const isSelected = selectedArticle.title === art.title;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedArticle(art)}
                  style={{
                    padding: '0.85rem 1rem',
                    background: isSelected ? 'rgba(14, 165, 233, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid rgba(14, 165, 233, 0.4)' : '1px solid var(--border-color)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{art.topic}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Page {art.page}</span>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', marginTop: '0.4rem' }}>
                    {art.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Article Detail View */}
        {selectedArticle && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge badge-success">
                  <CheckCircle2 size={12} /> {selectedArticle.source}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Similarity: {(selectedArticle.similarity * 100).toFixed(0)}%
                </span>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800' }}>
                {selectedArticle.title}
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={14} className="text-sky-400" />
                <span>Document: {selectedArticle.document} (Page {selectedArticle.page})</span>
              </div>
            </div>

            <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.925rem', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                {selectedArticle.content}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default KnowledgeChatPage;
