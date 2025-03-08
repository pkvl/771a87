import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button"; // TODO fix import
import { useNodeData } from "@/hooks/use-node-data";
import CollapsableFields from "./collapsable-fields";

type PrefillFieldsModalProps = {
  title: string;
  nodeId: string;
  disabled: boolean;
};

export function PrefillFieldsModal({
  title,
  nodeId,
  disabled,
}: PrefillFieldsModalProps) {
  const { nodeWithParents, globalFields } = useNodeData(nodeId);

  // console.log('global', globalFields);
  console.log("parent", nodeWithParents);
  // TODO into one component to display fields
  const globalFieldsKeys = Object.keys(globalFields) || [];
  // const parentFieldsKeys = Object.keys(nodeWithParents) || [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} variant="outline">
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
              contentFields={Object.keys(parentNode.form?.dynamic_field_config)}
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
    </Dialog>
  );
}
