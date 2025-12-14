import type { Medication } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Pill } from "lucide-react";
import MedicationCard from "./MedicationCard";

interface MedicationListProps {
  medications: Medication[];
  onRemove: (id: string) => void;
}

const MedicationList = ({ medications, onRemove }: MedicationListProps) => {
  if (medications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Pill className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              No medications added yet. Add your first medication above.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Medications ({medications.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {medications.map((medication) => (
          <MedicationCard
            key={medication.id}
            medication={medication}
            onRemove={onRemove}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default MedicationList;
