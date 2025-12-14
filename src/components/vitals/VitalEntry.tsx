import type { VitalSigns } from "@/types";
import { format } from "date-fns";
import { Activity, Heart, Weight } from "lucide-react";

interface VitalEntryProps {
  vital: VitalSigns;
}

const VitalEntry = ({ vital }: VitalEntryProps) => {
  const formattedDate = format(new Date(vital.timestamp), "MMM dd, yyyy");
  const formattedTime = format(new Date(vital.timestamp), "h:mm a");

  return (
    <div className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-600">
          <div className="font-medium">{formattedDate}</div>
          <div>{formattedTime}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-blue-500 shrink-0" />
          <div>
            <div className="text-xs text-gray-500">Blood Pressure</div>
            <div className="font-semibold">
              {vital.systolic}/{vital.diastolic} mmHg
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-red-500 shrink-0" />
          <div>
            <div className="text-xs text-gray-500">Heart Rate</div>
            <div className="font-semibold">{vital.heartRate} BPM</div>
          </div>
        </div>

        <div className="flex items-center gap-2 col-span-2">
          <Weight className="h-4 w-4 text-green-500 shrink-0" />
          <div>
            <div className="text-xs text-gray-500">Weight</div>
            <div className="font-semibold">{vital.weight} lbs</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalEntry;
