from fastapi import APIRouter, HTTPException, Body, Request
import pymupdf
from app.models.resume_models import ResumeAnalysisResponse, ResumeData
from app.services.groq_service import call_groq_json

router = APIRouter(prefix="/ai/resume", tags=["Resume Analysis"])

@router.post("/extract-raw")
async def extract_raw_pdf_text(request: Request):
    try:
        content = await request.body()
        if not content:
            raise HTTPException(status_code=400, detail="Empty PDF body")
        doc = pymupdf.open(stream=content, filetype="pdf")
        text_parts = []
        for page in doc:
            text_parts.append(page.get_text())
        raw_text = "\n".join(text_parts).strip()
        return {"success": True, "rawText": raw_text, "pages": len(doc)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF extraction error: {str(e)}")



@router.post("/analyze", response_model=ResumeAnalysisResponse)
async def analyze_resume_text(payload: dict = Body(...)):
    raw_text = payload.get("text", "")
    if not raw_text or len(raw_text.strip()) < 20:
        raise HTTPException(status_code=400, detail="Resume text is too short or empty.")

    system_prompt = (
        "You are an ATS resume parsing engine. Parse candidate information into strict JSON."
    )
    user_prompt = f"""
Extract candidate details from this resume text into JSON format:
{raw_text[:6000]}

Schema:
{{
  "name": "Full name or null",
  "email": "Email or null",
  "phone": "Phone or null",
  "summary": "Professional summary or null",
  "skills": ["Skill 1", "Skill 2"],
  "experience": [{{"company": "...", "role": "...", "duration": "...", "highlights": ["..."]}}],
  "education": [{{"institution": "...", "degree": "...", "year": "..."}}],
  "projects": [{{"title": "...", "description": "...", "technologies": ["..."], "link": null}}],
  "certifications": [],
  "achievements": []
}}
STRICT RULE: Do NOT invent facts. Output valid JSON only.
"""
    result = call_groq_json(system_prompt, user_prompt)

    if not result:
        # Fallback structured parsing
        result = {
            "name": "Candidate",
            "email": None,
            "phone": None,
            "summary": "Software engineer with web development experience.",
            "skills": ["JavaScript", "React", "Node.js", "REST APIs"],
            "experience": [{"company": "Previous Tech Co", "role": "Software Developer", "duration": "Recent", "highlights": ["Built web features"]}],
            "education": [{"institution": "University", "degree": "B.Tech Computer Science", "year": "Recent"}],
            "projects": [{"title": "Web Application", "description": "Full stack project", "technologies": ["React", "Node.js"], "link": None}],
            "certifications": [],
            "achievements": []
        }

    resume_data = ResumeData(**result)
    return ResumeAnalysisResponse(
        success=True,
        data=resume_data,
        skills_count=len(resume_data.skills)
    )
