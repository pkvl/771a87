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
import { Button } from "./ui/button";
import { useNodeData } from "@/hooks/use-node-data";
import { useState } from "react";
import { PrefillFieldsModal } from "./prefill-fields-modal";

type PrefillDrawerProps = {
  data: any; // TODO
};

export function PrefillDrawer({ data }: PrefillDrawerProps) {
  const { node, nodeFields } = useNodeData(data.component_key);
  const [isPrefill, setIsPrefill] = useState<boolean>(false);
  const nodeFieldKeys = Object.keys(nodeFields);

  return (
    <Drawer>
      <DrawerTrigger>{data.name}</DrawerTrigger>
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
                  // <Button
                  //   variant="outline"
                  //   key={fieldName}
                  //   disabled={!isPrefill}
                  // >
                  //   {fieldName}
                  // </Button>
                  <PrefillFieldsModal
                    title={fieldName}
                    key={fieldName}
                    nodeId={node.id}
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
