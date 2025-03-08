"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // TODO fix import
import CollapsableFieldsList from "@/components/collapsable-fields-list";
import { FieldAssociation } from "@/stores/types";
import useNodeStore from "@/stores/form-node-store";
import { toast } from "sonner";
import { useEffect, useState } from "react";

/**
 *  nodeId - current node id
 *  title - current form title/name
 *  disabled - if the button for current form node field should be disabled 
 */
type PrefillDialogProps = {
  nodeId: string;
  title: string;
  disabled: boolean;
};

export default function PrefillDialog({
  nodeId,
  title,
  disabled,
}: PrefillDialogProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const {
    addFieldAssociation,
    removeFieldAssociation,
    getFieldAssociations,
    getGlobalFields,
    getNodeWithParents,
  } = useNodeStore();
  const nodeWithParents = getNodeWithParents(nodeId);
  const fieldAssociations = getFieldAssociations(nodeId);
  const globalFields = getGlobalFields();

  const isCurrentFieldPrefilled = fieldAssociations.some(
    (prefill) =>
      prefill.currentNodeId === nodeId && prefill.currentFieldKey === title
  );

  useEffect(() => {
    const selected = fieldAssociations.find(
      (prefill) =>
        prefill.currentNodeId === nodeId && prefill.currentFieldKey === title
    );
    console.log(selected);
    if (selected) {
      setSelectedParentField(selected);
    }
  }, [nodeId]);

  const handleSave = async () => {
    console.log(selectedParentField);
    if (
      !selectedParentField.currentNodeId ||
      !selectedParentField.currentFieldKey
    ) {
      toast("Error: Nothing to save.");
      return;
    }
    if (
      !selectedParentField.parentNodeId ||
      !selectedParentField.parentFieldKey
    ) {
      removeFieldAssociation(
        selectedParentField.currentNodeId,
        selectedParentField.currentFieldKey
      );
      toast("Field prefill removed successfully.");
      return;
    }

    setIsSaving(true);

    try {
      addFieldAssociation(selectedParentField);
      toast("Field prefill saved successfully.");
    } catch (error: unknown) {
      console.error(error);
      toast("Error: Failed to save field prefill.");
    } finally {
      setIsSaving(false);
    }
  };

  const [selectedParentField, setSelectedParentField] =
    useState<FieldAssociation>({
      currentNodeId: "",
      currentFieldKey: "",
      parentFieldKey: "",
      parentNodeId: "",
    });

  const handleFieldSelection = (association: FieldAssociation) => {
    console.log("assoc", association);
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
          {title} {isCurrentFieldPrefilled && "⦁"}
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
      </DialogContent>
    </Dialog>
  );
}
