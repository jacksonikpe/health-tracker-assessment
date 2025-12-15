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
    <Card>
      <CardHeader>
        <CardTitle>Add Medication</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="med-name">Medication Name</Label>
            <Input
              id="med-name"
              placeholder="e.g., Lisinopril"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">Max 100 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dosage">Dosage</Label>
            <Input
              id="dosage"
              placeholder="e.g., 20mg"
              value={formData.dosage}
              onChange={(e) => handleChange("dosage", e.target.value)}
              required
              maxLength={50}
            />
            <p className="text-xs text-muted-foreground">Max 50 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Input
              id="frequency"
              placeholder="e.g., Once daily in the morning"
              value={formData.frequency}
              onChange={(e) => handleChange("frequency", e.target.value)}
              required
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground">Max 200 characters</p>
          </div>

          <Button type="submit" className="w-full">
            Add Medication
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MedicationForm;
