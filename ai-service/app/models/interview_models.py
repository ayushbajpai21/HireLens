from typing import List, Optional
from pydantic import BaseModel, Field

class InterviewQuestionRequest(BaseModel):
    topic: str
    subtopic: Optional[str] = None
    difficulty: str = "Medium"
    candidate_skills: Optional[List[str]] = None

class InterviewQuestionResponse(BaseModel):
    topic: str
    subtopic: str
    difficulty: str
    question: str
    ideal_key_points: List[str]
    source: str = "knowledge_base"

class AnswerEvaluationRequest(BaseModel):
    question: str
    candidate_answer: str
    ideal_key_points: Optional[List[str]] = None
    reference_context: Optional[str] = None

class AnswerEvaluationResponse(BaseModel):
    technical_accuracy: float = Field(ge=1.0, le=10.0)
    completeness: float = Field(ge=1.0, le=10.0)
    communication: float = Field(ge=1.0, le=10.0)
    overall_score: float = Field(ge=1.0, le=10.0)
    feedback: str
    strengths: List[str] = Field(default_factory=list)
    areas_for_improvement: List[str] = Field(default_factory=list)
