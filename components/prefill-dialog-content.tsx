import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button"; // TODO fix import
import CollapsableFields from "./collapsable-fields";
import { useGlobalFields, useNodeWithParents } from "@/hooks/use-node-data";

// TODO types or interfaces
type PrefillDialogContentProps = {
  title: string;
  nodeId: string;
};

export default function PrefillDialogContent({
  title,
  nodeId,
}: PrefillDialogContentProps) {
  const nodeWithParents = useNodeWithParents(nodeId);
  const globalFields = useGlobalFields();

  console.log("parent", nodeWithParents);
  console.log("title", title);
  const globalFieldsKeys = Object.keys(globalFields ?? {});
  // const parentFieldsKeys = Object.keys(nodeWithParents) || [];

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {title} - {nodeWithParents?.data.name}
        </DialogTitle>
        <DialogDescription>Select data element to map</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col">
        <CollapsableFields
          title={"Global Fields"}
          id={"glb"}
          contentFields={globalFieldsKeys}
        />
        {nodeWithParents?.parentNodes.map((parentNode) => (
          <CollapsableFields
            key={parentNode.id}
            title={parentNode.data.name}
            id={parentNode.id}
            contentFields={Object.keys(
              parentNode.form?.dynamic_field_config || []
            )}
          />
        ))}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
}
