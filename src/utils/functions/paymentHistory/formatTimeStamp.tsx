// Function to format the timestamp into date and time
export const formatTimestamp = (
  timestamp: string
): { date: string; time: string } => {
  const dateObject = new Date(timestamp);

  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(dateObject);

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(dateObject);

  return { date, time };
};
