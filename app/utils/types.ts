export type DayCellType = {
  day: number;
  id: number;
  status: "empty" | "day";
  currentDay: boolean;
};

export type MyDayType = {
  id: number;
  day: number;
  month: number;
  year: number;
  productive: string;
  broke_rules: string;
  daypassed: boolean
};
