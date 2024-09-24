export const randomInt = (min, max) => {
  const randomFloatBetween0And1 = Math.random();
  const result = min + Math.floor(randomFloatBetween0And1 * (max - min + 1));
  return result;
};

export const convertDatetimeToDateOnlyString = (datetime) => {
  /*
  When run on a machine in GMT+2,
  this function converts `2024-09-24T21:13:07.227Z`
  to `2024-09-24 (Tuesday)`
  */
  // Get individual datetime components
  const year = datetime.getFullYear();
  const month = String(datetime.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so we add 1
  const day = String(datetime.getDate()).padStart(2, "0");

  // Get the full weekday name
  const weekday = datetime.toLocaleString("en-US", { weekday: "long" });

  // Format the datetime string
  const result = `${year}-${month}-${day} (${weekday})`;

  return result;
};
