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
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-800">My Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="p-3 bg-gray-100 rounded-full mb-4">
              <Pill className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">
              No medications added yet
            </h3>
            <p className="text-gray-500 max-w-xs">
              Add your first medication to begin tracking your treatment plan.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-800">
          My Medications{" "}
          <span className="text-gray-500 font-normal">
            ({medications.length})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-125 overflow-y-auto">
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
