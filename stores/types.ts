import { Edge, Node } from "@xyflow/react";

export interface DynamicFieldConfig {
  selector_field: string;
  payload_fields: object;
  endpoint_id: string;
}

export interface AvantosForm {
  id: string;
  dynamic_field_config: Record<string, DynamicFieldConfig>;
}

export interface NodeData {
  name: string;
  component_id: string;
  component_key: string;
  prerequisites: string[];
}

export interface AvantosNode extends Node {
  id: string;
  data: NodeData;
}

export interface NodeWithForm extends AvantosNode {
  form?: AvantosForm;
  parentNodes?: NodeWithForm[];
}

export interface NodeWithFormAndParents extends NodeWithForm {
  parentNodes: NodeWithForm[];
}

export interface ApiResponse {
  nodes: Node[];
  forms: AvantosForm[];
  edges: Edge[];
}

export interface AppGraphStore {
  nodes: AvantosNode[];
  forms: AvantosForm[];
  setData: (data: ApiResponse) => void;
  getNode: (nodeId: string) => AvantosNode | null;
  getNodeWithForm: (nodeId: string) => NodeWithForm | null;
  getNodeWithParents: (nodeId: string) => NodeWithFormAndParents | null;
  getGlobalFields: () => Record<string, DynamicFieldConfig> | null;
}
