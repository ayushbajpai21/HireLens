import math
import re
from typing import List, Dict, Any, Tuple

# Curated developer technical knowledge corpus
CURATED_CHUNKS = [
    {
        "id": "node-1",
        "topic": "nodejs",
        "subtopic": "event-loop",
        "document": "node-fundamentals.pdf",
        "page": 12,
        "text": (
            "Node.js operates on an event-driven, non-blocking I/O model built on Google Chrome's V8 engine "
            "and the libuv cross-platform abstraction library. The event loop coordinates asynchronous I/O across "
            "six distinct execution phases: 1) Timers (setTimeout, setInterval), 2) Pending Callbacks (I/O errors), "
            "3) Idle/Prepare, 4) Poll (retrieves new I/O events and blocks if no timers are pending), 5) Check (executes setImmediate callbacks), "
            "and 6) Close Callbacks (e.g. socket.destroy). Microtask queues (process.nextTick followed by Promise microtasks) "
            "drain completely between individual phase transitions, making process.nextTick higher priority than setImmediate."
        )
    },
    {
        "id": "node-2",
        "topic": "nodejs",
        "subtopic": "streams-buffers",
        "document": "node-fundamentals.pdf",
        "page": 28,
        "text": (
            "Streams in Node.js handle streaming data chunk by chunk rather than loading entire payloads into memory at once. "
            "The four native stream types are: Readable, Writable, Duplex, and Transform (e.g. zlib compression or crypto hashing). "
            "When a readable stream emits data faster than a writable stream can consume it, backpressure occurs. "
            "The pipe() and pipeline() methods natively handle backpressure by pausing the readable stream when the writable "
            "stream's internal buffer (highWaterMark, default 16KB for objects or 64KB for buffers) is saturated."
        )
    },
    {
        "id": "react-1",
        "topic": "react",
        "subtopic": "fiber-reconciliation",
        "document": "react-advanced.pdf",
        "page": 8,
        "text": (
            "React Fiber is a complete re-architecture of React's reconciliation engine. Unlike the older Stack reconciler "
            "which processed updates recursively and synchronously, Fiber represents component tree nodes as fiber units of work. "
            "Each fiber contains pointers to its child, sibling, and return (parent) fibers. "
            "This enables cooperative multitasking and time slicing: the browser's main thread can yield control "
            "to user input and animations via requestIdleCallback / scheduler, then resume rendering lower-priority updates."
        )
    },
    {
        "id": "react-2",
        "topic": "react",
        "subtopic": "hooks-memoization",
        "document": "react-fundamentals.pdf",
        "page": 19,
        "text": (
            "React Hooks rely on an array-backed linked list within the component fiber instance. "
            "Because hook state is indexed by invocation order, hooks must never be called inside conditions, loops, or nested functions. "
            "useMemo caches the result of an expensive calculation between renders until dependency array values change by referential equality. "
            "useCallback returns a memoized function reference, preventing unnecessary re-renders of memoized child components (React.memo) "
            "that rely on stable function props."
        )
    },
    {
        "id": "mongodb-1",
        "topic": "mongodb",
        "subtopic": "indexing-esr",
        "document": "mongodb-indexing.pdf",
        "page": 22,
        "text": (
            "MongoDB utilizes B-tree indexes to optimize document lookups without full collection scans (COLLSCAN). "
            "When designing compound indexes, the ESR (Equality, Sort, Range) rule must be adhered to: "
            "1. Equality: Place exact match equality filter keys first (e.g., status, organizationId). "
            "2. Sort: Place sort order keys second, allowing the engine to traverse the index in sorted sequence without in-memory sorting (SORT stage). "
            "3. Range: Place inequality and range filter keys last (e.g., createdAt > date, price < 500). "
            "Reversing Sort and Range causes inefficient multi-index traversal and forces in-memory sort."
        )
    },
    {
        "id": "mongodb-2",
        "topic": "mongodb",
        "subtopic": "aggregation-pipeline",
        "document": "mongodb-fundamentals.pdf",
        "page": 35,
        "text": (
            "The MongoDB Aggregation Framework processes data through a multi-stage pipeline where documents stream through "
            "sequential operational stages. Core stages include: $match (filters documents; benefits from indexes if placed first), "
            "$project (reshapes fields), $group (accumulates metrics using operators like $sum, $avg), $lookup (performs left outer joins "
            "with external collections), and $unwind (deconstructs array fields into individual document streams). "
            "Pipelines optimize memory usage by streaming data, with a 100MB RAM cap per stage unless allowDiskUse is enabled."
        )
    }
]

def tokenize(text: str) -> List[str]:
    """Tokenize and normalize text into clean words."""
    words = re.findall(r'\b[a-zA-Z0-9_\-\.]+\b', text.lower())
    stop_words = {"the", "a", "an", "and", "or", "in", "on", "at", "to", "for", "of", "with", "is", "are", "was", "were"}
    return [w for w in words if w not in stop_words]

def compute_similarity(query_tokens: List[str], chunk_tokens: List[str]) -> float:
    """Computes TF-IDF weighted Jaccard / Cosine approximation between query and chunk."""
    if not query_tokens or not chunk_tokens:
        return 0.0
    
    query_set = set(query_tokens)
    chunk_set = set(chunk_tokens)
    
    intersection = query_set.intersection(chunk_set)
    if not intersection:
        return 0.0
    
    # Overlap weighted by query coverage
    coverage = len(intersection) / len(query_set)
    # Jaccard component
    jaccard = len(intersection) / len(query_set.union(chunk_set))
    
    score = (0.75 * coverage) + (0.25 * jaccard)
    return min(1.0, score * 1.35)

def search_knowledge_base(query: str, threshold: float = 0.70, top_k: int = 3) -> Tuple[List[Dict[str, Any]], bool]:
    """
    Retrieves the most relevant knowledge base chunks for a query.
    Returns (chunks, is_above_threshold).
    """
    q_tokens = tokenize(query)
    scored_chunks = []

    for chunk in CURATED_CHUNKS:
        c_tokens = tokenize(chunk["text"])
        score = compute_similarity(q_tokens, c_tokens)
        if score > 0.15:
            scored_chunks.append({
                **chunk,
                "score": round(score, 3)
            })

    scored_chunks.sort(key=lambda x: x["score"], reverse=True)
    results = scored_chunks[:top_k]

    # Check if the highest scoring chunk passes the similarity threshold
    is_above_threshold = bool(results and results[0]["score"] >= threshold)
    return results, is_above_threshold
