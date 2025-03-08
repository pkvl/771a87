"use client";

import useNodeStore from "@/stores/form-node-store";

export function useNode(nodeId: string) {
  const nodeStore = useNodeStore();
  return nodeStore.getNode(nodeId);
}

export function useNodeWithForm(nodeId: string) {
  const nodeStore = useNodeStore();
  return nodeStore.getNodeWithForm(nodeId);
}

export function useNodeWithParents(nodeId: string) {
  const nodeStore = useNodeStore();
  return nodeStore.getNodeWithParents(nodeId);
}

export function useGlobalFields() {
  const nodeStore = useNodeStore();
  return nodeStore.getGlobalFields();
}
