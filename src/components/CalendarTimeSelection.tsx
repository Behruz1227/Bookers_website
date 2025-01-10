import { useState, useEffect } from 'react';
import Button from './button/Button';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface CalendarTimeSelectionProps {
  masterId: string;
  onTimeSelect?: (date: string, time: string) => void;
}

export default function CalendarTimeSelection({ masterId, onTimeSelect }: CalendarTimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;

  useEffect(() => {
    if (selectedDate && masterId) {
      fetchAvailableTimeSlots();
    }
  }, [selectedDate, masterId]);

  const fetchAvailableTimeSlots = async () => {
    if (!selectedDate) return;

    setIsLoading(true);
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const response = await fetch(
        `http://207.154.246.120:8080/api/order/free-time?date=${formattedDate}&masterId=${masterId}`,
        {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTcwNzAzODM5LWNsaWVudCIsImlhdCI6MTczNjQwNTEzMCwiZXhwIjoxNzM4OTk3MTMwfQ.C8D_JNaqmeYsn2PIAJNoaQdOSyhupxQn5B-x0iBXr3foG5K8eIliYm4aPcUtPQpHm9wHsbf-j7EeB3OrMuPIjQ'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAvailableTimeSlots(data.body || []);
    } catch (error) {
      console.error('Error fetching available time slots:', error);
      setAvailableTimeSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleDateSelect = (date: number) => {
    const newDate = new Date(currentYear, currentMonth, date);
    setSelectedDate(newDate);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate && onTimeSelect) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      onTimeSelect(formattedDate, time);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Calendar Section */}
      <div className="w-[534.22px] bg-[#B1B1C2] rounded-[20px] shadow-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => changeMonth(-1)}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            &#8249;
          </button>
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-900">
              {monthNames[currentMonth]}
            </h2>
            <span className="text-sm text-gray-500">{currentYear}</span>
          </div>
          <button
            onClick={() => changeMonth(1)}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            &#8250;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className={`text-center text-sm font-medium mb-4 ${
                index >= 5 ? "text-[#9C0B35]" : "text-gray-600"
              }`}
            >
              {day}
            </div>
          ))}

          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-10" />
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const date = new Date(currentYear, currentMonth, day);
            const isSelected = selectedDate?.getDate() === day && 
                             selectedDate?.getMonth() === currentMonth && 
                             selectedDate?.getFullYear() === currentYear;
            const dayIndex = (date.getDay() + 6) % 7;
            const isWeekend = dayIndex === 5 || dayIndex === 6;

            return (
              <div
                key={day}
                onClick={() => handleDateSelect(day)}
                className={`
                  h-10 flex items-center justify-center text-sm cursor-pointer
                  transition-colors duration-200 rounded-full
                  ${isSelected 
                    ? "bg-[#9C0B35] text-white" 
                    : "hover:bg-[#9C0B35] hover:text-white"
                  }
                  ${isWeekend && !isSelected ? "text-[#9C0B35]" : "text-gray-900"}
                `}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Slots Section */}
      <div className="w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          {selectedDate ? formatDate(selectedDate) : 'Выберите дату'}
        </h2>
        
        {selectedDate && (
          <div className="bg-[#B1B1C2] rounded-[20px] p-6">
            <h3 className="text-lg font-medium mb-4 text-gray-900">
              Свободное время
            </h3>
            
            {isLoading ? (
              <div className="text-center py-4">Загрузка...</div>
            ) : availableTimeSlots.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {availableTimeSlots.map((time) => (
                  <Button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`py-2 px-4 rounded-[5px] text-center transition-colors ${
                      selectedTime === time
                        ? 'bg-[#9C0B35] text-white'
                        : 'bg-white hover:bg-[#9C0B35] hover:text-white text-gray-900'
                    }`}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-600">
                Нет свободного времени на выбранную дату
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}