"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button"; // TODO fix import
import { useState } from "react";
import PrefillDialog from "./prefill-dialog";
import { AvantosForm } from "@/stores/types";

type PrefillDrawerContentProps = {
  form?: AvantosForm;
  title: string;
  nodeId: string;
};

export default function PrefillDrawerContent({
  form,
  title,
  nodeId,
}: PrefillDrawerContentProps) {
  // as we receive data only that contains node id and form id,
  // maybe it's redundant to retrieve the node with form and data itself
  // const nodeWithForm = useNodeWithForm(nodeId);
  const [isPrefill, setIsPrefill] = useState<boolean>(false);

  const fieldKeys = form ? Object.keys(form?.dynamic_field_config ?? {}) : [];
  console.log('title form drawer-content', title);
  console.log(form);
  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle className="text-center">Prefill - {title}</DrawerTitle>
      </DrawerHeader>
      <div className="mx-auto w-full max-w-sm flex flex-col gap-4">
        <div className="flex gap-4">
          <Checkbox
            id="prefill-check"
            checked={isPrefill}
            onCheckedChange={(checked) => setIsPrefill(checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="prefill-check"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Prefill fields for this form
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {fieldKeys.map((fieldName) => {
console.log(fieldName);
            return  (
            <PrefillDialog
              title={fieldName}
              key={`${nodeId}-${fieldName}`}
              nodeId={nodeId || ""}
              disabled={!isPrefill}
            />
          );
          })}
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
