from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# incoming data model
class PipelineData(BaseModel):
    nodes: list
    edges: list
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/pipelines/parse")
def parse_pipeline(data: PipelineData):

    # 1. Count nodes and edges
    num_nodes = len(data.nodes)
    num_edges = len(data.edges)

    # 2. DAG check (simple cycle detection using DFS)
    graph = {}
    for edge in data.edges:
        src = edge.get("source")
        tgt = edge.get("target")
        graph.setdefault(src, []).append(tgt)

    visited = set()
    stack = set()

    def dfs(node):
        if node in stack:
            return True  # cycle detected
        if node in visited:
            return False

        visited.add(node)
        stack.add(node)

        for neighbor in graph.get(node, []):
            if dfs(neighbor):
                return True

        stack.remove(node)
        return False

    # run DFS on all nodes
    is_cycle = any(dfs(node["id"]) for node in data.nodes)
    is_dag = not is_cycle

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }

