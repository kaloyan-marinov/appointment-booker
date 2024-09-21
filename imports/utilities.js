// TODO: (2024/09/21, 22:14)
//      get rid of the time
//      (i.e. "Date" means "just the date, no time")
export const convertDateToString = (date) => {
  /*
  When run on a machine in GMT+2,
  this function converts `2024-09-21T19:13:14.270Z`
  to `(GMT+2) 2024-09-21 (Saturday), 21:13`
  */
  // Get individual date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so we add 1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0"); // 24-hour format
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Get the full weekday name
  const weekday = date.toLocaleString("en-US", { weekday: "long" });

  // Get the timezone abbreviation
  const timezone = date
    .toLocaleTimeString("en-us", { timeZoneName: "short" })
    .split(" ")[2];

  // Format the date string
  const result = `(${timezone}) ${year}-${month}-${day} (${weekday}), ${hours}:${minutes}`;

  return result;
};
