export const toISO8601 = (date: Date): string => {
  let newDate = date;
  const offset = newDate.getTimezoneOffset();
  newDate = new Date(newDate.getTime() - offset * 60 * 1000);
  return newDate.toISOString().split('T')[0];
};

export const toDate = (date: string): Date => {
  const temp = new Date(date);
  return new Date(temp.getTime() + Math.abs(temp.getTimezoneOffset() * 60000));
};

export const getMonthDifference = (d1: Date, d2: Date): number => {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return Math.abs(months);
};
