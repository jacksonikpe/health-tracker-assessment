import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import VitalEntry from "./VitalEntry";
import type { VitalSigns } from "@/types";

interface VitalsLogProps {
  vitals: VitalSigns[];
}

const VitalsLog = ({ vitals }: VitalsLogProps) => {
  if (vitals.length === 0) {
    return (
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-800">Vitals History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="p-3 bg-gray-100 rounded-full mb-4">
              <Activity className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">
              No vitals recorded yet
            </h3>
            <p className="text-gray-500 max-w-xs">
              Log your first set of vital signs to begin tracking your health.
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
          Vitals History{" "}
          <span className="text-gray-500 font-normal">
            ({vitals.length} entries)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-125 overflow-y-auto">
        {vitals.map((vital) => (
          <VitalEntry key={vital.id} vital={vital} />
        ))}
      </CardContent>
    </Card>
  );
};

export default VitalsLog;
