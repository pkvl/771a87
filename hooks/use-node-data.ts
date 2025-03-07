"use client";

import { useAppStore } from "@/stores/form-node-store";

export function useNodeData(nodeId: string) {
  const {
    nodes,
    getFormById,
    getParentFieldsToPrefill,
    getNodeFormFields,
    getGlobalFields,
  } = useAppStore();

  const node = nodes.find((n) => n.id === nodeId);
  const form = getFormById(node?.data.component_id || "");
  const parentFields = getParentFieldsToPrefill(nodeId);
  const nodeFields = getNodeFormFields(nodeId);
  const globalFields = getGlobalFields();
  console.log(nodeFields);
  return {
    node,
    form,
    parentFields,
    nodeFields,
    globalFields,
    // TODO
    // updateNode: (data: Partial<typeof node>) => updateNode(nodeId, data),
  };
}
