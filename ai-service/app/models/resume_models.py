from typing import Optional, List
from pydantic import BaseModel, Field

class Experience(BaseModel):
    company: str = Field(description="Company or organization name")
    role: str = Field(description="Job title or designation")
    duration: Optional[str] = Field(default=None, description="Employment dates or duration")
    highlights: List[str] = Field(default_factory=list, description="Key achievements or responsibilities")

class Education(BaseModel):
    institution: str = Field(description="College or university name")
    degree: str = Field(description="Degree name or field of study")
    year: Optional[str] = Field(default=None, description="Graduation year")

class Project(BaseModel):
    title: str = Field(description="Project title")
    description: str = Field(description="Brief overview of the project")
    technologies: List[str] = Field(default_factory=list, description="Tech stack used")
    link: Optional[str] = Field(default=None, description="Repository or live URL")

class ResumeData(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    summary: Optional[str] = None
    skills: List[str] = Field(default_factory=list)
    experience: List[Experience] = Field(default_factory=list)
    education: List[Education] = Field(default_factory=list)
    projects: List[Project] = Field(default_factory=list)
    certifications: List[str] = Field(default_factory=list)
    achievements: List[str] = Field(default_factory=list)

class ResumeAnalysisResponse(BaseModel):
    success: bool
    data: ResumeData
    skills_count: int
