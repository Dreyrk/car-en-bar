"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { StepperContextProvider } from "@/components/Stepper/context/StepperContext";
import PlaylistStep from "@/components/carpool/createSteps/PlaylistStep";
import RecapStep from "@/components/carpool/createSteps/RecapStep";
import VehiculeStep from "@/components/carpool/createSteps/VehiculeStep";
import Stepper from "@/components/carpool/Stepper";
import { CarpoolInputType } from "@/types";
import Loader from "@/components/ui/loader";

// TO DO: maybe lazy loading dive in StepForm
const DepartureStep = dynamic(() => import("@/components/carpool/createSteps/DepartureStep"), {
  ssr: false,
  loading: () => <Loader size={50} />,
});
const ArrivalStep = dynamic(() => import("@/components/carpool/createSteps/ArrivalStep"), {
  ssr: false,
  loading: () => <Loader size={50} />,
});

const defaultCarpool: CarpoolInputType = {
  departure: {
    address: "",
    city: "",
    country: "",
    postal_code: "",
  },
  arrival: {
    address: "",
    city: "",
    country: "",
    postal_code: "",
  },
  departure_time: "",
  arrival_time: "",
  carpool_type: "offer",
  price: 0,
  max_passengers: 0,
  participants: [],
  car: { brand: "", model: "", id: 0 },
};

export default function Page() {
  const [carpool, setCarpool] = useState<CarpoolInputType>(defaultCarpool);
  const submit = () => {
    console.log(carpool);
  };
  const steps: React.ReactNode[] = [
    <DepartureStep key={0} state={carpool} setState={setCarpool} />,
    <ArrivalStep key={1} state={carpool} setState={setCarpool} />,
    <VehiculeStep setState={setCarpool} key={2} />,
    <PlaylistStep setState={setCarpool} key={3} />,
    <RecapStep setState={setCarpool} key={4} />,
  ];
  return (
    <main className="grid place-items-center">
      <h1 className="text-4xl font-semibold my-6">Create new crapool</h1>
      <StepperContextProvider maxStep={steps.length - 1}>
        <Stepper submit={submit} steps={steps} />
      </StepperContextProvider>
    </main>
  );
}
