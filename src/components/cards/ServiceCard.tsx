interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    className?: string;
  }
  
  export function ServiceCard({ icon, title, description, className = '' }: ServiceCardProps) {
    return (
      <div className={`rounded-lg ${className}`}>
        <div className="bg-gradient-to-b bg-inherit text-white p-6 rounded-lg transition-transform ">
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
  
  


  //ishlatilishi 
//   <ServiceCard
//   icon={<svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M20 7.5v9l-5-2.5v2.5l-5-2.5v2.5l-5-2.5v-9l5 2.5v-2.5l5 2.5v-2.5l5 2.5z" />
//   </svg>}
//   title="Парикмахерские услуги"
//   description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat."
//    />