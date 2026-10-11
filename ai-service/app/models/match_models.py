from typing import List, Optional
from pydantic import BaseModel, Field

class MatchRequest(BaseModel):
    candidate_skills: List[str]
    required_skills: List[str]
    resume_summary: Optional[str] = None
    job_description: Optional[str] = None

class MatchResponse(BaseModel):
    overall_score: int = Field(ge=0, le=100)
    technical_skills_score: int = Field(ge=0, le=100)
    matched_skills: List[str]
    missing_skills: List[str]
    strong_areas: List[str]
    weak_areas: List[str]
    recommendations: List[str]
    explanation: str
