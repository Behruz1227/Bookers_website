interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    className?: string;
  }
  
  export function ServiceCard({ icon, title, description, className = '' }: ServiceCardProps) {
    return (
      <div className={`rounded-lg ${className}`}>
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 rounded-lg transition-transform ">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#9B1B47] flex items-center justify-center">
              {icon}
            </div>
            <h3 className="text-[24px] font-bold font-manrope">{title}</h3>
            <p className="text-[#B9B9C9] text-[18px] font-manrope leading-[27px]">{description}</p>
          </div>
        </div>
      </div>
    )
  }
  
  