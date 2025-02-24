import {useState, useEffect} from "react"
import Button from "./button/Button"
import {BASE_URL} from "@/helpers/Url"
import {useTranslation} from "react-i18next"

interface CalendarTimeSelectionProps {
    masterId: string | number | undefined
    onTimeSelect?: (date: string, time: string) => void
    isNotToken?: boolean
}

export default function CalendarTimeSelection({masterId, onTimeSelect, isNotToken}: CalendarTimeSelectionProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const today = new Date()
    const {t} = useTranslation()

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
        if (selectedDate && masterId) fetchAvailableTimeSlots()
    }, [selectedDate, masterId])

    const fetchAvailableTimeSlots = async () => {
        if (!selectedDate) return

        setIsLoading(true)
        try {
            const Token = localStorage.getItem("Token")
            if (!isNotToken) {
                if (!Token) {
                    throw new Error("No authentication token found")
                }
            }

            const formattedDate = selectedDate.toISOString().split("T")[0]
            const formattedDateNew = `${formattedDate.split('-')[0]}-${formattedDate.split('-')[1]}-${+formattedDate.split('-')[2] + 1}`

            const response = await fetch(`${BASE_URL}/api/order/web/free-time?date=${formattedDateNew}&masterId=${masterId}`, {
                method: "GET",
                // headers: {
                //     Accept: "*/*",
                //     Authorization: `Bearer ${Token}`,
                // },
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
        const language = localStorage.getItem("i18nextLng") || "en"
        const options: Intl.DateTimeFormatOptions = {weekday: "long", day: "numeric", month: "long"}

        return new Intl.DateTimeFormat(language, options).format(date)
    }

    const formatCurrentDate = () => {
        const today = new Date()
        const language = localStorage.getItem("i18nextLng") || "en"

        // Format date without the day of week first
        const dateFormatter = new Intl.DateTimeFormat(language, {
            day: "numeric",
            month: "long",
        })

        // Get day of week separately
        const weekdayFormatter = new Intl.DateTimeFormat(language, {
            weekday: "long",
        })

        const date = dateFormatter.format(today)
        const weekday = weekdayFormatter.format(today)

        // Use translation for "Today" word
        const todayWord = t("today")

        return `${todayWord} ${weekday}, ${date}`
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 flex justify-center text-gray-900">
                {selectedDate ? formatDate(selectedDate) : formatCurrentDate()}
            </h2>
            <div
                className="flex flex-col lg:flex-row justify-center items-start gap-4 sm:gap-6 w-full max-w-6xl mx-auto px-3 sm:px-4">
                {/* Calendar Section */}
                <div className="w-full max-w-[534px] bg-[#B1B1C2] rounded-[20px] shadow-lg p-3 sm:p-4 md:p-6">
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

                    <div className="grid grid-cols-7 gap-1 text-xs sm:text-sm">
                        {daysOfWeek.map((day, index) => (
                            <div
                                key={index}
                                className={`text-center text-sm font-medium mb-4 ${index >= 5 ? "text-[#9C0B35]" : "text-gray-600"}`}
                            >
                                {day}
                            </div>
                        ))}

                        {Array.from({length: firstDayOfMonth}).map((_, index) => (
                            <div key={`empty-${index}`} className="h-10"/>
                        ))}

                        {Array.from({length: daysInMonth}, (_, i) => i + 1).map((day) => {
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
                    h-8 sm:h-10 w-8 sm:w-10 flex items-center justify-center text-xs sm:text-sm cursor-pointer
                    transition-colors duration-200
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
                <div className="w-full lg:max-w-lg">
                    {selectedDate && (
                        <div className="rounded-[20px] ">
                            <div className="flex flex-col items-center lg:items-start w-full">
                                <h3 className="text-lg font-medium mb-4 text-gray-900">{t("Свободное время")}</h3>

                                {isLoading ? (
                                    <div className="text-center py-4">{t("Loading")}...</div>
                                ) : errorMessage ? (
                                    <div className="text-center py-4 text-red-600">{errorMessage}</div>
                                ) : availableTimeSlots.length > 0 ? (
                                    <div
                                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 w-full">
                                        {availableTimeSlots.map((time) => (
                                            <Button
                                                key={time}
                                                onClick={() => handleTimeSelect(time)}
                                                className={`py-2 px-2 rounded-[5px] text-center transition-colors text-sm w-full ${
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

