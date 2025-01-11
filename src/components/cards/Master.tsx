'use client'

import { useState } from "react"
import { Rate } from "antd"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { UniversalModal } from "@/components/Modal/UniversalModal"
import { attachment } from "@/helpers/Url"
import Button from "@/components/button/Button"
import CalendarTimeSelection from "@/components/CalendarTimeSelection"

interface MasterProps {
  id: string
  attachmentId?: string
  avatar?: string
  name: string
  salon?: string
  role?: string
  feedbackCount?: number
  orderCount?: number
  clientCount?: number
  address?: string
  masterServicePrice?: string
  firstButtonTitle?: string
  secondButtonTitle?: string
  onProfileClick?: () => void
  mainPhoto?: string
}

export default function MasterCard({
  id,
  attachmentId,
  avatar,
  name,
  salon,
  role,
  feedbackCount ,
  orderCount = 0,
  clientCount = 0,
  address,
  masterServicePrice,
  firstButtonTitle = "Профиль",
  secondButtonTitle = "Записаться",
  onProfileClick,
  mainPhoto,
}: MasterProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: string; time: string } | null>(null)

  const handleAppointmentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const handleTimeSelect = (date: string, time: string) => {
    setSelectedDateTime({ date, time })
  }


  const imageUrl = attachmentId ? attachment + attachmentId : mainPhoto ? attachment + mainPhoto : null
  const rating = typeof feedbackCount === 'number' ? feedbackCount : 0;
  console.log(name,feedbackCount);
  console.log(rating);
  
  return (
    <div className="bg-[#B9B9C9] w-full rounded-[20px] text-gray-800 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-4">
        {imageUrl && (
          <div className="relative pb-[56.25%]">
            <img
              src={imageUrl}
              alt={`${name}'s service`}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-[20px]"
            />
          </div>
        )}
        
        <div className="flex items-center gap-4 mt-4 mb-3">
          {avatar && (
            <img
              src={attachment + avatar}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
            />
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold font-manrope  text-[24px]">{name}</h3>
              {salon && (
                <>
                  <span className="font-manrope font-bold text-[24px]">/</span>
                  <span className="font-manrope font-medium text-[24px]">{salon}</span>
                </>
              )}
            </div>
            {role && <p className="font-manrope font-medium text-[16px] text-[#4F4F4F]">{role}</p>}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-3">
            <Rate 
              disabled 
              value={feedbackCount} 
              className="text-[#9C0B35] text-lg" 
            />
            <span className="font-manrope font-medium text-[16px] text-[#4F4F4F]">
              {orderCount} заказа, {clientCount} клиентов
            </span>
          </div>

          {address && (
            <div className="flex items-center gap-2">
              <HiOutlineLocationMarker className="text-[#9C0B35] w-5 h-5 flex-shrink-0" />
              <span className="font-manrope font-medium text-[16px] text-[#4F4F4F]">{address}</span>
            </div>
          )}

          <div className="flex justify-between items-center py-3">
            <span className="font-medium font-manrope text-[22px]">
              Ближайшая запись: Сегодня
            </span>
            {masterServicePrice && (
              <span className="text-[#9C0B35] font-semibold text-lg">
                от {masterServicePrice} 
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <Button
            onClick={onProfileClick}
            className="flex-1 bg-[#9C0B35] rounded-[40px] py-3 px-6 text-base font-medium text-white hover:bg-[#7d092a] transition-colors"
          >
            {firstButtonTitle}
          </Button>
          <Button
            onClick={handleAppointmentClick}
            className="flex-1 bg-[#9C0B35] rounded-[40px] py-3 px-6 text-base font-medium text-white hover:bg-[#7d092a] transition-colors"
          >
            {secondButtonTitle}
          </Button>
        </div>
      </div>

      <UniversalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="p-6 bg-[#B9B9C9] rounded-[20px] ">
          <div className="text-center mb-6 ">
            <h2 className="font-manrope font-extrabold text-4xl text-gray-900 mb-2">
              Записаться к мастеру
            </h2>
            
          </div>
          <div >
            <div>
            <CalendarTimeSelection 
              masterId={id}
              onTimeSelect={handleTimeSelect}
            />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              className="w-full max-w-md h-16 rounded-[40px] bg-[#9C0B35] text-white font-bold text-lg hover:bg-[#7d092a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => alert("Скачать приложение")}
              disabled={!selectedDateTime}
            >
              {selectedDateTime ? 'Записаться' : 'Выберите дату и время'}
            </Button>
          </div>
        </div>
      </UniversalModal>
    </div>
  )
}

