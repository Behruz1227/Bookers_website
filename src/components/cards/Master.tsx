'use client'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react"
import { Input, Rate } from "antd"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { UniversalModal } from "@/components/Modal/UniversalModal"
import { attachment, BASE_URL } from "@/helpers/Url"
import Button from "@/components/button/Button"
import CalendarTimeSelection from "@/components/CalendarTimeSelection"
import { useGlobalRequest } from "@/helpers/Quary/quary"

interface MasterProps {
  id: string
  serviceId?: string // Add serviceId prop
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
  masterId?: string // Add masterId prop
}

export default function MasterCard({
  id,
  serviceId, // Add serviceId to props
  attachmentId,
  avatar,
  name,
  salon,
  role,
  feedbackCount,
  orderCount = 0,
  clientCount = 0,
  address,
  masterServicePrice,
  firstButtonTitle = "Профиль",
  secondButtonTitle = "Записаться",
  onProfileClick,
  mainPhoto,
  masterId, // Add masterId to props
}: MasterProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: string; time: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>('null')
  const [page, setPage] = useState<number | null>(1)
  const [otpCodeInput, setOtpCodeInput] = useState<string | null>(null)
  const [loginCheck, setLoginCheck] = useState<boolean | null>(null)
  const [checkCode, setCheckCode] = useState<boolean | null>(null)


  const roleGet = localStorage.getItem("Role")
  const handleAppointmentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(true)
    setErrorMessage(null)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setPage(1)
  }
  const phoneNumber = localStorage.getItem("phoneNumber")
  const { response, globalDataFunc, error } = useGlobalRequest(`${BASE_URL}/api/order/save?status=OTHER`, "POST", {
    serviceId: serviceId,
    date: selectedDateTime?.date,
    timeHour: selectedDateTime?.time.split(':')[0],
    timeMin: selectedDateTime?.time.split(':')[1],
    clientId: id,
    comment: " "
  })
  const { response: responseCheck, globalDataFunc: globalDataFuncCheck, error: errorCheck } = useGlobalRequest(`${BASE_URL}/api/auth/checkCode?code=${otpCodeInput}`, "POST", {
    phoneNumber,
  })
  const { response: responseCode, globalDataFunc: globalDataFuncCode, error: errorCode } = useGlobalRequest(`${BASE_URL}/api/auth/sendCode?purpose=false&ROLE=${roleGet === "ROLE_CLIENT" ? "CLIENT" : "MASTER"}`, "POST", {
    phoneNumber,
  })
  useEffect(() => {
    if (responseCode?.success) {
      setPage(2)
      toast(responseCode?.message)
    }
  }, [responseCode])

  const HandleSubmit = async () => {
    await globalDataFuncCheck()
  }
  useEffect(() => {
    if (responseCheck?.success) {
      // alert('check code success!')
      globalDataFunc();
    } else if (!responseCheck?.success && errorCheck) {
      setErrorMessage(errorCheck?.message)
    }
  }, [responseCheck, errorCheck])
  const SendCode = () => {
    globalDataFuncCode();
  }
  useEffect(() => {
    if (response?.success) {
      // alert('Запись успешно создана!')
      setSelectedDateTime(null)
      setPage(3)
    } else if (!response?.success && error) {
      setErrorMessage(error?.message && response?.message)
    }
  }, [response, error])

  const handleTimeSelect = (date: string, time: string) => {
    setSelectedDateTime({ date, time })
  }

  const imageUrl = attachmentId ? attachment + attachmentId : mainPhoto ? attachment + mainPhoto : null

  

  return (
    <div className="bg-[#B9B9C9] w-full rounded-[20px] text-gray-800 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-4">
        {imageUrl && (
          <div className="relative pb-[56.25%]">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={`${name}'s service`}
              className="absolute top-0  left-0 w-full h-full object-cover rounded-[20px]"
            />
          </div>
        )}

        <div className="flex items-center gap-4 mt-4 mb-3">
          {avatar && (
            <img
              src={attachment + avatar || "/placeholder.svg"}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
            />
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold font-manrope text-[24px]">{name}</h3>
              {salon && (
                <>
                  <span className="font-manrope font-bold text-[24px]">/</span>
                  <span className="font-manrope font-medium text-[24px]">{salon}</span>
                </>
              )}
            </div>
            {
              role && <p className="font-manrope font-medium text-[16px] text-[#4F4F4F]">{role}</p>
            }
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
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-[#9C0B35] rounded-[40px] py-3 px-6 text-base font-medium text-white hover:bg-[#7d092a] transition-colors"
          >
            {secondButtonTitle}
          </Button>
        </div>
      </div>

      <UniversalModal
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {page === 1 ? <div className="p-6 bg-[#B9B9C9] rounded-[20px]">
          <div className="text-center mb-6">
            <h2 className="font-manrope font-extrabold text-4xl text-gray-900 mb-2">
              Записаться к мастеру
            </h2>
          </div>
          <div>
            <CalendarTimeSelection
              masterId={masterId || id}
              onTimeSelect={handleTimeSelect}
            />
          </div>
          {errorMessage && (
            <div className="text-red-600 text-center mt-4 mb-2">
              {errorMessage}
            </div>
          )}
          <div className="flex justify-center mt-6">
            <Button
              className="w-full max-w-md h-16 rounded-[40px] bg-[#9C0B35] text-white font-bold text-lg hover:bg-[#7d092a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                SendCode()
                setPage(2)
              }}
              disabled={!selectedDateTime || isSubmitting}
            >
              {isSubmitting ? 'Создание записи...' : selectedDateTime ? 'Записаться' : 'Выберите дату и время'}
            </Button>
          </div>
        </div> : page === 2 ? <div className="p-6  rounded-[20px]">
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-manrope font-extrabold text-[44px] leading-[54px]">ОТП код</h1>
            <h2 className="font-bold font-manrope text-[#30px] leading-[36px] pt-5">
              {localStorage.getItem('phoneNumber')}
            </h2>
            <p className="font-manrope font-medium text-[#4F4F4F] text-[22px] leading-[20px]">Мы отправили вам SMS с кодом подтверждения.</p>
          </div>
          <div className="flex items-center flex-col gap-20 justify-center otp-input p-6">
            <Input.OTP
              length={4}
              onInput={(value: any) => {
                setOtpCodeInput(value.join(''))
                setLoginCheck(null);
                setCheckCode(null);
              }}
              style={{
                display: 'flex',
                width: '60%',
                justifyContent: 'between',
                gap: '20px',
            }}
            />
            <Button
              className=" w-full max-w-md h-16 rounded-[40px] bg-[#9C0B35] text-white font-bold text-lg hover:bg-[#7d092a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                HandleSubmit()
              }}
            >
              Записаться
            </Button>
          </div>
        </div> : page === 3 ? <div className="p-6  rounded-[20px]">
          <div className="flex flex-col items-center justify-center gap-20">
            <h2 className="font-manrope font-extrabold text-4xl text-gray-900 mb-2 text-center">
              Мастер работает только по предоплате
            </h2>
            <Button
              className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
              onClick={() => toast("Скачать приложение")}
            >
              Перейти к оплате
            </Button>
          </div>
        </div> : null}
      </UniversalModal>
    </div>
  )
}

