import React from 'react';
import { Card } from 'antd';

interface StatsCardProps {
  icon: React.ReactNode;
  count: number;
  title: string;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  count,
  title,
  className = '',
}) => {
  return (
    <Card
      className={`
        bg-[#9C0B35] 
        transition-colors 
        duration-300 
        cursor-pointer 
        border-none 
        shadow-lg 
        w-full  
        rounded-3xl
        text-[#ffffff] 
        
        ${className}
      `}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5">
        {/* Icon container */}
        <div className="text-[#ffffff] text-4xl sm:text-5xl flex justify-center sm:justify-start">
          {icon}
        </div>
        
        {/* Text container */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <span
            className="text-[40px] font-extrabold text-[#ffffff] leading-[56px] font-manrope"
          >
            {count}
          </span>
          <span
            className="text-[20px] font-normal text-[#ffffff] font-manrope"
          >
            {title}
          </span>
        </div>
      </div>
    </Card>
  );
};
