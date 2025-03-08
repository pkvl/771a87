import { syncGraph } from "@/lib/http-client";
import {
  ApiResponse,
  AppGraphStore,
  DynamicFieldConfig,
  FieldAssociation,
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
  fieldAssociations: [],

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

  addFieldAssociation: (association: FieldAssociation) => {
    set((state) => {
      const filteredAssociations = state.fieldAssociations.filter(
        (a) =>
          !(
            a.currentNodeId === association.currentNodeId &&
            a.currentFieldKey === association.currentFieldKey
          )
      );

      return {
        fieldAssociations: [...filteredAssociations, association],
      };
    });
  },

  getFieldAssociations: (nodeId: string) => {
    const { fieldAssociations } = get();
    return fieldAssociations.filter((assoc) => assoc.currentNodeId === nodeId);
  },

  removeFieldAssociation: (currentNodeId: string, currentFieldKey: string) => {
    set((state) => ({
      fieldAssociations: state.fieldAssociations.filter(
        (a) =>
          !(
            a.currentNodeId === currentNodeId &&
            a.currentFieldKey === currentFieldKey
          )
      ),
    }));
  },

  syncFieldAssociations: async () => {
    const { fieldAssociations } = get();

    try {
      await syncGraph({ associations: fieldAssociations });
      return true;
    } catch (error) {
      console.error("Failed to sync field associations:", error);
      return false;
    }
  },
}));

export default useNodeStore;
