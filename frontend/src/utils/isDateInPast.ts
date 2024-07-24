function isDateInPast(date: string): boolean {
  const currentDate = new Date();
  const providedDate = new Date(date);

  return providedDate < currentDate;
}

export default isDateInPast;
