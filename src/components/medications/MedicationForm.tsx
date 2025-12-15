import type { MedicationFormData } from "@/types";
import { useState, type FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface MedicationFormProps {
  onSubmit: (data: MedicationFormData) => void;
}

const MedicationForm = ({ onSubmit }: MedicationFormProps) => {
  const [formData, setFormData] = useState<MedicationFormData>({
    name: "",
    dosage: "",
    frequency: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", dosage: "", frequency: "" });
  };

  const handleChange = (field: keyof MedicationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-800">Add Medication</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 min-h-87 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="med-name" className="text-gray-700">
              Medication Name
            </Label>
            <Input
              id="med-name"
              placeholder="e.g., Lisinopril"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              maxLength={100}
              className="focus-visible:ring-blue-500"
            />
            <p className="text-xs text-gray-500">Max 100 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dosage" className="text-gray-700">
              Dosage
            </Label>
            <Input
              id="dosage"
              placeholder="e.g., 20mg"
              value={formData.dosage}
              onChange={(e) => handleChange("dosage", e.target.value)}
              required
              maxLength={50}
              className="focus-visible:ring-blue-500"
            />
            <p className="text-xs text-gray-500">Max 50 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency" className="text-gray-700">
              Frequency
            </Label>
            <Input
              id="frequency"
              placeholder="e.g., Once daily in the morning"
              value={formData.frequency}
              onChange={(e) => handleChange("frequency", e.target.value)}
              required
              maxLength={200}
              className="focus-visible:ring-blue-500"
            />
            <p className="text-xs text-gray-500">Max 200 characters</p>
          </div>

          <Button type="submit" className="w-full mt-2">
            Add Medication
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MedicationForm;
