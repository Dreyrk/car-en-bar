type FormattedDate = {
  date: string;
  time: string;
};

function formatDateTime(dateToConvert: string): FormattedDate {
  const dateObj = new Date(dateToConvert);

  const formattedDate = dateObj.toLocaleDateString("fr-FR");

  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  const formattedTime = `${hours}:${minutes}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

export default formatDateTime;
