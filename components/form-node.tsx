"use client";
import { Handle, Position, Node } from "@xyflow/react";
import { PrefillDrawer } from "./prefill-drawer";

type FormNodeProps = Node & {
  data: {
    id: string;
    component_key: string;
    component_type: string;
    name: string;
    prerequisites: string[];
    permitted_roles: string[];
    input_mapping: object;
    sla_duration: { number: number; unit: string };
    approval_required: boolean;
    approval_roles: string[];
  };
};

export function FormNode({ data }: FormNodeProps) {
  return (
    <div className="border-2 border-gray-300 rounded-lg">
      <Handle type="target" position={Position.Left} />
      <div className="p-4">
        {data.prerequisites?.length > 0 ? (
          <PrefillDrawer data={data} />
        ) : (
          <div>{data.name}</div>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
