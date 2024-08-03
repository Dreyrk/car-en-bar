import { Position, Travel } from "@/types";

function getTravelTime(departure: Position, arrival: Position): Travel | null {
  let travel = null;
  try {
    const departureString =
      departure.latitude && departure.longitude
        ? `${departure.latitude},${departure.longitude}`
        : `${departure.city}, ${departure.country}`;
    const arrivalString =
      arrival.latitude && arrival.longitude
        ? `${arrival.latitude},${arrival.longitude}`
        : `${arrival.city}, ${arrival.country}`;
    const distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix(
      {
        origins: [departureString],
        destinations: [arrivalString],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (res, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          travel = {
            distance: res?.rows[0].elements[0].distance,
            duration: res?.rows[0].elements[0].duration,
          };
        } else {
          console.error(`Error: ${status}`);
        }
      }
    );
    return travel;
  } catch (e) {
    throw new Error(`Cannot fetch google maps api: ${(e as Error).message}`);
  }
}

export default getTravelTime;
