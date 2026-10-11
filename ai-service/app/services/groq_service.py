import json
from typing import Dict, Any, Optional
from groq import Groq
from app.config import GROQ_API_KEY

def get_groq_client() -> Optional[Groq]:
    if GROQ_API_KEY and GROQ_API_KEY.startswith("gsk_") and GROQ_API_KEY != "gsk_your_groq_api_key_here":
        return Groq(api_key=GROQ_API_KEY)
    return None

def call_groq_json(system_prompt: str, user_prompt: str, model: str = "openai/gpt-oss-120b") -> Dict[str, Any]:
    """Calls Groq with strict JSON output formatting."""
    client = get_groq_client()
    if not client:
        return {}

    for target_model in [model, "openai/gpt-oss-20b", "qwen/qwen3.8-27b"]:
        try:
            completion = client.chat.completions.create(
                model=target_model,
                messages=[
                    {"role": "system", "content": f"{system_prompt} You must output valid JSON only."},
                    {"role": "user", "content": user_prompt}
                ],
                response_format={"type": "json_object"},
                temperature=0.1
            )
            content = completion.choices[0].message.content
            return json.loads(content)
        except Exception as e:
            print(f"[Groq Error on {target_model}]: {e}")
            continue

    return {}
