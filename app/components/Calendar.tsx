"use client";
import classNames from "classnames";
import { getDaysCells } from "../utils/calendar";
import ReusableModal from "./Modal";
import { useState } from "react";
import { DayCellType, MyDayType } from "../utils/types";
import { ImCheckboxChecked, ImCross, ImPencil } from "react-icons/im";
import MyDayForm from "./MyDayForm";
import { createMyDay } from "../utils/actions";

// const myDays: MyDayType[] = [
//   {
//     id: 1,
//     day: 21,
//     month: 5,
//     year: 2024,

//     productive: 'false',
//     broke_rules: 'false',
//     dayPassed: true,
//   },
//   {
//     id: 1,
//     day: 22,
//     month: 5,
//     year: 2024,

//     productive: 'true',
//     broke_rules: 'false',
//     dayPassed: true,
//   },
//   {
//     id: 1,
//     day: 23,
//     month: 5,
//     year: 2024,

//     productive: 'false',
//     broke_rules: 'false',
//     dayPassed: true,
//   },
//   {
//     id: 1,
//     day: 23,
//     month: 5,
//     year: 2024,

//     productive: 'false',
//     broke_rules: 'false',
//     dayPassed: true,
//   },
// ];

function getMyDay(
  day: number,
  month: number,
  year: number,
  myDays: MyDayType[]
): MyDayType | undefined {
  return myDays.find(
    (myDay) => myDay.month === month && myDay.year === year && myDay.day === day
  );
}
export default function Calendar({ myDays }: { myDays: MyDayType[] }) {
  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const daysCells = getDaysCells(currentMonth, currentYear);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [isOpen, setIsOpen] = useState(false);
  const [day, setDay] = useState(0);

  const days = daysCells.map((cell) => {
    const myDay = getMyDay(cell.day, currentMonth, currentYear, myDays);
    console.log(myDay);
    return {
      ...cell,
      myDay: myDay,
    };
  });

  const month = new Date().toDateString().split(" ")[1];
  return (
    <>
      <div className="p-1 md:p-4">
        <div className="calendar">
          <div className="flex justify-between bold mb-6 text-lg">
            <h1 className="font-bold text-sm md:text-base uppercase text-green-700">
              Productive Days Tracker
            </h1>
            <span className="underline text-sm">
              {month} {currentYear}
            </span>
          </div>
          <div className="calendar_header grid grid-cols-7 gap-1 md:gap-2">
            {daysOfWeek.map((day) => (
              <div className="font-bold text-center text-sm md:text-base" key={day}>
                {day}
              </div>
            ))}
          </div>
          <div className="calendar_body grid grid-cols-7 gap-1 md:gap-2">
            {days.map((day, idx) => (
              <div
                key={idx}
                className={classNames(
                  "p-1 md:p-3 border shadow-sm rounded",
                  day?.myDay?.daypassed && "border-b-green-700 border-b-2",
                )}
              >
                <div className="min-h-[60px]">
                  {day.status === "day" ? (
                    <div>
                      <div className={classNames("flex justify-between")}>
                        <div
                          className={classNames(
                            "text-sm md:text-base",
                            day.currentDay
                              ? "font-bold text-blue-600"
                              : "text-gray-700"
                          )}
                        >
                          {day.day}
                        </div>
                        {day.currentDay && !day.myDay && (
                          <button
                            onClick={() => {
                              console.log(day);
                              setDay(day.day);
                              setIsOpen(true);
                            }}
                          >
                            <ImPencil size={12} />
                          </button>
                        )}
                      </div>
                      {day.myDay && (
                        <>
                          <span>
                            {day.myDay.productive ? (
                              <ImCheckboxChecked size={18} color="green" />
                            ) : (
                              <ImCross size={18} color="red" />
                            )}
                          </span>
                        </>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ReusableModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MyDayForm
          onSubmit={async (data: MyDayType) => {
            await createMyDay({
              id: Date.now(),
              day,
              month: currentMonth,
              year: currentYear,
              productive: data.productive,
              broke_rules: data.broke_rules,
              daypassed: true,
            });
            setIsOpen(false);
          }}
        />
      </ReusableModal>
    </>
  );
}
