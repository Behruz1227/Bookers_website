import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [events, setEvents] = useState<any[]>([]); // API ma'lumotlari uchun
  const [loading, setLoading] = useState<boolean>(false);

  const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
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

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;

  // API ma'lumotlarini olish
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://your-api-endpoint.com/events"); // API endpointi
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("API xatosi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(); // komponent yuklanganda API ma'lumotlarini olish
  }, [currentMonth, currentYear]);

  const changeMonth = (direction: number) => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth + direction;
      if (newMonth < 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      } else if (newMonth > 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return newMonth;
    });
  };

  const toggleDate = (date: number) => {
    setSelectedDate((prev) => {
      const newSelectedDate = prev === date ? null : date;
      console.log("Selected Date:", newSelectedDate); // Konsolga chiqarish
      return newSelectedDate;
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[366px] h-[380px] bg-white rounded-lg shadow-md p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => changeMonth(-1)}
            className="text-gray-500 hover:text-gray-700"
          >
            &#8249;
          </button>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800">
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

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className={`text-center text-sm font-bold uppercase ${
                index === 5 || index === 6 ? "text-[#9C0B35]" : "text-gray-700"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty blocks for days before the first day of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {/* Render days */}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const dayIndex =
              (new Date(currentYear, currentMonth, day).getDay() + 6) % 7;
            const isWeekend = dayIndex === 5 || dayIndex === 6;
            const hasEvent = events.some(
              (event) => new Date(event.date).getDate() === day
            );

            return (
              <div
                key={day}
                onClick={() => toggleDate(day)}
                className={`flex justify-center items-center cursor-pointer rounded-md text-sm font-medium w-9 h-9 transition-colors ${
                  selectedDate === day
                    ? "bg-[#9C0B35] text-white"
                    : "hover:bg-blue-100"
                } ${isWeekend ? "text-[#9C0B35]" : "text-gray-700"} ${
                  hasEvent ? "border-2 border-blue-500" : ""
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
        {/* Loading spinner */}
        {loading && <div className="text-center text-blue-500">Loading...</div>}
      </div>
    </div>
  );
};

export default App;
