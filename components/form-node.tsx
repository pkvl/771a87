"use client";
import { Handle, Position } from "@xyflow/react";
import { NodeData } from "@/stores/types";
import { Fragment, lazy, Suspense } from "react";
import useNodeStore from "@/stores/form-node-store";

/**
 *  data - basically data property from Node.data by React-Flow but has custom types to select only necessary fields
 */
type FormNodeProps = {
  data: NodeData;
};

const LazyPrefillDrawer = lazy(() => import("./prefill-drawer"));

export function FormNode({ data }: FormNodeProps) {
  const styles = "p-4 border-2 rounded-lg";
  const nodeId = String(data.component_key);
  const { getFieldAssociations, getNodeWithForm } = useNodeStore();
  const nodeWithForm = getNodeWithForm(nodeId);
  const fieldAssociations = getFieldAssociations(nodeId);
  const isPrefillAvailable = data.prerequisites?.length > 0;
  const noPrefillSnippet = () => (
    <div className={`${styles} bg-accent`}>{data.name}</div>
  );
  const isAnyFieldsPrefilled = fieldAssociations.some(
    (field) => field.currentNodeId === nodeId
  );

  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <>
        {isPrefillAvailable ? (
          <Suspense fallback={<Fragment>{noPrefillSnippet()}</Fragment>}>
            <LazyPrefillDrawer
              styles={`${styles} bg-white cursor-pointer hover:bg-accent`}
              form={nodeWithForm?.form}
              title={String(nodeWithForm?.data.name)}
              nodeId={nodeId}
              isAnyFieldsPrefilled={isAnyFieldsPrefilled}
            />
          </Suspense>
        ) : (
          noPrefillSnippet()
        )}
      </>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
