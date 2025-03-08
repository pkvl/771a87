import GraphCanvas from "@/components/graph-canvas";
import { getGraph } from "@/lib/http-client";
import { ApiResponse } from "@/stores/types";
import { Edge } from "@xyflow/react";
import { Suspense } from "react";

async function fetchGraph(): Promise<ApiResponse> {
  const response = await getGraph();
  const graph = response?.data;
  if (graph.edges) {
    graph.edges = graph.edges.map((edge: Edge) => ({
      ...edge,
      id: edge.source + "-" + edge.target,
    }));
  }
  // console.log(graph.edges);
  return graph;
}

export default async function Home() {
  const graph = await fetchGraph();

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <GraphCanvas graph={graph} />
      </Suspense>
    </>
  );
}
