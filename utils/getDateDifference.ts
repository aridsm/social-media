import dayjs from "dayjs";

export function getDateDifference(date: string) {
  const currentDate = new Date();
  const differenceInDays = dayjs(currentDate).diff(date, "day");

  const mins = dayjs(currentDate).diff(date, "minute");
  const hours = dayjs(currentDate).diff(date, "hour");
  const days = differenceInDays;
  const weeks = Math.round(differenceInDays / 7);

  if (weeks > 1) {
    return `${weeks} weeks ago`;
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (hours > 1) {
    return `${hours} hours ago`;
  } else {
    return `${mins} minutes ago`;
  }
}
