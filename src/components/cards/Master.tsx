"use client"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { useEffect, useState } from "react"
import { Input, Rate } from "antd"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { UniversalModal } from "@/components/Modal/UniversalModal"
import { attachment, BASE_URL } from "@/helpers/Url"
import Button from "@/components/button/Button"
import CalendarTimeSelection from "@/components/CalendarTimeSelection"
import { useGlobalRequest } from "@/helpers/Quary/quary"

import { useTranslation } from "react-i18next"
import { FaRegUser } from "react-icons/fa6"
import { IoAlertCircleOutline } from "react-icons/io5"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import LoginIndex from "@/Store"

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
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: string; time: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [page, setPage] = useState<number | null>(1)
  const [otpCodeInput, setOtpCodeInput] = useState<string>("") // Added state to clear OTP input
  const [loginCheck, setLoginCheck] = useState<boolean | null>(null)
  const [checkCode, setCheckCode] = useState<boolean | null>(null)
  const [hasToken, setHasToken] = useState(false) // Added state for token
  const [otpError, setOtpError] = useState<string | null>(null) // Added OTP error state
  const [imageLoading, setImageLoading] = useState(true) // Added image loading state

  const roleGet = localStorage.getItem("Role")
  const handleAppointmentClick = () => {
    if (hasToken) {
      // Check for token before opening modal
      setIsModalOpen(true)
      setErrorMessage(null)
    } else {
      setIsModalOpen(true)
      setPage(3)
    }
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setPage(1)
  }
  const {setLoginHolat } = LoginIndex();
  const phoneNumber = localStorage.getItem("phoneNumber")
  const { response, globalDataFunc } = useGlobalRequest(`${BASE_URL}/api/order/save?status=OTHER`, "POST", {
    serviceId: serviceId,
    date: selectedDateTime?.date,
    timeHour: selectedDateTime?.time.split(":")[0],
    timeMin: selectedDateTime?.time.split(":")[1],
    clientId: id,
    comment: " ",
  })
  const {
    response: responseCheck,
    globalDataFunc: globalDataFuncCheck,
    error: errorCheck,
  } = useGlobalRequest(`${BASE_URL}/api/auth/checkCode?code=${otpCodeInput}`, "POST", {
    phoneNumber,
  })
  const {
    response: responseCode,
    globalDataFunc: globalDataFuncCode,
  } = useGlobalRequest(
    `${BASE_URL}/api/auth/sendCode?purpose=false&ROLE=${roleGet === "ROLE_CLIENT" ? "CLIENT" : "MASTER"}`,
    "POST",
    {
      phoneNumber,
    },
  )

  useEffect(() => {
    if (responseCode?.success) {
      setPage(2)
      toast.dismiss() // Dismiss any existing toasts
      toast.success(t("CodeSent"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }, [responseCode])

  const HandleSubmit = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    await globalDataFuncCheck()
    if (!responseCheck?.success) {
      toast.dismiss() // Dismiss any existing toasts
      if (!toast.isActive("error-toast")) {
        toast.error(responseCheck?.message, {
          toastId: "error-toast",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    } else {
      setOtpError(null)
      await globalDataFunc()
    }
    setIsSubmitting(false)
  }
  useEffect(() => {
    if (responseCheck?.success) {
      setOtpCodeInput("") // Clear OTP input after successful submission
      globalDataFunc()
    } else if (!responseCheck?.success && errorCheck) {
      setErrorMessage(errorCheck?.message)
    }
  }, [responseCheck, errorCheck])
  const SendCode = () => {
    globalDataFuncCode()
  }
  useEffect(() => {
    if (response?.success) {
      setSelectedDateTime(null)
      setPage(3)
    } else if (!response?.success) {
      toast.dismiss() // Dismiss any existing toasts
      toast.error(response?.message, {
        toastId: "unique-id",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setPage(1) // Return to the first modal
    }
  }, [response])

  const handleTimeSelect = (date: string, time: string) => {
    setSelectedDateTime({ date, time })
  }

  const imageUrl = attachmentId ? attachment + attachmentId : mainPhoto ? attachment + mainPhoto : null

  useEffect(() => {
    const token = localStorage.getItem("Token")
    setHasToken(!!token)
  }, [])

  return (
    <div className="bg-[#B9B9C9] w-full rounded-[20px] text-gray-800 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-4">
        {imageUrl && (
          <div className="relative pb-[56.25%]">
            {imageLoading && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 rounded-[20px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9C0B35]"></div>
              </div>
            )}
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={`${name}'s service`}
              className={`absolute top-0 left-0 w-full h-full  object-cover rounded-[20px] transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"
                }`}
              onLoad={() => setImageLoading(false)}
            />
          </div>
        )}

        <div className="flex  items-center gap-4 mt-4 mb-3">
          {avatar ? (
            <div className="relative w-20 h-20">
              {imageLoading && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#9C0B35]"></div>
                </div>
              )}
              <img
                src={attachment + avatar || "/placeholder.svg"}
                alt={name}
                className={`w-20 h-20 rounded-full object-cover shadow-md transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                onLoad={() => setImageLoading(false)}
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
              <FaRegUser size={30} className="text-[#9c0b35]" />
            </div>
          )}
          <div>
            <div className="flex flex-col sm:flex-row gap-2">
              <h3 className="font-bold font-manrope text-[24px]">{name}</h3>
              {salon && (
                <>
                  <span className="hidden sm:inline font-manrope font-bold text-[24px]">/</span>
                  <span className="font-manrope font-medium text-[24px]">{salon}</span>
                </>
              )}
            </div>

            {role && <p className="font-manrope font-medium text-[16px] text-[#4F4F4F]">{role}</p>}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between py-3">
            <Rate disabled value={feedbackCount} className="text-[#9C0B35] text-lg" />
            <span className="font-manrope font-medium text-[16px] text-[#4F4F4F]">
              {orderCount} {t("order")}, {clientCount} {t("clients")}
            </span>
          </div>

          {address && (
            <div className="flex items-center gap-2">
              <HiOutlineLocationMarker className="text-[#9C0B35] flex-shrink-0" size={25} />
              <span className="font-manrope font-medium text-[16px] text-[#4F4F4F]">{address}</span>
            </div>
          )}

          <div className="flex justify-between items-center py-3">
            <span className="font-medium font-manrope text-[22px]">
              {t("NextEntry")}: {t("Today")}
            </span>
            {masterServicePrice && (
              <span className="text-[#9C0B35] font-semibold text-lg">
                {t("from")} {masterServicePrice}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-3">
          <Button
            onClick={onProfileClick}
            className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] "
          >
            {firstButtonTitle}
          </Button>
          <Button
            onClick={handleAppointmentClick}
            className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] "
          >
            {secondButtonTitle}
          </Button>
        </div>
      </div>

      <UniversalModal isOpen={isModalOpen} onClose={closeModal}>
        {page === 1 ? (
          <div className="p-6 bg-[#B9B9C9] rounded-[20px]">
            <div className="text-center mb-6">
              <h2 className="font-manrope font-extrabold text-4xl text-gray-900 mb-2">{t("bronqilish")}</h2>
            </div>
            <div>
              <CalendarTimeSelection masterId={masterId || id} onTimeSelect={handleTimeSelect} />
            </div>
            {errorMessage && <div className="text-red-600 text-center mt-4 mb-2">{errorMessage}</div>}
            <div className="flex justify-center mt-6">
              <Button
                className="w-full max-w-md h-16 rounded-[40px] bg-[#9C0B35] text-white font-bold text-lg hover:bg-[#7d092a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  SendCode()
                  setPage(2)
                }}
                disabled={!selectedDateTime || isSubmitting}
              >
                {isSubmitting ? t("bronqilish") : selectedDateTime ? t("bronqilish") : t("bronqilish")}
              </Button>
            </div>
          </div>
        ) : page === 2 ? (
          <div className="p-6  rounded-[20px]">
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-manrope font-extrabold text-[44px] leading-[54px]">{t("OTPCode")}</h1>
              <h2 className="font-bold font-manrope text-[#30px] leading-[36px] pt-5">
                {localStorage.getItem("phoneNumber")}
              </h2>
              <p className="font-manrope font-medium text-[#4F4F4F] text-[22px] leading-[20px]">{t("sentCode")}</p>
            </div>
            <div className="flex items-center flex-col gap-20 justify-center otp-input p-6">
              <Input.OTP
                length={4}
                onInput={(value: any) => {
                  setOtpCodeInput(value.join(""))
                  setLoginCheck(null)
                  setCheckCode(null)
                  setOtpError(null) // Clear error when user types
                }}
                value={otpCodeInput} // Added value prop to clear input after submission
                style={{
                  display: "flex",
                  width: "60%",
                  justifyContent: "between",
                  gap: "20px",
                }}
              />
              <Button
                className=" w-full max-w-md h-16 rounded-[40px] bg-[#9C0B35] text-white font-bold text-lg hover:bg-[#7d092a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  HandleSubmit()
                }}
              >
                {t("Signup")}
              </Button>
            </div>
          </div>
        ) : page === 3 ? (
          response?.status === "CREATED" ? (
            <div className="p-6 rounded-[20px]">
              <div className="flex flex-col items-center justify-center gap-10 py-10">
                <IoMdCheckmarkCircleOutline style={{ color: "#9C0B35", fontSize: "100px" }} />
                <h2 className="font-manrope font-extrabold text-4xl text-gray-900 mb-2 text-center">
                  {t("Заявка принята")}
                </h2>
                <p className="font-manrope font-medium text-[#4F4F4F] text-[22px] text-center">
                  {t("Ваша заявка принята. Cтатус вашей записи можно")}
                  <br />
                  {t("отслеживать в мобильном приложении bookers")}
                </p>
                <div className="pt-10">
                  <Button
                    className="w-[340px] h-[66px] rounded-[40px] border-2 border-[#9C0B35] text-[#9C0B35] font-bold text-[18px] leading-[30px] hover:bg-[#9C0B35] hover:text-white"
                    onClick={() => window.open('https://apps.apple.com/uz/app/bookers-%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%83%D1%81%D0%BB%D1%83%D0%B3/id6503646200', '_blank')}
                  >
                    {t("Скачать приложение")}
                  </Button>
                </div>
              </div>
            </div>
          ) : response?.status === "WAIT" ? (
            <div className="p-6 rounded-[20px]">
              <div className="flex flex-col items-center justify-center gap-10 py-10">
                <IoMdCheckmarkCircleOutline style={{ color: "#9C0B35", fontSize: "100px" }} />
                <h2 className="font-manrope font-extrabold text-4xl text-gray-900 mb-2 text-center">{t("Ваша запись отправленана утверждение мастеру")}</h2>
                <p className="font-manrope font-medium text-[#4F4F4F] text-[22px] text-center">
                  {t("Ваша заявка принята. Cтатус вашей записи можно")}
                  <br />
                  {t("отслеживать в мобильном приложении bookers")}
                </p>
                <div className="pt-10">
                  <Button
                    className="w-[340px] h-[66px] rounded-[40px] border-2 border-[#9C0B35] text-[#9C0B35] font-bold text-[18px] leading-[30px] hover:bg-[#9C0B35] hover:text-white"
                    onClick={() => window.open('https://apps.apple.com/uz/app/bookers-%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%83%D1%81%D0%BB%D1%83%D0%B3/id6503646200', '_blank')}
                  >
                    {t("Скачать приложение")}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-[20px]">
              <div className="flex flex-col items-center justify-center gap-10 py-10">
                <IoAlertCircleOutline style={{ color: "#9C0B35", fontSize: "100px" }} />
                <h2 className="font-manrope font-extrabold text-4xl text-gray-900 mb-2 text-center">
                  {t("Вы не можете записаться на услугу мастера")}
                </h2>
                <p className="font-manrope font-medium text-[#4F4F4F] text-[22px] text-center">{t("Что бы записаться необходимо пройти")} <br />{t("")}</p>
                <div className="pt-10">
                  <Button
                    className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] "
                    onClick={() => setLoginHolat(true)}
                  >
                    {t("Зарегистрироваться")}
                  </Button>
                </div>
              </div>
            </div>
          )
        ) : null}
      </UniversalModal>
    </div>
  )
}

