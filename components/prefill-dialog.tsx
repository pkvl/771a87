import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button"; // TODO fix import
import { useDialogStore } from "@/stores/dialog-store";
import { lazy, Suspense } from "react";

type PrefillDialogProps = {
  title: string;
  nodeId: string;
  disabled: boolean;
};

const LazyPrefillDialogContent = lazy(() => import("./prefill-dialog-content"));

export default function PrefillDialog({
  title,
  nodeId,
  disabled,
}: PrefillDialogProps) {
  const { openDialog, closeDialog, isOpen } = useDialogStore();
  console.log("instance of prefill dialog");
  return (
    <Dialog
      open={isOpen(nodeId, "DIALOG")}
      onOpenChange={(open) =>
        open ? openDialog(nodeId, "DIALOG") : closeDialog(nodeId, "DIALOG")
      }
    >
      <DialogTrigger asChild>
        <Button disabled={disabled} variant="outline">
          {title}
        </Button>
      </DialogTrigger>
      {isOpen(nodeId, "DIALOG") && (
        <Suspense
          // fallback={
          //   <Button disabled={disabled} variant="outline">
          //     {title}
          //   </Button>
          // }
        >
          <LazyPrefillDialogContent title={title} nodeId={nodeId} />
        </Suspense>
      )}
    </Dialog>
  );
}
