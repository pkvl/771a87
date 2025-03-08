import {
  ApiResponse,
  AppGraphStore,
  DynamicFieldConfig,
  NodeWithForm,
} from "@/stores/types";
import { create } from "zustand";

const globalFields: Record<string, DynamicFieldConfig> = {
  textarea: {
    selector_field: "title",
    payload_fields: {
      userId: {
        type: "form_field",
        value: "id",
      },
    },
    endpoint_id: "te_random",
  },
};

const useNodeStore = create<AppGraphStore>((set, get) => ({
  nodes: [],
  forms: [],

  setData: (data: ApiResponse) => {
    set({
      nodes: data.nodes,
      forms: data.forms,
    });
  },

  getNode: (nodeId: string) => {
    return get().nodes.find((n) => n.id === nodeId) || null;
  },

  getNodeWithForm: (nodeId: string) => {
    const { nodes, forms } = get();
    const node = nodes.find((n) => n.id === nodeId) || null;
    if (!node) return null;
    const form = forms.find((f) => f.id === node.data.component_id);
    return {
      ...node,
      form,
    };
  },

  getNodeWithParents: (nodeId: string) => {
    const { nodes, forms } = get();

    const buildNodeWithForm = (nodeId: string): NodeWithForm | null => {
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return null;

      const form = forms.find((f) => f.id === node.data.component_id);

      return {
        ...node,
        form,
      };
    };

    const collectAllParents = (
      nodeId: string,
      allParents: NodeWithForm[] = [],
      visitedIds: Set<string> = new Set()
    ): NodeWithForm[] => {
      if (visitedIds.has(nodeId)) {
        return allParents;
      }

      visitedIds.add(nodeId);

      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return allParents;

      if (node.data.prerequisites && node.data.prerequisites.length > 0) {
        for (const parentId of node.data.prerequisites) {
          const parentNode = buildNodeWithForm(parentId);
          if (parentNode) {
            allParents.push(parentNode);
            collectAllParents(parentId, allParents, visitedIds);
          }
        }
      }

      return allParents;
    };

    const currentNode = buildNodeWithForm(nodeId);
    if (!currentNode) return null;

    const parentNodes = collectAllParents(nodeId);

    return {
      ...currentNode,
      parentNodes,
    };
  },

  getGlobalFields: () => globalFields,
}));

export default useNodeStore;
