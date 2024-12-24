import { useState } from "react";

function Oclock() {
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const timeSlots = [
        '08:00', '08:30', '09:00', '09:30',
        '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30',
    ];

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        console.log(`Selected time: ${time}`);
    };

    return (
        <div className="p-6 bg-slate-200 rounded-xl max-w-lg mx-auto">
            <h1 className="text-2xl font-medium mb-6 text-slate-800">Свободное время</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {timeSlots.map((time) => (
                    <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`py-2 px-4 rounded-[5px] text-center transition-colors ${
                            selectedTime === time
                                ? 'bg-[#9C0B35] text-white'
                                : 'bg-white hover:bg-blue-50 text-slate-700'
                        }`}
                    >
                        {time}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Oclock;
