import { useState } from "react";
import { UniversalModal } from "@/components/Modal/UniversalModal";
import { attachment } from "@/helpers/Url";
import Button from "../button/Button";
import Calendar from "../Calendar";
import Oclock from "../Oclock";

interface MasterProps {
  id: string;
  attachmentId?: string;
  avatar?: string;
  name: string;
  salon?: string;
  role?: string;
  rating?: number;
  address?: string;
  price?: string;
  firstButtonTitle?: string;
  secondButtonTitle?: string;
  onClick?: () => void;
}

const Master: React.FC<MasterProps> = ({
  id,
  attachmentId,
  avatar,
  name,
  salon,
  role,
  rating = 5,
  address,
  price,
  firstButtonTitle,
  secondButtonTitle,
  onClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    if (onClick) onClick();
  };

  const handleAppointmentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <div 
      className="bg-[#B9B9C9] w-full rounded-2xl text-gray-800 shadow-lg overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      {attachmentId && (
        <div className="aspect-video overflow-hidden">
          <img
            src={attachment + attachmentId}
            alt={`${name}'s service`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center gap-3">
          {avatar && (
            <img
              src={avatar}
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <h3 className="font-medium text-base">
              {name}{salon && ` / `}<span className="font-normal">{salon}</span>
            </h3>
            {role && <p className="text-sm text-gray-600">{role}</p>}
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex text-[#9C0B35] text-lg">
            {[...Array(rating)].map((_, index) => (
              <span key={index}>★</span>
            ))}
          </div>

          {address && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="material-icons text-[#9C0B35]">location_on</span>
              <span>{address}</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Ближайшая запись: Сегодня
            </span>
            {price && <span className="text-[#9C0B35] font-medium">от {price}</span>}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          {firstButtonTitle && (
            <Button
              className="flex-1 bg-[#9C0B35] rounded-full py-2 px-4 text-sm text-white hover:bg-[#7c092a] transition-colors"
            >
              {firstButtonTitle}
            </Button>
          )}
          {secondButtonTitle && (
            <Button
              onClick={handleAppointmentClick}
              className="flex-1 bg-[#9C0B35] rounded-full py-2 px-4 text-sm text-white hover:bg-[#7c092a] transition-colors"
            >
              {secondButtonTitle}
            </Button>
          )}
        </div>
      </div>

      <UniversalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="p-4 bg-[#B9B9C9]">
          <div className="text-center">
            <h2 className="font-manrope font-extrabold text-[44px] ">Записаться</h2>
            <p className="font-manrope font-medium text-[30px] ">Сегодня четверг, 23 февраля</p>
          </div>
          <div className="flex items-start justify-center gap-20 p-10">
            <Calendar />
            <div>
              <h2 className="font-manrope  text-[26px]">Свободное время</h2>
              <Oclock />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
              onClick={() => alert("Скачать приложение")}
            >
              Записаться
            </Button>
          </div>
        </div>
      </UniversalModal>
    </div>
  );
};

export default Master;

