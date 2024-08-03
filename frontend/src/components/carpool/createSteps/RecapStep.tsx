import { CarpoolInputType, CarpoolType, Travel } from "@/types";
import TripCard from "../TripCard";
import getTravelTime from "@/utils/getTravelTime";

export default function RecapStep({
  setState,
  state,
}: {
  setState: React.Dispatch<React.SetStateAction<any>>;
  state: CarpoolInputType;
}) {
  const departure_time = new Date(state.departure.time) || new Date().toISOString();
  const travelTime = getTravelTime(state.departure, state.arrival)?.duration.value || 0;
  const carpoolToDisplay: CarpoolType = {
    departure: {
      address: state.arrival.address,
      city: state.arrival.city,
      postal_code: state.arrival.postal_code,
      country: state.arrival.country,
    },
    departure_time,
    arrival: {
      address: state.arrival.address,
      city: state.arrival.city,
      postal_code: state.arrival.postal_code,
      country: state.arrival.country,
    },
    arrival_time: new Date(new Date(departure_time).getTime() + travelTime * 1000),
  };

  console.log(carpoolToDisplay);
  return (
    <div>
      <h1 className="font-semibold text-2xl">Recap Step</h1>
      <code className="flex overflow-x-auto">{JSON.stringify(state)}</code>
      {/* <TripCard carpool={} /> */}
    </div>
  );
}
