"use client";

import { FormFieldProps } from "@/types/props";
import { Input } from "./input";
import { Label } from "./label";
import { Library } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef } from "react";
import extractAddress from "@/utils/extractAdress";
import { DateTimePicker } from "./DateTimePicker";

const libraries: Library[] = ["core", "maps", "places", "marker"];

export default function FormField({
  label,
  formId,
  id,
  setState,
  state,
  inputProps,
  placeAutoComplete,
}: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (inputProps?.type === "number") {
      value = value
        .split("")
        .filter((letter) => !isNaN(Number(letter)))
        .join("");
    }
    setState((prev: any) =>
      formId ? { ...prev, [formId]: { ...prev[formId], [id]: value } } : { ...prev[formId], [id]: value }
    );
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  // TO DO: fix uncontrolled component issue (probably caused by position place autocomplete)

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoaded && placeAutoComplete && formId) {
      const autoComplete = new google.maps.places.Autocomplete(ref.current as HTMLInputElement);
      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        setState((prev: any) => ({ ...prev, [formId]: extractAddress(place) }));
      });
    }
  }, [isLoaded]);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {inputProps?.type !== "datetime" ? (
        <Input
          ref={ref}
          value={state[formId][id]}
          onChange={inputProps?.onChange ?? handleChange}
          id={id}
          {...inputProps}
        />
      ) : (
        <DateTimePicker
          placeholder={inputProps.placeholder}
          granularity="minute"
          value={state[formId][id] || new Date(new Date().setMinutes(0, 0, 0))}
          onChange={(date) => setState((prev: any) => ({ ...prev, [formId]: { ...prev[formId], [id]: date } }))}
        />
      )}
    </div>
  );
}
