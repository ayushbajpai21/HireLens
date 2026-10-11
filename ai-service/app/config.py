import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
QDRANT_URL = os.getenv("QDRANT_URL", "./qdrant_storage")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY", None)
SIMILARITY_THRESHOLD = float(os.getenv("SIMILARITY_THRESHOLD", "0.70"))
PORT = int(os.getenv("PORT", "8000"))
HOST = os.getenv("HOST", "0.0.0.0")
