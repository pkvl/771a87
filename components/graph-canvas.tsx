"use client";
import { Background, BackgroundVariant, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { FormNode } from "./form-node";
import { useEffect } from "react";
import { AppGraphState, useAppStore } from "@/stores/form-node-store";

type GraphCanvasProps = {
  graph: AppGraphState;
};

export default function GraphCanvas({ graph }: GraphCanvasProps) {
  const { setNodes, setForms, setEdges } = useAppStore();

  // Initialize store with SSR data
  useEffect(() => {
    if (graph) {
      setNodes(graph.nodes);
      setForms(graph.forms);
      setEdges(graph.edges);
    }
  }, [graph, setNodes, setForms, setEdges]);

  const nodeTypes = { form: FormNode };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={graph.nodes} edges={graph.edges} nodeTypes={nodeTypes}>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
