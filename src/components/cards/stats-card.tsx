import React from 'react';
import { Card } from 'antd';

// Define the props interface for the StatsCard component
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
        w-[278px] h-[140px] 
        rounded-[20px] 
        text-[#ffffff] 
        flex
        items-center 
        justify-center
        ${className}
      `}
    >
      <div className="flex items-center justify-center gap-8">
        <div className="text-text-[#ffffff]">
          {icon}
        </div>
        <div className="flex flex-col ">
          <span
            className="text-[40px] font-extrabold text-[#ffffff]"
            style={{ lineHeight: '56px', fontFamily: 'Manrope, sans-serif' }}
          >
            {count.toLocaleString()}
          </span>
          <span
            className="text-[20px] font-normal text-[#ffffff]"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            {title}
          </span>
        </div>
      </div>
    </Card>
  );
};
