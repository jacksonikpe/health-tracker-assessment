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
      <Card>
        <CardHeader>
          <CardTitle>Vitals History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              No vitals logged yet. Log your first vital signs above.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vitals History ({vitals.length} entries)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
        {vitals.map((vital) => (
          <VitalEntry key={vital.id} vital={vital} />
        ))}
      </CardContent>
    </Card>
  );
};

export default VitalsLog;
