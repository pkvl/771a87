"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button"; // TODO fix import
import { lazy, Suspense, useState } from "react";
import { AvantosForm, FieldAssociation } from "@/stores/types";

type PrefillDrawerContentProps = {
  form?: AvantosForm;
  title: string;
  nodeId: string;
};

const LazyPrefillDialog = lazy(() => import("./prefill-dialog"));

export default function PrefillDrawerContent({
  form,
  title,
  nodeId,
}: PrefillDrawerContentProps) {
  const [isPrefill, setIsPrefill] = useState<boolean>(false);
  const fieldKeys = form ? Object.keys(form?.dynamic_field_config ?? {}) : [];

  const handleSaveAssociation = async (association: FieldAssociation) => {
    console.log(association);
  };

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle className="text-center">Prefill</DrawerTitle>
        <DrawerDescription className="text-center">{title}</DrawerDescription>
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
                <LazyPrefillDialog
                  key={`${nodeId}-${fieldName}`}
                  title={fieldName}
                  nodeId={nodeId || ""}
                  disabled={!isPrefill}
                  onSave={handleSaveAssociation}
                />
              );
            })}
          </Suspense>
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose>
          <Button variant="outline" className="cursor-pointer">
            Close
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
