import { StepFormProps } from "@/types/props";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import FormField from "@/components/ui/formfield";

export default function StepForm({ title, description, id, fields }: StepFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field) => (
          <FormField formId={id} key={field.id} {...field} />
        ))}
      </CardContent>
    </Card>
  );
}
