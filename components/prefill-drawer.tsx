"use client";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Button } from "./ui/button"; // TODO fix import
import { useNodeData } from "@/hooks/use-node-data";
import { useState } from "react";
import { PrefillFieldsModal } from "./prefill-fields-modal";
import { NodeData } from "@/stores/types";

type PrefillDrawerProps = {
  styles: string;
  data: NodeData;
};

export function PrefillDrawer({ data, styles }: PrefillDrawerProps) {
  // as we receive data only that contains node id and form id,
  // maybe it's redundant to retrieve the node with form and data itself
  const { nodeWithForm } = useNodeData(data.component_key);
  const [isPrefill, setIsPrefill] = useState<boolean>(false);
  const nodeFieldKeys = nodeWithForm
    ? Object.keys(nodeWithForm.form?.dynamic_field_config ?? {})
    : [];

  return (
      <Drawer>
        <DrawerTrigger className={styles}>{data.name}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Prefill</DrawerTitle>
            <DrawerDescription>
              <div className="items-top flex space-x-2">
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
                  {nodeFieldKeys.map((fieldName) => (
                    <PrefillFieldsModal
                      title={fieldName}
                      key={fieldName}
                      nodeId={nodeWithForm?.id || ""}
                      disabled={!isPrefill}
                    />
                  ))}
                </div>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  );
}
