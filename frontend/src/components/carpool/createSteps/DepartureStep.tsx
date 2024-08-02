import { FormFieldProps } from "@/types/props";
import StepForm from "./StepForm";

export default function DepartureStep({
  setState,
  state,
}: {
  setState: React.Dispatch<React.SetStateAction<any>>;
  state: any;
}) {
  const fields: Omit<FormFieldProps, "formId">[] = [
    {
      id: "time",
      label: "Departure at",
      setState,
      state,
      inputProps: { type: "datetime" },
      placeAutoComplete: false,
    },
    {
      id: "address",
      label: "Adress",
      setState,
      state,
      inputProps: { placeholder: "Enter an address" },
      placeAutoComplete: true,
    },
    {
      id: "city",
      label: "City",
      setState,
      state,
      inputProps: { placeholder: "Enter a city" },
      placeAutoComplete: true,
    },
    {
      id: "country",
      label: "Country",
      setState,
      state,
      inputProps: { placeholder: "Enter a country" },
      placeAutoComplete: true,
    },
    {
      id: "postalcode",
      label: "Postal Code",
      setState,
      state,
      inputProps: { placeholder: "Enter a postal code" },
      placeAutoComplete: true,
    },
  ];

  return (
    <div className="min-w-full">
      <h1 className="font-semibold text-2xl text-center my-4">Departure Step</h1>
      <StepForm title="Departure" id="departure" description="Choose your departure point" fields={fields} />
    </div>
  );
}
