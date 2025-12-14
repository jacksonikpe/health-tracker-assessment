import type { Medication } from "@/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface MedicationCardProps {
  medication: Medication;
  onRemove: (id: string) => void;
}

const MedicationCard = ({ medication, onRemove }: MedicationCardProps) => {
  const handleRemove = () => {
    if (confirm(`Remove ${medication.name}?`)) {
      onRemove(medication.id);
    }
  };

  return (
    <div className="flex items-start justify-between p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
      <div className="space-y-1 flex-1">
        <h3 className="font-semibold text-lg">{medication.name}</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{medication.dosage}</Badge>
          <Badge variant="outline">{medication.frequency}</Badge>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
        aria-label={`Remove ${medication.name}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MedicationCard;
