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
    <div className="p-4 rounded-2xl bg-white/80 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="text-sm text-gray-500">
          <div className="font-medium text-gray-700">{formattedDate}</div>
          <div>{formattedTime}</div>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
          <Activity className="h-3 w-3" />
          Vitals
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Activity className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Blood Pressure</div>
            <div className="font-semibold text-gray-800">
              {vital.systolic}/{vital.diastolic}{" "}
              <span className="text-gray-500">mmHg</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-50 rounded-lg">
            <Heart className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Heart Rate</div>
            <div className="font-semibold text-gray-800">
              {vital.heartRate} <span className="text-gray-500">BPM</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 col-span-1 sm:col-span-2">
          <div className="p-2 bg-green-50 rounded-lg">
            <Weight className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Weight</div>
            <div className="font-semibold text-gray-800">
              {vital.weight} <span className="text-gray-500">lbs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalEntry;
