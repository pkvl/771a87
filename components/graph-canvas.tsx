"use client";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { FormNode } from "@/components/form-node";
import { useEffect, useMemo } from "react";
import useNodeStore from "@/stores/form-node-store";
import { ApiResponse } from "@/stores/types";

/**
 * Basic API Response 
 */
type GraphCanvasProps = {
  graph: ApiResponse;
};

export default function GraphCanvas({ graph }: GraphCanvasProps) {
  const { setData } = useNodeStore();

  useEffect(() => {
    if (graph) {
      setData(graph);
    }
  }, [setData, graph]);

  const nodeTypes = useMemo(() => ({ form: FormNode }), []);

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
