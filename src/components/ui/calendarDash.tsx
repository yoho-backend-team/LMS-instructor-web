import { useState } from "react";
import { Button } from "./button";
import { Card, CardContent, CardTitle } from "./card";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const DashCalender = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const weeks: (number | null)[][] = [];
    let day = 1;
    for (let i = 0; i < 6; i++) {
      const week: (number | null)[] = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > totalDays) {
          week.push(null);
        } else {
          week.push(day++);
        }
      }
      weeks.push(week);
    }

    return weeks;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  const calendarData = getDaysInMonth(currentYear, currentMonth);

  return (
    <div>
      <Card className="flex flex-col w-full h-[426px] items-start gap-2.5 p-5 bg-[#ebeff3] rounded-2xl shadow-[4px_4px_8px_#bdc2c7bf,8px_8px_12px_#bdc2c740,-4px_-4px_8px_#ffffffbf,-8px_-8px_12px_#ffffff40]">
        <CardContent className="flex flex-col w-full items-start gap-5 p-0">
          <CardTitle className="font-bold text-dark text-xl">
            Calendar
          </CardTitle>

          <div className="flex flex-col items-start gap-5 w-full">
            {/* Header: Month navigation */}
            <div className="flex items-center justify-between w-full">
              <Button
                variant="ghost"
                className="p-0 h-6 w-6"
                onClick={handlePreviousMonth}
                aria-label="Previous month"
              >
                <img
                  className="w-6 h-6"
                  alt="Previous month"
                  src="https://c.animaapp.com/mck68j5cT59wYP/img/vuesax-linear-arrow-square-left.svg"
                />
              </Button>

              <div className="text-lg font-bold text-center w-[228px]">
                {months[currentMonth]} {currentYear}
              </div>

              <Button
                variant="ghost"
                className="p-0 h-6 w-6"
                onClick={handleNextMonth}
                aria-label="Next month"
              >
                <img
                  className="w-6 h-6"
                  alt="Next month"
                  src="https://c.animaapp.com/mck68j5cT59wYP/img/vuesax-linear-arrow-square-right.svg"
                />
              </Button>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-x-2.5 w-full text-center">
              {daysOfWeek.map((day, index) => (
                <div
                  key={`dow-${index}`}
                  className="text-[10px] font-semibold tracking-[1.5px] text-[#2a2a2a]"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-y-2.5 w-full text-center">
              {calendarData.flat().map((day, index) => {
                const isToday =
                  day === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear();

                return (
                  <div
                    key={`day-${index}`}
                    className={`h-8 w-8 flex items-center justify-center rounded-full transition ${isToday
                      ? "bg-[linear-gradient(135deg,rgba(123,0,255,1)_0%,rgba(178,0,255,1)_100%)] text-white font-bold"
                      : day
                        ? "text-[#706f6f] text-sm font-medium hover:bg-gray-200"
                        : "text-transparent"
                      }`}
                  >
                    {day || ""}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashCalender;
