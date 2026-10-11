from fastapi import APIRouter
from app.models.match_models import MatchRequest, MatchResponse

router = APIRouter(prefix="/ai/match", tags=["Resume-Job Matching"])

def normalize(s: str) -> str:
    return s.lower().replace("-", "").replace(".", "").replace(" ", "")

@router.post("", response_model=MatchResponse)
async def match_resume_with_job(request: MatchRequest):
    req_skills = request.required_skills
    cand_skills = request.candidate_skills

    if not req_skills:
        req_skills = ["React", "Node.js", "Express", "MongoDB", "JavaScript"]

    matched = []
    missing = []

    for req in req_skills:
        req_norm = normalize(req)
        is_matched = any(
            req_norm in normalize(cand) or normalize(cand) in req_norm
            for cand in cand_skills
        )
        if is_matched:
            matched.append(req)
        else:
            missing.append(req)

    # Compute deterministic skill match percentage
    skill_ratio = len(matched) / len(req_skills) if req_skills else 1.0
    tech_score = int(round(skill_ratio * 100))
    overall_score = min(100, int(round((tech_score * 0.70) + 24)))  # 70% skills + 24% baseline profile

    strong_areas = matched[:4] if matched else ["Core Programming"]
    weak_areas = missing[:3] if missing else ["Advanced System Architecture"]

    recommendations = [
        f"Revise and practice technical interview questions on {missing[0]}." if missing else "Review production architectural patterns.",
        "Highlight practical projects that demonstrate hands-on experience.",
        "Take a mock interview in the Interview Simulator to test real-world readiness."
    ]

    explanation = (
        f"Candidate matched {len(matched)} of {len(req_skills)} essential technical skills ({tech_score}%). "
        f"Primary alignment found in {', '.join(strong_areas[:3])}."
    )

    return MatchResponse(
        overall_score=overall_score,
        technical_skills_score=tech_score,
        matched_skills=matched,
        missing_skills=missing,
        strong_areas=strong_areas,
        weak_areas=weak_areas,
        recommendations=recommendations,
        explanation=explanation
    )
