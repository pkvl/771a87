"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DynamicFieldConfig, FieldAssociation } from "@/stores/types";
import { Check } from "lucide-react";

type CollapsableFieldsListProps = {
  nodeId: string;
  title: string;
  fields: Record<string, DynamicFieldConfig>;
  selectedField?: FieldAssociation;
  onSelectedParentField: (association: FieldAssociation) => void;
  onCancel?: () => void;
};

export default function CollapsableFieldsList({
  nodeId,
  title,
  fields,
  selectedField,
  onSelectedParentField,
}: CollapsableFieldsListProps) {
  const handleFieldClick = (key: string) => {
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
      // If clicking a different field or component, select the new one
      onSelectedParentField({
        currentNodeId: selectedField?.currentNodeId || "",
        currentFieldKey: selectedField?.currentFieldKey || "",
        parentNodeId: nodeId,
        parentFieldKey: key,
      });
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
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
