"use client";
import { Handle, Position } from "@xyflow/react";
import { PrefillDrawer } from "./prefill-drawer"; // TODO fix import
import { NodeData } from "@/stores/types";

type FormNodeProps = {
  data: NodeData;
}

export function FormNode({ data }: FormNodeProps) {
  const styles = "p-4 border-2 rounded-lg";
  const isPrefillAvailable = data.prerequisites?.length > 0;

  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <>
        {isPrefillAvailable ? (
          <PrefillDrawer styles={`${styles} bg-accent cursor-pointer`} data={data} />
        ) : (
          <div className={`${styles} bg-white`}>{data.name}</div>
        )}
      </>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
