async function getTravelTime(departure: string, arrival: string) {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${departure}&destination=${arrival}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    }
  } catch (e) {
    throw new Error(`Cannot fetch google maps api: ${(e as Error).message}`);
  }
}

export default getTravelTime;
