import React, { useState } from "react";

const CalendarSingleSelect: React.FC = () => {
  const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(1); // 0 = January, 1 = February, etc.
  const [currentYear, setCurrentYear] = useState<number>(2024);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const toggleDate = (date: number) => {
    setSelectedDate((prev) => (prev === date ? null : date));
  };

  const changeMonth = (direction: number) => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth + direction;
      if (newMonth < 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11; // December
      } else if (newMonth > 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0; // January
      }
      return newMonth;
    });
  };

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div
        className="rounded-lg shadow-lg p-4 text-center"
        style={{
          width: "365.78px",
          height: "340px",
          backgroundColor: "#B1B1C2",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => changeMonth(-1)}
            className="text-gray-500 hover:text-gray-700"
          >
            &#8249;
          </button>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              {monthNames[currentMonth]}
            </h2>
            <span className="text-sm text-gray-500">{currentYear}</span>
          </div>
          <button
            onClick={() => changeMonth(1)}
            className="text-gray-500 hover:text-gray-700"
          >
            &#8250;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className={`text-sm font-medium text-center uppercase ${
                index === 5 || index === 6 ? "text-[#9C0B35]" : "text-gray-600"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const dayIndex = (new Date(currentYear, currentMonth, day).getDay() + 6) % 7; // Get day index (0 = Monday, ..., 6 = Sunday)
            const isWeekend = dayIndex === 5 || dayIndex === 6; // Check if Saturday or Sunday
            const isActive = selectedDate === day; // Check if day is active

            return (
              <div
                key={day}
                className={`flex justify-center items-center cursor-pointer rounded-md text-xs font-medium w-9 h-9 ${
                  isWeekend
                    ? isActive
                      ? "bg-[#9C0B35] text-white" // Active weekend
                      : "text-[#9C0B35]"
                    : isActive
                    ? "bg-[#9C0B35] text-white" // Active weekday
                    : "text-gray-700 hover:text-gray-800"
                }`}
                onClick={() => toggleDate(day)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarSingleSelect;
