"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button"; // TODO fix import
import CollapsableFieldsList from "./collapsable-fields-list";
import { useGlobalFields, useNodeWithParents } from "@/hooks/use-node-data";
import { useState } from "react";
import { FieldAssociation } from "@/stores/types";
import { DialogClose } from "@radix-ui/react-dialog";

type PrefillDialogProps = {
  title: string;
  nodeId: string;
  disabled: boolean;
  onSave: (association: FieldAssociation) => Promise<void>;
  onCancel?: () => void;
};

export default function PrefillDialog({
  title,
  nodeId,
  disabled,
  onSave,
}: PrefillDialogProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const nodeWithParents = useNodeWithParents(nodeId);
  const globalFields = useGlobalFields();

  const handleSave = async () => {
    if (
      !selectedParentField.currentNodeId ||
      !selectedParentField.currentFieldKey ||
      !selectedParentField.parentNodeId ||
      !selectedParentField.parentFieldKey
    ) {
      // toast({
      //   title: "Error",
      //   description: "Failed to save field association.",
      //   variant: "destructive",
      // });
      return;
    }

    setIsSaving(true);

    try {
      await onSave(selectedParentField);

      // toast({
      //   title: "Success",
      //   description: "Field association saved successfully.",
      // });
    } catch (error: unknown) {
      console.error(error);
      // toast({
      //   title: "Error",
      //   description: "Failed to save field association.",
      //   variant: "destructive",
      // });
    } finally {
      setIsSaving(false);
    }
  };

  const [selectedParentField, setSelectedParentField] =
    useState<FieldAssociation>({
      currentNodeId: nodeId,
      currentFieldKey: title,
      parentFieldKey: "",
      parentNodeId: "",
    });

  const handleFieldSelection = (association: FieldAssociation) => {
    setSelectedParentField({
      ...association,
      currentNodeId: nodeId,
      currentFieldKey: title,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer"
          disabled={disabled}
          variant="outline"
        >
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {title} - {nodeWithParents?.data.name}
          </DialogTitle>
          <DialogDescription>Select data element to map</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <CollapsableFieldsList
            title={"Global Fields"}
            nodeId={"glb"}
            fields={globalFields || {}}
            selectedField={selectedParentField}
            onSelectedParentField={handleFieldSelection}
          />
          {nodeWithParents?.parentNodes.map((parentNode) => (
            <CollapsableFieldsList
              key={parentNode.id}
              title={parentNode.data.name}
              nodeId={parentNode.id}
              fields={parentNode.form?.dynamic_field_config || {}}
              selectedField={selectedParentField}
              onSelectedParentField={handleFieldSelection}
            />
          ))}
        </div>
        <DialogFooter>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="cursor-pointer"
                type="button"
                variant="default"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
