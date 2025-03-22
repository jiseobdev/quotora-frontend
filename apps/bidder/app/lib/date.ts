import { differenceInCalendarDays } from "date-fns";

export function getDDay(targetDate: Date): string {
  const today = new Date();
  const diff = differenceInCalendarDays(targetDate, today);

  if (diff > 0) {
    return `D-${diff}`;
  } else if (diff === 0) {
    return 'D-Day';
  } else {
    return `D+${Math.abs(diff)}`;
  }
}
