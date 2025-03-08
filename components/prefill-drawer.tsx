"use client";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { lazy, Suspense } from "react";
import { NodeData } from "@/stores/types";
import { useDialogStore } from "@/stores/dialog-store";
import { useNodeWithForm } from "@/hooks/use-node-data";

type PrefillDrawerProps = {
  styles: string;
  data: NodeData;
};

const LazyPrefillDrawerContent = lazy(() => import("./prefill-drawer-content"));

export default function PrefillDrawer({ data, styles }: PrefillDrawerProps) {
  const { openDialog, closeDialog, isOpen } = useDialogStore();
  const nodeId = String(data.component_key);
  const nodeWithForm = useNodeWithForm(nodeId);
  console.log("data", data);
  return (
    <Drawer
      open={isOpen(nodeId, "DRAWER")}
      onOpenChange={(open) =>
        open ? openDialog(nodeId, "DRAWER") : closeDialog(nodeId, "DRAWER")
      }
    >
      <DrawerTrigger className={styles}>{data.name}</DrawerTrigger>
      {isOpen(nodeId, "DRAWER") && (
        <Suspense>
          <LazyPrefillDrawerContent form={nodeWithForm?.form} title={String(data.name)} nodeId={nodeId} />
        </Suspense>
      )}
    </Drawer>
  );
}
