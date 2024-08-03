import { FormFieldProps } from "@/types/props";
import StepForm from "./StepForm";
import getTravelTime from "@/utils/getTravelTime";
import { useEffect } from "react";

export default function ArrivalStep({
  setState,
  state,
}: {
  setState: React.Dispatch<React.SetStateAction<any>>;
  state: any;
}) {
  const fields: Omit<FormFieldProps, "formId">[] = [
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
      <h1 className="font-semibold text-2xl text-center my-4">Arrival Step</h1>
      <StepForm title="Arrival" id="arrival" description="Choose your arrival point" fields={fields} />
    </div>
  );
}
