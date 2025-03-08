"use client";
import { DynamicFieldConfig, FieldAssociation } from "@/stores/types";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

/**
 *  nodeId - current node id
 *  title - current form title/name
 *  fields: string - custom fields used described in @type{DynamicFieldConfig}
 *  selectedField - to track selected field from parent form and use it to prefill the field in current one
 *  onSelectedParentField - method used to communicate with parent component
 */
type CollapsableFieldsListProps = {
  nodeId: string;
  title: string;
  fields: Record<string, DynamicFieldConfig>;
  selectedField?: FieldAssociation;
  onSelectedParentField: (association: FieldAssociation) => void;
};

export default function CollapsableFieldsList({
  nodeId,
  title,
  fields,
  selectedField,
  onSelectedParentField,
}: CollapsableFieldsListProps) {
  const [openItem, setOpenItem] = useState<string>("");

  useEffect(() => {
    if (selectedField?.parentNodeId === nodeId) {
      setOpenItem(`item-${nodeId}`);
    } else {
      setOpenItem("");
    }
  }, [selectedField?.parentNodeId, nodeId]);

  const handleFieldClick = (key: string) => {
    console.log(
      selectedField?.parentNodeId === nodeId,
      selectedField?.parentFieldKey === key
    );
    if (
      selectedField?.parentNodeId === nodeId &&
      selectedField?.parentFieldKey === key
    ) {
      onSelectedParentField({
        currentNodeId: "",
        currentFieldKey: "",
        parentNodeId: "",
        parentFieldKey: "",
      });
    } else {
      onSelectedParentField({
        currentNodeId: selectedField?.currentNodeId || "",
        currentFieldKey: selectedField?.currentFieldKey || "",
        parentNodeId: nodeId,
        parentFieldKey: key,
      });
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      value={openItem}
      onValueChange={setOpenItem}
    >
      <AccordionItem value={`item-${nodeId}`}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col">
            {Object.entries(fields).map(([key]) => (
              <div
                className="p-2 hover:bg-accent cursor-pointer flex justify-between content-center"
                key={key}
                onClick={() => handleFieldClick(key)}
              >
                <div>{key}</div>
                {selectedField &&
                  selectedField.parentFieldKey === key &&
                  selectedField.parentNodeId === nodeId && (
                    <div>
                      <Check size={16} />
                    </div>
                  )}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
