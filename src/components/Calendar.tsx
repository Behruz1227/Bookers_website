"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

interface CalendarData {
  // Add API response type here when available
  dates?: Date[]
}

export default function Calendar() {
  const { t } = useTranslation()
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null)

  const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
  const monthNames = [
    t("yanvar"),
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
  ]

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const localDate = new Date(currentYear, currentMonth, 1)
        const endDate = new Date(currentYear, currentMonth + 1, 0)

        const params = new URLSearchParams({
          localDate: localDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
          isMonth: "true",
        })

        const response = await fetch(`/api/workday/time/web/calendar?${params}`)
        const data = await response.json()
        setCalendarData(data)
      } catch (error) {
        console.error("Error fetching calendar data:", error)
      }
    }

    fetchCalendarData()
  }, [currentMonth, currentYear])

  const changeMonth = (direction: number) => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth + direction
      if (newMonth < 0) {
        setCurrentYear((prevYear) => prevYear - 1)
        return 11
      } else if (newMonth > 11) {
        setCurrentYear((prevYear) => prevYear + 1)
        return 0
      }
      return newMonth
    })
  }

  const toggleDate = (date: number) => {
    setSelectedDate(date === selectedDate ? null : date)
  }

  return (
    <div className="">
      <div className="w-[534.22px] h-[451.3px] bg-[#B1B1C2] rounded-[20px] shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => changeMonth(-1)}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            &#8249;
          </button>
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-900">{monthNames[currentMonth]}</h2>
            <span className="text-sm text-gray-500">{currentYear}</span>
          </div>
          <button
            onClick={() => changeMonth(1)}
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            &#8250;
          </button>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Weekday headers */}
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className={`text-center text-sm font-medium mb-4 ${index >= 5 ? "text-[#9C0B35]" : "text-gray-600"}`}
            >
              {day}
            </div>
          ))}

          {/* Empty cells */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-10" />
          ))}

          {/* Date cells */}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const dayIndex = (new Date(currentYear, currentMonth, day).getDay() + 6) % 7
            const isWeekend = dayIndex === 5 || dayIndex === 6
            const currentDate = new Date()
            const cellDate = new Date(currentYear, currentMonth, day)
            const isPastDate = cellDate < new Date(currentDate.setHours(0, 0, 0, 0))

            const textColorClass = isPastDate ? "text-gray-400" : isWeekend ? "text-[#9C0B35]" : "text-gray-900"

            return (
              <div
                key={day}
                onClick={() => toggleDate(day)}
                className={`
                  h-10 flex items-center justify-center text-sm cursor-pointer
                  transition-colors duration-200 rounded-full
                  ${selectedDate === day ? "bg-[#9C0B35] text-white" : "hover:bg-[#9C0B35] hover:text-white"}
                  ${textColorClass}
                `}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

