import React, { useState } from "react";
import db from "../data/db.json";
import Button from "./button/Button";

const StandartPlan: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-900 text-white  shadow-2xl w-full max-w-4xl">

      <div className="bg-gradient-to-r from-pink-500 to-red-700 text-white rounded-1`xl shadow-md p-4 sm:p-6 text-center">
        <h1 className="text-lg sm:text-xl font-bold">STANDART</h1>
       <div className="flex justify-around mt-4 text-sm sm:text-base">
       <span>10 дней - 100 000 сум</span>
      <span>Месяц - 450 000 сум</span>
       <span>Год - 3 000 000 сум</span>
      </div>
    </div>


        <div className="p-6 sm:p-8 space-y-3 bg-[#B9B9C9]">
  {db.data.map((feature, index) => (
    <div
      key={index}
      className="bg-gray-900 rounded-lg overflow-hidden mb-2"
    >
      <div
        className="p-4 sm:p-5 text-white flex justify-center items-center cursor-pointer hover:text-gray-500 relative"
        onClick={() => toggleAccordion(index)}
      >
        <span className="text-lg sm:text-xl font-semibold text-center">
          {feature.title}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-400 absolute right-4 transition-transform ${
            openAccordion === index ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {openAccordion === index && (
        <div className="p-4 bg-white text-black text-sm sm:text-base">
          <p>{feature.content}</p>
        </div>
      )}
    </div>
  ))}
        </div>


        <div className="flex flex-col sm:flex-row justify-between gap-4 p-6 sm:p-8 border-none bg-[#B9B9C9]">
          <Button className="px-6 py-3 text-sm sm:text-base bg-transparent text-pink-600 border-pink-600 border-[1px] rounded-full">
            Скачать приложение
          </Button>

          <Button className="px-6 py-3 text-sm sm:text-base bg-pink-600 text-white border-none rounded-full">
            Оформить подписку
          </Button>
        </div>

      </div>
    </div>
  );
};

export default StandartPlan;
