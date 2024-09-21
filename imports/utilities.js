export const convertDateToString = (date) => {
  /*
  When run on a machine in GMT+2,
  this function converts `2024-09-21T19:13:14.270Z`
  to `(GMT+2) 09/21/2024 (Saturday), 21:13`
  */
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long", // Full weekday name
    hour: "2-digit",
    hour12: false, // Use 24-hour format
    minute: "2-digit",
    timeZoneName: "short", // Abbreviated timezone name
  };

  const formattedDate = new Intl.DateTimeFormat(undefined, options).format(
    date
  );

  // Reorder to match the required format "(timezone) YYYY-MM-DD (weekday), HH:MM"
  const [weekdayPart, datePart, timeAndTimeZonePart] =
    formattedDate.split(", ");
  const [timePart, timeZonePart] = timeAndTimeZonePart.split(" ");

  const result = `(${timeZonePart}) ${datePart} (${weekdayPart}), ${timePart}`;

  return result;
};
