// export function FieldAssociationManager({
//   title,
//   nodeId,
//   disabled,
// }: PrefillFieldsProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [hasOpened, setHasOpened] = useState(false);
//   const { addFieldAssociation } = useNodeStore();
  
//   const handleOpenChange = (open: boolean) => {
//     if (open) {
//       setHasOpened(true);
//     }
//     setIsOpen(open);
//   };
  
//   const handleSave = async (association) => {
//     // Add to store
//     addFieldAssociation(association);
    
//     // Close dialog
//     setIsOpen(false);
    
//     // Here you could also call your API directly if needed
//     // await fetch('/api/save-association', { ... })
//   };
  
//   const handleCancel = () => {
//     setIsOpen(false);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleOpenChange}>
//       <DialogTrigger asChild>
//         <Button disabled={disabled} variant="outline">
//           {title}
//         </Button>
//       </DialogTrigger>
      
//       {/* Only render content when dialog has been opened */}
//       {hasOpened && (
//         <Suspense fallback={<div>Loading...</div>}>
//           <LazyFieldAssociationDialog 
//             title={title}
//             nodeId={nodeId}
//             onSave={handleSave}
//             onCancel={handleCancel}
//           />
//         </Suspense>
//       )}
//     </Dialog>
//   );
// }