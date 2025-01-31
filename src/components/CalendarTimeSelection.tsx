import { useState, useEffect } from "react"
import Button from "./button/Button"
import { BASE_URL } from "@/helpers/Url"
import { useTranslation } from "react-i18next"

interface TimeSlot {
  time: string
  available: boolean
}

interface CalendarTimeSelectionProps {
  masterId: string
  onTimeSelect?: (date: string, time: string) => void
}

export default function CalendarTimeSelection({ masterId, onTimeSelect }: CalendarTimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const today = new Date()
  const { t } = useTranslation()

  const daysOfWeek = [t("du"), t("se"), t("ch"), t("pa"), t("ju"), t("sha"), t("yak")]
  const monthNames = [
    t("yanvar"),
    t("fevral"),
    t("mart"),
    t("aprel"),
    t("may"),
    t("iyun"),
    t("iyul"),
    t("avgust"),
    t("sentyabr"),
    t("oktyabr"),
    t("noyabr"),
    t("dekabr"),
  ]

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7

  useEffect(() => {
    if (selectedDate && masterId) {
      fetchAvailableTimeSlots()
    }
  }, [selectedDate, masterId])

  const fetchAvailableTimeSlots = async () => {
    if (!selectedDate) return

    setIsLoading(true)
    try {
      const Token = localStorage.getItem("Token")
      if (!Token) {
        throw new Error("No authentication token found")
      }

      const formattedDate = selectedDate.toISOString().split("T")[0]
      const response = await fetch(`${BASE_URL}/api/order/free-time?date=${formattedDate}&masterId=${masterId}`, {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${Token}`,
        },
      })

      if (response.status === 401) {
        throw new Error("Unauthorized: Please log in again")
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setAvailableTimeSlots(data.body || [])
    } catch (error) {
      console.error("Error fetching available time slots:", error)
      setAvailableTimeSlots([])
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

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

  const handleDateSelect = (date: number) => {
    const newDate = new Date(currentYear, currentMonth, date)
    setSelectedDate(newDate)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    if (selectedDate && onTimeSelect) {
      const formattedDate = selectedDate.toISOString().split("T")[0]
      onTimeSelect(formattedDate, time)
    }
  }

  const formatDate = (date: Date) => {
    const language = localStorage.getItem("i18nextLng")
    const localeMap = {
      uz: "uz-UZ",
      ru: "ru-RU",
      en: "en-US",
    }

    return date.toLocaleDateString(localeMap[language as keyof typeof localeMap], {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  }

  const formatCurrentDate = () => {
    const today = new Date()
    const language = localStorage.getItem("i18nextLng")
    const localeMap = {
      uz: "uz-UZ",
      ru: "ru-RU",
      en: "en-US",
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    }

    const formatter = new Intl.DateTimeFormat(localeMap[language as keyof typeof localeMap], options)
    const parts = formatter.formatToParts(today)

    const weekday = parts.find((part) => part.type === "weekday")?.value || ""
    const day = parts.find((part) => part.type === "day")?.value || ""
    const month = parts.find((part) => part.type === "month")?.value || ""

    if (language === "ru") {
      return `Сегодня ${weekday}, ${day} ${month}`
    } else if (language === "uz") {
      return `Bugun ${weekday}, ${day} ${month}`
    } else {
      return `Today ${weekday}, ${month} ${day}`
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex justify-center text-gray-900">
        {selectedDate ? formatDate(selectedDate) : formatCurrentDate()}
      </h2>
      <div className="flex justify-center">
        {/* Calendar Section */}
        <div className="w-[534.22px] bg-[#B1B1C2] rounded-[20px] shadow-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => changeMonth(-1)}
              className="w-6 h-6 flex items-center justify-center text-gray-800 hover:text-gray-900"
            >
              &#8249;
            </button>
            <div className="text-center">
              <h2 className="text-xl font-medium text-gray-900">{monthNames[currentMonth]}</h2>
              <span className="text-sm text-gray-800">{currentYear}</span>
            </div>
            <button
              onClick={() => changeMonth(1)}
              className="w-6 h-6 flex items-center justify-center text-gray-800 hover:text-gray-900"
            >
              &#8250;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                className={`text-center text-sm font-medium mb-4 ${index >= 5 ? "text-[#9C0B35]" : "text-gray-600"}`}
              >
                {day}
              </div>
            ))}

            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="h-10" />
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const date = new Date(currentYear, currentMonth, day)
              const isSelected =
                selectedDate?.getDate() === day &&
                selectedDate?.getMonth() === currentMonth &&
                selectedDate?.getFullYear() === currentYear
              const dayIndex = (date.getDay() + 6) % 7
              const isWeekend = dayIndex === 5 || dayIndex === 6
              const isPastDate = date < new Date(today.getFullYear(), today.getMonth(), today.getDate())

              return (
                <div
                  key={day}
                  onClick={() => !isPastDate && handleDateSelect(day)}
                  className={`
                    h-10 flex items-center justify-center text-sm cursor-pointer
                    transition-colors duration-200 rounded-full
                    ${
                      isSelected
                        ? "bg-[#9C0B35] text-white"
                        : isPastDate
                          ? "text-gray-400 cursor-not-allowed"
                          : "hover:bg-[#9C0B35] hover:text-white"
                    }
                    ${isWeekend && !isSelected ? "text-[#9C0B35]" : "text-gray-900"}
                  `}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </div>

        {/* Time Slots Section */}
        <div className="w-full max-w-lg">
          {selectedDate && (
            <div className="rounded-[20px] p-6">
              <h3 className="text-lg font-medium mb-4 text-gray-900">{t("Свободное время")}</h3>

              {isLoading ? (
                <div className="text-center py-4">{t("Loading")}...</div>
              ) : errorMessage ? (
                <div className="text-center py-4 text-red-600">{errorMessage}</div>
              ) : availableTimeSlots.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                  {availableTimeSlots.map((time) => (
                    <Button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`py-2 px-4 rounded-[5px] text-center transition-colors ${
                        selectedTime === time
                          ? "bg-[#9C0B35] text-white"
                          : "bg-white hover:bg-[#9C0B35] hover:text-white text-gray-900"
                      }`}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-600">{t("noFreeTime")}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

