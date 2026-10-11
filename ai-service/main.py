from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.resume_router import router as resume_router
from app.routes.job_router import router as job_router
from app.routes.match_router import router as match_router
from app.routes.interview_router import router as interview_router
from app.routes.rag_router import router as rag_router
from app.config import HOST, PORT

app = FastAPI(
    title="AI Career Copilot - AI Microservice",
    version="1.0.0",
    description="FastAPI service powering Pydantic Structured Extraction, RAG Knowledge Search, and Adaptive Evaluation."
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(resume_router)
app.include_router(job_router)
app.include_router(match_router)
app.include_router(interview_router)
app.include_router(rag_router)

@app.get("/ai/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "AI Career Copilot - FastAPI Microservice",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=HOST, port=PORT, reload=True)
