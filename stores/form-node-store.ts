import { Edge, Node } from "@xyflow/react";
import { create } from "zustand";

type DynamicFieldConfig = {
  [key: string]: {
    selector_field: string;
    payload_fields: object;
    endpoint_id: string;
  };
};

interface AvantosForm {
  id: string;
  name: string;
  description: string;
  is_reusable: boolean;
  ui_schema: [];
  dynamic_field_config: DynamicFieldConfig; // | DynamicFieldConfig[];
  field_schema: {
    type: string;
    properties: [];
    required: string[];
  };
}

type AvantosNode = Node & {
  data: {
    id: string;
    component_key: string;
    component_type: string;
    component_id: string;
    name: string;
    prerequisites: string[];
    permitted_roles: string[];
    input_mapping: object;
    sla_duration: { number: number; unit: string };
    approval_required: boolean;
    approval_roles: string[];
  };
};

export interface AppGraphState {
  $schema?: string;
  id?: string;
  tenant_id?: string;
  description?: string;
  category?: string;
  edges: Edge[];
  nodes: AvantosNode[];
  forms: AvantosForm[];
  branches?: [];
  triggers?: [];
  globalFields?: DynamicFieldConfig[];
  getFormById: (id: string) => AvantosForm | undefined;
  getNodeFormFields: (nodeId: string) => DynamicFieldConfig;
  getParentFieldsToPrefill: (nodeId: string) => DynamicFieldConfig;
  getGlobalFields: () => DynamicFieldConfig;
  setNodes: (nodes: AvantosNode[]) => void;
  setForms: (forms: AvantosForm[]) => void;
  setEdges: (edges: Edge[]) => void;
}

/**
 * Some static data of global fields
 */
const globalFields: DynamicFieldConfig = {
  textarea: { selector_field: "title", payload_fields: {}, endpoint_id: "" },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAppStore = create<AppGraphState>((set, get) => ({
  nodes: [],
  forms: [],
  edges: [],
  globalFields: [],

  getFormById: (id: string) => {
    return get().forms.find((form) => form.id === id);
  },

  getNodeFormFields: (nodeId: string) => {
    const node = get().nodes.find((n) => n.id === nodeId);
    const form = get().forms.find(
      (form) => form.id === node?.data.component_id
    );

    return form?.dynamic_field_config || {};
  },

  getParentFieldsToPrefill: (nodeId: string): DynamicFieldConfig => {
    const node = get().nodes.find((n) => n.id === nodeId);

    if (!node) return {};
    // current form node fields - not needed
    // const nodeTypeForm = get().forms.find(
    //   (form) => form.id === node.data.component_id
    // );

    // const nodeFieldConfigs: DynamicFieldConfig[] = [];
    // if (nodeTypeForm?.dynamic_field_config) {
    //   if (Array.isArray(nodeTypeForm.dynamic_field_config)) {
    //     nodeFieldConfigs.push(...nodeTypeForm.dynamic_field_config);
    //   } else {
    //     nodeFieldConfigs.push(nodeTypeForm.dynamic_field_config);
    //   }
    // }

    let parentFieldConfigs: DynamicFieldConfig = {};

    node.data.prerequisites.forEach((parentNodeId) => {
      const parentNode = get().nodes.find((n) => n.id === parentNodeId);
      if (!parentNode) return;

      const parentForm = get().getFormById(parentNode.data.component_id);
      if (!parentForm || !parentForm.dynamic_field_config) return;

      parentFieldConfigs = {
        ...parentFieldConfigs,
        ...parentForm.dynamic_field_config,
      };
    });

    // TODO traverse each node before
    // get new structure like:
    // form a, dynamic_field_config, form title
    // form b: dynamic_field_config, form title
    // etc4

    return parentFieldConfigs;
  },

  getGlobalFields: (): DynamicFieldConfig => {
    return globalFields;
  },

  setNodes: (nodes: AvantosNode[]) => set({ nodes }),
  setForms: (forms: AvantosForm[]) => set({ forms }),
  setEdges: (edges: Edge[]) => set({ edges }),
}));
