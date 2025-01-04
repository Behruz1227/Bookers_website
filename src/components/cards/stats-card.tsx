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
        w-full sm:w-[278px] 
        h-[140px] 
        rounded-[20px] 
        text-[#ffffff] 
        flex
        items-center 
        justify-center
        ${className}
      `}
    >
      <div className="flex justify-between gap-5 items-center">
        <div className="text-[#ffffff]">
          {icon}
        </div>
        <div className="flex flex-col">
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
