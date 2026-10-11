from typing import List, Optional
from pydantic import BaseModel, Field

class SourceCitation(BaseModel):
    document: str
    page: int
    score: float
    snippet: str

class RAGQueryRequest(BaseModel):
    query: str
    topic: Optional[str] = None
    top_k: int = 3

class RAGQueryResponse(BaseModel):
    query: str
    answer: str
    source: str = Field(description="'knowledge_base' or 'general_knowledge'")
    relevance_score: float
    citations: List[SourceCitation] = Field(default_factory=list)
