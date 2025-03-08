"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AvantosForm } from "@/stores/types";
import { useDialogStore } from "@/stores/dialog-store";
import PrefillDialog from "@/components/prefill-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Suspense, useState } from "react";

/**
 *  styles: string - custom styles
 *  nodeId - current node id
 *  title - current form title/name
 *  form - to get names for field buttons
 *  isAnyFieldsPrefilled - to display dot sign if already edited
 */
type PrefillDrawerProps = {
  styles: string;
  nodeId: string;
  title: string;
  form?: AvantosForm;
  isAnyFieldsPrefilled: boolean;
};

export default function PrefillDrawer({
  styles,
  nodeId,
  title,
  form,
  isAnyFieldsPrefilled,
}: PrefillDrawerProps) {
  const { openDialog, closeDialog, isOpen } = useDialogStore();
  const [isPrefill, setIsPrefill] = useState<boolean>(false);

  const fieldKeys = form ? Object.keys(form?.dynamic_field_config ?? {}) : [];

  return (
    <Drawer
      open={isOpen(nodeId, "DRAWER")}
      onOpenChange={(open) =>
        open ? openDialog(nodeId, "DRAWER") : closeDialog(nodeId, "DRAWER")
      }
    >
      <DrawerTrigger className={styles}>
        {isAnyFieldsPrefilled && "⦁"}
        {title}
      </DrawerTrigger>
      {isOpen(nodeId, "DRAWER") && (
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">Prefill</DrawerTitle>
            <DrawerDescription className="text-center">
              {title}
            </DrawerDescription>
          </DrawerHeader>
          <div className="mx-auto w-full max-w-sm flex flex-col gap-4">
            <div className="flex gap-1.5 items-center">
              <Checkbox
                className="cursor-pointer"
                id="prefill-check"
                checked={isPrefill}
                onCheckedChange={(checked) => setIsPrefill(checked === true)}
              />
              <label
                htmlFor="prefill-check"
                className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Prefill fields for this form
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <Suspense fallback={<div>Loading dialogs...</div>}>
                {fieldKeys.map((fieldName) => {
                  return (
                    <PrefillDialog
                      key={`${nodeId}-${fieldName}`}
                      title={fieldName}
                      nodeId={nodeId || ""}
                      disabled={!isPrefill}
                    />
                  );
                })}
              </Suspense>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      )}
    </Drawer>
  );
}
