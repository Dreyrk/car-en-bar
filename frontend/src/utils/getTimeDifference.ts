function getTimeDifference(startDate: string, endDate: string): string {
  // Convert the dates to milliseconds
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  // Calculate the difference in milliseconds
  const diff = end - start;

  // Calculate hours and minutes
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  // Format the hours and minutes as hh:mm
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

export default getTimeDifference;
