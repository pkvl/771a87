import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type CollapsableFieldsProps = {
  id: string;
  title: string;
  contentFields: string[];
};

export default function CollapsableFields({
  id,
  title,
  contentFields,
}: CollapsableFieldsProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={`item-${id}`}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <ul>
            {contentFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
