import { useGlobalRequest } from "@/helpers/Quary/quary";
import { attachment } from "@/helpers/Url";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  attachmentId: string;
  title: string;
  description: string;
  className?: string;
  link?: string;
}

export function ServiceCard({
  attachmentId,
  title,
  description,
  className = "",
  link,
}: ServiceCardProps) {
  return (
    <div className={`rounded-lg ${className}`}>
      <Link
        to={link || "#"}
        className="bg-gradient-to-b bg-inherit text-white p-6 rounded-lg transition-transform "
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

// Dinamik render qilish uchun asosiy komponent
export function ServicesList() {
  const { loading, error, response, globalDataFunc } = useGlobalRequest(
    "http://207.154.246.120:8080/api/category",
    "GET"
  );

  useEffect(() => {
    globalDataFunc();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const data = response?.body || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item: any) => (
        <ServiceCard
          key={item.id}
          attachmentId={item.attachmentId}
          title={item.name}
          description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat."
        />
      ))}
    </div>
  );
}
