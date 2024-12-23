import React, { useState } from "react";

const TimePicker: React.FC = () => {
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);

  const hours = [1, 2, 3];
  const minutes = [5, 10, 15, 30, 45];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-[#B1B1C2] rounded-lg shadow-lg p-6 w-[315px] h-[297px]">
        <div className="grid grid-cols-2 gap-4">
          {/* Hour Selection */}
          <div>
            <div className="space-y-2">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className={`w-full text-center py-2 cursor-pointer rounded-md text-sm font-medium transition-colors duration-300 border ${
                    selectedHour === hour
                      ? "bg-[#9C0B35] text-white border-[#9C0B35]"
                      : " text-gray-700 border-none"
                  }`}
                  onClick={() => setSelectedHour(hour)}
                >
                  {hour} ч.
                </div>
              ))}
            </div>
          </div>

          {/* Minute Selection */}
          <div>
            <div className="space-y-2">
              {minutes.map((minute) => (
                <div
                  key={minute}
                  className={`w-full text-center py-2 cursor-pointer rounded-md text-sm font-medium transition-colors duration-300 border ${
                    selectedMinute === minute
                      ? "bg-[#9C0B35] text-white border-[#9C0B35]"
                      : " text-gray-700 border-none"
                  }`}
                  onClick={() => setSelectedMinute(minute)}
                >
                  {minute} мин.
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Time Display */}
        {/* <div className="mt-6 text-center">
          <h3 className="text-lg font-medium text-gray-700">
            {selectedHour !== null && selectedMinute !== null
              ? `Выбрано: ${selectedHour} ч. ${selectedMinute} мин.`
              : "Выберите время"}
          </h3>
        </div> */}
      </div>
    </div>
  );
};

export default TimePicker;
