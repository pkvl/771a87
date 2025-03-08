"use client";

import useNodeStore from "@/stores/form-node-store";

export function useNodeData(nodeId: string) {
  const { getNode, getNodeWithForm, getNodeWithParents, getGlobalFields } =
    useNodeStore();

  const node = getNode(nodeId);
  const nodeWithForm = getNodeWithForm(nodeId);
  const nodeWithParents = getNodeWithParents(nodeId);
  const globalFields = getGlobalFields();
  return {
    node,
    nodeWithForm,
    nodeWithParents,
    globalFields,
    // TODO
    // updateNode: (data: Partial<typeof node>) => updateNode(nodeId, data),
  };
}
