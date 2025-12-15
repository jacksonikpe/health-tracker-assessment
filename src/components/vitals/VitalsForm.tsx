import type { VitalsFormData } from "@/types";
import { useState, type FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface VitalsFormProps {
  onSubmit: (data: VitalsFormData) => void;
}

const VitalsForm = ({ onSubmit }: VitalsFormProps) => {
  const [formData, setFormData] = useState<VitalsFormData>({
    systolic: 0,
    diastolic: 0,
    heartRate: 0,
    weight: 0,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof VitalsFormData, string>>
  >({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof VitalsFormData, string>> = {};

    if (formData.systolic < 70 || formData.systolic > 250) {
      newErrors.systolic = "Systolic must be between 70–250 mmHg";
    }
    if (formData.diastolic < 40 || formData.diastolic > 150) {
      newErrors.diastolic = "Diastolic must be between 40–150 mmHg";
    }
    if (formData.heartRate < 30 || formData.heartRate > 220) {
      newErrors.heartRate = "Heart rate must be between 30–220 BPM";
    }
    if (formData.weight < 1 || formData.weight > 1000) {
      newErrors.weight = "Weight must be between 1–1000 lbs";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
    setFormData({ systolic: 0, diastolic: 0, heartRate: 0, weight: 0 });
  };

  const handleChange = (field: keyof VitalsFormData, value: string) => {
    const numValue = value === "" ? 0 : Number(value);
    setFormData((prev) => ({ ...prev, [field]: numValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-800">Log Vital Signs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 min-h-87 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systolic" className="text-gray-700">
                Systolic (mmHg)
              </Label>
              <Input
                id="systolic"
                type="number"
                placeholder="120"
                min="70"
                max="250"
                value={formData.systolic || ""}
                onChange={(e) => handleChange("systolic", e.target.value)}
                required
                aria-invalid={!!errors.systolic}
                className="focus-visible:ring-blue-500"
              />
              {errors.systolic && (
                <p className="text-sm text-red-500">{errors.systolic}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="diastolic" className="text-gray-700">
                Diastolic (mmHg)
              </Label>
              <Input
                id="diastolic"
                type="number"
                placeholder="80"
                min="40"
                max="150"
                value={formData.diastolic || ""}
                onChange={(e) => handleChange("diastolic", e.target.value)}
                required
                aria-invalid={!!errors.diastolic}
                className="focus-visible:ring-blue-500"
              />
              {errors.diastolic && (
                <p className="text-sm text-red-500">{errors.diastolic}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="heart-rate" className="text-gray-700">
              Heart Rate (BPM)
            </Label>
            <Input
              id="heart-rate"
              type="number"
              placeholder="65"
              min="30"
              max="220"
              value={formData.heartRate || ""}
              onChange={(e) => handleChange("heartRate", e.target.value)}
              required
              aria-invalid={!!errors.heartRate}
              className="focus-visible:ring-blue-500"
            />
            {errors.heartRate && (
              <p className="text-sm text-red-500">{errors.heartRate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight" className="text-gray-700">
              Weight (lbs)
            </Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              placeholder="150"
              min="1"
              max="1000"
              value={formData.weight || ""}
              onChange={(e) => handleChange("weight", e.target.value)}
              required
              aria-invalid={!!errors.weight}
              className="focus-visible:ring-blue-500"
            />
            {errors.weight && (
              <p className="text-sm text-red-500">{errors.weight}</p>
            )}
          </div>

          <Button type="submit" className="w-full mt-2">
            Log Vitals
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VitalsForm;
