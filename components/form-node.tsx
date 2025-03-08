"use client";
import { Handle, Position } from "@xyflow/react";
import { NodeData } from "@/stores/types";
import { Fragment, lazy, Suspense } from "react";

type FormNodeProps = {
  data: NodeData;
};

const LazyPrefillDrawer = lazy(() => import("./prefill-drawer"));

export function FormNode({ data }: FormNodeProps) {
  const styles = "p-4 border-2 rounded-lg";
  const isPrefillAvailable = data.prerequisites?.length > 0;
  const noPrefilSnippet = () => (
    <div className={`${styles} bg-white`}>{data.name}</div>
  );

  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <>
        {isPrefillAvailable ? (
          <Suspense fallback={<Fragment>{noPrefilSnippet()}</Fragment>}>
            <LazyPrefillDrawer
              styles={`${styles} bg-accent cursor-pointer`}
              data={data}
            />
          </Suspense>
        ) : (
          noPrefilSnippet()
        )}
      </>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
