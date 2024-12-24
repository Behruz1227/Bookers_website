// components/Card.tsx
import React from "react";

interface CardProps {
  
  description: string; // Karta matni
}

const Card: React.FC<CardProps> = ({  description }) => {
  return (
    <div className="bg-inherit p-6 rounded-lg  max-w-sm">
      {/* SVG liniyasi */}
      <div className="mb-4">
        <svg
          width="46"
          height="11"
          viewBox="0 0 46 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_733_10844)">
            <rect
              x="4"
              width="38"
              height="3"
              fill="url(#paint0_linear_733_10844)"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_733_10844"
              x="0"
              y="0"
              width="46"
              height="11"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_733_10844"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_733_10844"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_733_10844"
              x1="4.68078"
              y1="0.233333"
              x2="44.0403"
              y2="-0.0539177"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FB7CA1" />
              <stop offset="1" stopColor="#9C0B35" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Karta matni */}
      <div>
      <p className="text-[#B9B9C9] text-[18px] leading-[30px]  font-manrope">
        {description}
      </p>
      </div>
    </div>
  );
};

export default Card;



///ishlatish

{/* <div className='flex justify-between  gap-3 container mx-auto'>
     <MasterCard
        description="Повышение лояльности аудитории — создание условий для укрепления связи с текущими клиентами и привлечения новых."
      />
      <MasterCard
        description="Увеличение узнаваемости бренда — активное продвижение вашего бренда через различные каналы, чтобы сделать его более известным и популярным."
      />
      <MasterCard
        description="Анализ и оптимизация ваших маркетинговых стратегий для достижения лучших результатов."
      />
 </div> */}