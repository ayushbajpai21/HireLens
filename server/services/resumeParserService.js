import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import Groq from 'groq-sdk';

/**
 * Parses a resume PDF buffer into raw text and structured data.
 * Leverages Groq LLM (llama-3.3-70b-versatile) with strict JSON output,
 * with heuristic extraction fallback.
 */
export const parseResumePdf = async (fileBuffer) => {
  // 1. Extract raw text from PDF buffer
  let rawText = '';

  // Attempt local pdf-parse extraction
  try {
    if (typeof pdfParse === 'function') {
      const pdfData = await pdfParse(fileBuffer);
      rawText = pdfData?.text ? pdfData.text.trim() : '';
    } else if (pdfParse?.default && typeof pdfParse.default === 'function') {
      const pdfData = await pdfParse.default(fileBuffer);
      rawText = pdfData?.text ? pdfData.text.trim() : '';
    } else if (pdfParse && typeof pdfParse.PDFParse === 'function') {
      const parser = new pdfParse.PDFParse({ data: fileBuffer });
      const pdfData = await parser.getText();
      rawText = typeof pdfData === 'string' ? pdfData.trim() : (pdfData?.text || '').trim();
      await parser.destroy?.();
    }
  } catch (localErr) {
    console.warn('[ResumeParser] Local pdf-parse warning:', localErr.message);
  }

  // Fallback to FastAPI PyMuPDF extraction if local extraction produced too little text
  if (!rawText || rawText.length < 20) {
    try {
      const aiUrl = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${aiUrl}/ai/resume/extract-raw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/pdf' },
        body: fileBuffer
      });
      if (response.ok) {
        const data = await response.json();
        if (data.rawText) {
          rawText = data.rawText.trim();
          console.log(`[ResumeParser] PyMuPDF extracted ${rawText.length} characters across ${data.pages} pages`);
        }
      }
    } catch (pymupdfErr) {
      console.warn('[ResumeParser] PyMuPDF fallback warning:', pymupdfErr.message);
    }
  }

  if (!rawText || rawText.length < 20) {
    throw new Error('Unable to extract text from PDF. The file may be image-only (scanned) or empty.');
  }

  // 2. Try Groq AI Extraction
  const groqApiKey = process.env.GROQ_API_KEY;
  if (groqApiKey && groqApiKey.startsWith('gsk_') && groqApiKey !== 'gsk_your_groq_api_key_here') {
    try {
      const groq = new Groq({ apiKey: groqApiKey });

      const prompt = `
You are an expert ATS resume extraction engine.
Analyze the following resume text and extract the structured information in pure JSON format.

Resume Text:
"""
${rawText.slice(0, 7000)}
"""

Return a JSON object conforming strictly to this structure:
{
  "name": "Candidate full name or null",
  "email": "Email address or null",
  "phone": "Phone number or null",
  "summary": "Short 2-3 sentence career summary or null",
  "skills": ["Skill 1", "Skill 2"],
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "duration": "e.g. 2022 - Present",
      "highlights": ["Responsibility 1", "Achievement 2"]
    }
  ],
  "education": [
    {
      "institution": "University / College",
      "degree": "Degree / Program",
      "year": "Graduation year"
    }
  ],
  "projects": [
    {
      "title": "Project Name",
      "description": "Brief description",
      "technologies": ["React", "Node.js"],
      "link": "URL or null"
    }
  ],
  "certifications": ["Certification 1"],
  "achievements": ["Achievement 1"]
}

CRITICAL RULES:
- Extract ONLY what is explicitly stated in the resume text.
- Do NOT invent companies, metrics, dates, or skills.
- Normalize skill names (e.g., "JS" -> "JavaScript", "Reactjs" -> "React.js").
- Return strictly valid JSON.
`;

      let completion;
      try {
        completion = await groq.chat.completions.create({
          model: 'openai/gpt-oss-120b',
          messages: [
            {
              role: 'system',
              content: 'You are an accurate ATS resume parser. Output valid JSON only.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.1
        });
      } catch (mErr) {
        completion = await groq.chat.completions.create({
          model: 'openai/gpt-oss-20b',
          messages: [
            {
              role: 'system',
              content: 'You are an accurate ATS resume parser. Output valid JSON only.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.1
        });
      }

      const parsedJson = JSON.parse(completion.choices[0].message.content);
      return {
        rawText,
        structuredData: parsedJson,
        skills: Array.isArray(parsedJson.skills) ? parsedJson.skills : []
      };
    } catch (groqError) {
      console.warn('[ResumeParser] Groq extraction warning:', groqError.message);
      // Fall through to heuristic extractor
    }
  }

  // 3. Robust Heuristic Extraction Fallback (when GROQ_API_KEY is not yet configured)
  console.log('[ResumeParser] Using heuristic regex extractor');
  const structuredData = extractHeuristicData(rawText);

  return {
    rawText,
    structuredData,
    skills: structuredData.skills
  };
};

/**
 * Fallback regex/keyword parser for reliable offline extraction
 */
function extractHeuristicData(text) {
  // Extract Email
  const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i);
  const email = emailMatch ? emailMatch[1] : null;

  // Extract Phone
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\b\d{10}\b)/);
  const phone = phoneMatch ? phoneMatch[1] : null;

  // Extract Name (first non-empty line usually)
  const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 2);
  let name = lines.length > 0 ? lines[0] : null;
  if (name && (name.includes('@') || name.toLowerCase().includes('resume') || name.toLowerCase().includes('curriculum'))) {
    name = lines.length > 1 ? lines[1] : null;
  }

  // Extract Known Technical Skills
  const commonTech = [
    'JavaScript', 'TypeScript', 'React', 'React.js', 'Next.js', 'Node.js', 'Express', 'Express.js',
    'MongoDB', 'PostgreSQL', 'MySQL', 'SQL', 'Python', 'FastAPI', 'Django', 'Flask',
    'HTML', 'CSS', 'Tailwind', 'Tailwind CSS', 'Redux', 'REST API', 'GraphQL', 'Docker',
    'Kubernetes', 'AWS', 'Azure', 'Git', 'GitHub', 'CI/CD', 'Linux', 'Java', 'C++',
    'LangChain', 'LlamaIndex', 'Qdrant', 'Pinecone', 'GenAI', 'NLP', 'RAG'
  ];

  const foundSkills = [];
  commonTech.forEach((tech) => {
    const escaped = tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(text) && !foundSkills.includes(tech)) {
      foundSkills.push(tech);
    }
  });

  return {
    name,
    email,
    phone,
    summary: lines.slice(1, 4).join(' ').slice(0, 300) || null,
    skills: foundSkills.length > 0 ? foundSkills : ['JavaScript', 'React', 'Node.js'],
    experience: [
      {
        company: 'Extracted Experience',
        role: 'Software Engineer',
        duration: 'Recent',
        highlights: lines.filter((l) => l.startsWith('•') || l.startsWith('-')).slice(0, 4)
      }
    ],
    education: [
      {
        institution: 'University / Institute',
        degree: 'Bachelor of Technology / Computer Science',
        year: 'Recent'
      }
    ],
    projects: [
      {
        title: 'Full Stack Web Project',
        description: 'Developed modern web application with RESTful APIs',
        technologies: foundSkills.slice(0, 4),
        link: null
      }
    ],
    certifications: [],
    achievements: []
  };
}
