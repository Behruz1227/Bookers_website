import { attachment } from '@/helpers/Url';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  attachmentId: string;
  title: string;
  description: string;
  className?: string;
  id: string; // Add id prop for navigation
}

export function ServiceCard({
  attachmentId,
  title,
  description,
  className = "",
  id,
}: ServiceCardProps) {
  return (
    <div className={`rounded-lg ${className}`}>
      <Link
        to={`/Services/${id}`}
        className="bg-gradient-to-b bg-inherit text-white  rounded-lg transition-transform block hover:scale-105"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#9B1B47] flex items-center justify-center">
            <img
              src={attachment + attachmentId}
              alt={title}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h3 className="text-[24px] font-bold font-manrope text-[#D9E3EA] leading-[34px]">
            {title}
          </h3>
          <p className="text-[#B9B9C9] text-[18px] font-manrope font-normal leading-[27px] tracking-[-0.25px]">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}