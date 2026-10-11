import os
from typing import Optional
from qdrant_client import QdrantClient
from app.config import QDRANT_URL, QDRANT_API_KEY

_qdrant_client: Optional[QdrantClient] = None

def get_qdrant_client() -> QdrantClient:
    """
    Initializes and returns a singleton QdrantClient.
    Supports:
    1. Qdrant Cloud (Cluster URL + API Key)
    2. Local Docker / HTTP instance
    3. In-memory / file-based fallback
    """
    global _qdrant_client
    if _qdrant_client is not None:
        return _qdrant_client

    try:
        if QDRANT_URL and (QDRANT_URL.startswith("http://") or QDRANT_URL.startswith("https://")):
            if QDRANT_API_KEY and len(QDRANT_API_KEY.strip()) > 5:
                # Cloud cluster with API Key authentication
                print(f"[Qdrant] Connecting to Cloud Cluster: {QDRANT_URL}")
                _qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY, timeout=10)
            else:
                # Local HTTP instance without API Key
                print(f"[Qdrant] Connecting to local HTTP Qdrant: {QDRANT_URL}")
                _qdrant_client = QdrantClient(url=QDRANT_URL, timeout=10)
        else:
            # Local disk storage or in-memory
            storage_path = QDRANT_URL or "./qdrant_storage"
            print(f"[Qdrant] Using local storage path: {storage_path}")
            _qdrant_client = QdrantClient(path=storage_path)

        return _qdrant_client
    except Exception as e:
        print(f"[Qdrant] Warning connecting to Qdrant ({e}). Falling back to in-memory client.")
        _qdrant_client = QdrantClient(location=":memory:")
        return _qdrant_client
