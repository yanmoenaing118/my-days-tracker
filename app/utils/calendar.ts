import { DayCellType } from "./types";


export function getDaysCells(currentMonth: number, currentYear: number) {
  const year = currentYear;
  const month = currentMonth;
  // Determine the number of days in the month and the starting day of the week
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDay = firstDay.getDay(); // Index of the first day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const totalDays = lastDay.getDate(); // Total days in the month
  const daysCells: DayCellType[] = [];

  for (let i = 0; i < startingDay; i++) {
    daysCells.push({ day: i, id: i, status: "empty", currentDay: false });
  }

  for (let day = 1; day <= totalDays; day++) {
    const cell: DayCellType = {
      id: day,
      day: day,
      status: "day",
      currentDay:
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear(),
    };

    daysCells.push(cell);
  }

  return daysCells;
}
