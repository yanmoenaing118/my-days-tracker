"use client";
import classNames from "classnames";
import { getDaysCells } from "../utils/calendar";
import ReusableModal from "./Modal";
import { useEffect, useState } from "react";
import { DayCellType, MyDayType } from "../utils/types";
import { ImCheckboxChecked, ImCross, ImPencil } from "react-icons/im";
import MyDayForm from "./MyDayForm";
import { createMyDay } from "../utils/actions";
import { GrNext, GrPrevious } from "react-icons/gr";

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

const noToMonthMap: {
  [key: string]: string;
} = {
  "0": "January",
  "1": "February",
  "2": "March",
  "3": "April",
  "4": "May",
  "5": "June",
  "6": "July",
  "7": "August",
  "8": "September",
  "9": "October",
  "10": "November",
  "11": "December",
};
export default function Calendar({ myDays }: { myDays: MyDayType[] }) {
  const now = new Date();

  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  console.log(currentMonth);
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const daysCells = getDaysCells(currentMonth, currentYear);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [isOpen, setIsOpen] = useState(false);
  const [day, setDay] = useState(0);

  const days = daysCells.map((cell) => {
    const myDay = getMyDay(cell.day, currentMonth, currentYear, myDays);
    // console.log(myDay);
    return {
      ...cell,
      myDay: myDay,
    };
  });

  const month = new Date().toDateString().split(" ")[1];

  useEffect(() => {
    console.log(myDays)
    console.log(days)
  },[myDays])

  return (
    <>
      <div className="p-1 md:p-4 relative">
        <div className="calendar">
          <div className="flex justify-between bold mb-6 text-lg">
            <h1 className="font-bold text-sm md:text-base uppercase text-green-700">
              Productive Days Tracker
            </h1>
            <span
              className="underline text-sm"
              onClick={() => setCurrentMonth(now.getMonth())}
            >
              <button>
                {month} {currentYear}
              </button>
            </span>
          </div>
          <div className="calendar_header grid grid-cols-7 gap-1 md:gap-2">
            {daysOfWeek.map((day) => (
              <div
                className="font-bold text-center text-sm md:text-base"
                key={day}
              >
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
                  day?.myDay?.daypassed && "border-b-gray-600 border-b-2"
                )}
              >
                <div className="min-h-[50px] md:min-h-[60px]">
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
                        {day.myDay && day.myDay.broke_rules && (
                          <span className="text-red-500 font-bold text-sm">
                            M
                          </span>
                        )}
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
                          <div className="mb-2">
                            {!day.myDay.productive &&
                              day.myDay?.broke_rules && (
                                <ImCross size={18} color="red" />
                              )}
                          </div>
                          {day.myDay.productive && (
                            <div className="text-green-700 font-bold text-sm md:hidden">
                              P
                            </div>
                          )}
                          {!day.myDay?.productive ? (
                            <div className="text-red-700 text-[10px] hidden md:block">
                              - unproductive
                            </div>
                          ) : (
                            <div className="text-green-700 text-[10px] hidden md:block">
                              - productive
                            </div>
                          )}

                          {day.myDay?.broke_rules ? (
                            <div className="text-red-700 text-[10px] hidden md:block">
                              - undisciplined
                            </div>
                          ) : (
                            <div className="text-green-700 text-[10px] hidden md:block">
                              - disciplined
                            </div>
                          )}
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
        <div className="fixed w-full bottom-20 left-1/2 -translate-x-1/2 mt-4 max-w-80 mx-auto flex justify-between items-center">
          <button
            className="cursor-pointer p-2 rounded-md text-white bg-gray-400"
            onClick={() => setCurrentMonth(currentMonth - 1)}
            disabled={currentMonth <= 0}
          >
            <GrPrevious />
          </button>
          <span className="font-bold">{noToMonthMap[`${currentMonth}`]}</span>
          <button
            className="cursor-pointer p-2 rounded-md text-white bg-gray-400"
            onClick={() => setCurrentMonth(currentMonth + 1)}
            disabled={currentMonth >= 11}
          >
            <GrNext />
          </button>
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
