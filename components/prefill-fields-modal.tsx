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
import { Button } from "./ui/button";
import { useNodeData } from "@/hooks/use-node-data";

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
  const { globalFields, parentFields } = useNodeData(nodeId);

  console.log('global', globalFields);
  console.log('parent', parentFields);
  // TODO into one component to display fields
  const globalFieldsKeys = Object.keys(globalFields) || [];
  const parentFieldsKeys = Object.keys(parentFields) || [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} variant="outline">
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Select data element to map</DialogDescription>
        </DialogHeader>
        <div className="flex">
          <div>{nodeId}</div>
          <div>
            {globalFieldsKeys.map((field) => (
              <p key={field}>{field}</p>
            ))}
          </div>
          <div>
            {parentFieldsKeys.map((field) => (
              <p key={field}>{field}</p>
            ))}
          </div>
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
