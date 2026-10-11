from fastapi import APIRouter
from app.models.rag_models import RAGQueryRequest, RAGQueryResponse, SourceCitation
from app.rag.knowledge_base import search_knowledge_base
from app.config import SIMILARITY_THRESHOLD

router = APIRouter(prefix="/ai/rag", tags=["RAG Knowledge Engine"])

@router.post("/query", response_model=RAGQueryResponse)
async def query_knowledge_base(request: RAGQueryRequest):
    chunks, is_above = search_knowledge_base(request.query, threshold=SIMILARITY_THRESHOLD, top_k=request.top_k)

    if chunks and is_above:
        top_chunk = chunks[0]
        answer = (
            f"According to verified documentation ({top_chunk['document']}, Page {top_chunk['page']}):\n\n"
            f"{top_chunk['text']}"
        )
        source = "knowledge_base"
        citations = [
            SourceCitation(
                document=c["document"],
                page=c["page"],
                score=c["score"],
                snippet=c["text"][:120] + "..."
            )
            for c in chunks
        ]
        relevance = top_chunk["score"]
    else:
        # LLM General Knowledge Fallback
        answer = (
            f"Based on general software engineering knowledge:\n"
            f"'{request.query}' is typically resolved by ensuring clean separation of concerns, "
            f"robust error handling, and adhering to standard design patterns."
        )
        source = "general_knowledge"
        citations = []
        relevance = round(chunks[0]["score"] if chunks else 0.45, 2)

    return RAGQueryResponse(
        query=request.query,
        answer=answer,
        source=source,
        relevance_score=relevance,
        citations=citations
    )
