import type { Medication } from "@/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useState } from "react";

interface MedicationCardProps {
  medication: Medication;
  onRemove: (id: string) => void;
}

const MedicationCard = ({ medication, onRemove }: MedicationCardProps) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleRemove = () => {
    onRemove(medication.id);
    setShowDialog(false);
  };

  return (
    <>
      <div className="flex items-start justify-between p-4 rounded-2xl bg-white/80 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
        <div className="space-y-1 flex-1">
          <h3 className="font-semibold text-gray-800">{medication.name}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            <Badge className="bg-blue-50 text-blue-700 border-0">
              {medication.dosage}
            </Badge>
            <Badge variant="secondary" className="text-gray-600">
              {medication.frequency}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowDialog(true)}
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
          aria-label={`Remove ${medication.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Medication?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove{" "}
              <span className="font-semibold text-red-600">
                {medication.name}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              className="bg-red-500 hover:bg-red-600 focus:ring-red-400"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MedicationCard;