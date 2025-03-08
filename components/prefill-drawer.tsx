"use client";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { NodeData } from "@/stores/types";
import { useDialogStore } from "@/stores/dialog-store";
import { useNodeWithForm } from "@/hooks/use-node-data";
import PrefillDrawerContent from "./prefill-drawer-content";

type PrefillDrawerProps = {
  styles: string;
  data: NodeData;
};

export default function PrefillDrawer({ data, styles }: PrefillDrawerProps) {
  const { openDialog, closeDialog, isOpen } = useDialogStore();
  const nodeId = String(data.component_key);
  const nodeWithForm = useNodeWithForm(nodeId);
  return (
    <Drawer
      open={isOpen(nodeId, "DRAWER")}
      onOpenChange={(open) =>
        open ? openDialog(nodeId, "DRAWER") : closeDialog(nodeId, "DRAWER")
      }
    >
      <DrawerTrigger className={styles}>{data.name}</DrawerTrigger>
      {isOpen(nodeId, "DRAWER") && (
          <PrefillDrawerContent form={nodeWithForm?.form} title={String(data.name)} nodeId={nodeId} />
      )}
    </Drawer>
  );
}
