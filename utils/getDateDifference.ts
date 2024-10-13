import dayjs from "dayjs";

export function getDateDifference(date: string) {
  const currentDate = new Date();
  const differenceInDays = dayjs(currentDate).diff(date, "day");

  const mins = dayjs(currentDate).diff(date, "minute");
  const hours = dayjs(currentDate).diff(date, "hour");
  const days = differenceInDays;
  const weeks = Math.round(differenceInDays / 7);

  if (weeks > 1) {
    return weeks === 1 ? `${weeks} week ago` : `${weeks} weeks ago`;
  } else if (days > 1) {
    return days === 1 ? `${days} day ago` : `${days} days ago`;
  } else if (hours > 1) {
    return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
  } else if (mins >= 1) {
    return mins === 1 ? `${mins} minute ago` : `${mins} minutes ago`;
  } else {
    return "Now";
  }
}
