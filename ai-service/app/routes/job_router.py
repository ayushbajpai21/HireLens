from fastapi import APIRouter, HTTPException
from app.models.job_models import JobAnalysisRequest, JobAnalysisResponse
from app.services.groq_service import call_groq_json

router = APIRouter(prefix="/ai/job", tags=["Job Analysis"])

@router.post("/analyze", response_model=JobAnalysisResponse)
async def analyze_job_description(request: JobAnalysisRequest):
    if not request.job_description or len(request.job_description.strip()) < 30:
        raise HTTPException(status_code=400, detail="Job description text is too short.")

    system_prompt = (
        "You are an ATS Job Requirement Analyzer. Extract key requirements from the job description into JSON."
    )
    user_prompt = f"""
Job Title: {request.role}
Company: {request.company or 'Employer'}
Description:
{request.job_description[:5000]}

Schema:
{{
  "role": "{request.role}",
  "company": "{request.company or 'Employer'}",
  "experience_required": "e.g. 1-3 years",
  "required_skills": ["Skill 1", "Skill 2"],
  "preferred_skills": ["Skill A"],
  "responsibilities": ["Responsibility 1", "Responsibility 2"],
  "important_keywords": ["Keyword 1", "Keyword 2"]
}}
Return valid JSON only.
"""
    result = call_groq_json(system_prompt, user_prompt)

    if not result:
        # Fallback extraction
        result = {
            "role": request.role,
            "company": request.company or "Employer",
            "experience_required": "1-3 Years",
            "required_skills": ["React", "Node.js", "Express", "MongoDB", "JavaScript"],
            "preferred_skills": ["TypeScript", "Docker"],
            "responsibilities": [
                "Develop and maintain scalable web features.",
                "Collaborate with engineering teammates.",
                "Ensure robust API integration."
            ],
            "important_keywords": ["REST", "Git", "Full Stack"]
        }

    return JobAnalysisResponse(**result)
