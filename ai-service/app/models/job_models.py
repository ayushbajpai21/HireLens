from typing import Optional, List
from pydantic import BaseModel, Field

class JobAnalysisRequest(BaseModel):
    role: str = Field(description="Target job title")
    company: Optional[str] = Field(default=None, description="Company name")
    job_description: str = Field(description="Full text of the job description")

class JobAnalysisResponse(BaseModel):
    role: str
    company: Optional[str] = None
    experience_required: Optional[str] = None
    required_skills: List[str] = Field(default_factory=list)
    preferred_skills: List[str] = Field(default_factory=list)
    responsibilities: List[str] = Field(default_factory=list)
    important_keywords: List[str] = Field(default_factory=list)
