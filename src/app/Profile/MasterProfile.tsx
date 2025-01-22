"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Input, Rate } from "antd"
import { MapPin, Phone } from "lucide-react"
import { MdArrowBackIos, MdCheckCircle } from "react-icons/md"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Button from "@/components/button/Button"
import { UniversalModal } from "@/components/Modal/UniversalModal"
import { Galereya } from "@/components/Galereya/Galereya"
import Footer from "@/components/footer/Footer"
import { TestimonialSlider } from "@/components/splide/TestimonialSlider"
import CalendarTimeSelection from "@/components/CalendarTimeSelection"
import { attachment, BASE_URL } from "@/helpers/Url"
import { useGlobalRequest } from "@/helpers/Quary/quary"
import { useTranslation } from "react-i18next"

interface AttachmentItem {
  attachmentId: string
  attachmentStatus: string
  message: string | null
  newStatus: boolean
  main: boolean
}

interface GalleryItem {
  id: number
  albumName: string
  date: string
  photos: string[] | null
  mainPhotos: string[] | null
  resGalleryAttachments: AttachmentItem[]
}

interface MasterDetails {
  attachmentId: string
  id: string
  fullName: string
  mainPhoto: string
  salonName: string
  masterSpecialization: string[]
  district: string
  phone: string
  street: string
  house: string
  masterServicePrice: number
  feedbackCount: number
  orderCount: number
  clientCount: number
  rating: number
  address: string
  phoneNumber: string
  price: number
  specialization: string
}

export default function MasterProfile() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [masterDetails, setMasterDetails] = useState<MasterDetails | null>(null)
  console.log(masterDetails)

  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: string; time: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [otpCodeInput, setOtpCodeInput] = useState<string | null>(null)
  const [loginCheck, setLoginCheck] = useState<boolean | null>(null)
  const [checkCode, setCheckCode] = useState<boolean | null>(null)

  const roleGet = localStorage.getItem("Role")
  const phoneNumber = localStorage.getItem("phoneNumber")

  const { response, globalDataFunc, error } = useGlobalRequest(`${BASE_URL}/api/order/save?status=OTHER`, "POST", {
    serviceId: id,
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
  } = useGlobalRequest(`${BASE_URL}/api/auth/checkCode?code=${otpCodeInput}`, "POST", { phoneNumber })

  const {
    response: responseCode,
    globalDataFunc: globalDataFuncCode,
    error: errorCode,
  } = useGlobalRequest(
    `${BASE_URL}/api/auth/sendCode?purpose=false&ROLE=${roleGet === "ROLE_CLIENT" ? "CLIENT" : "MASTER"}`,
    "POST",
    { phoneNumber },
  )

  useEffect(() => {
    const fetchMasterDetails = async () => {
      try {
        const Token = localStorage.getItem("Token")
        const categoryResponse = await fetch(`${BASE_URL}/api/category`, {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
        })

        const categoryData = await categoryResponse.json()

        // Fetch master details for all categories
        const masterPromises =
          categoryData?.body?.map(async (category: any) => {
            const response = await fetch(`${BASE_URL}/api/service/website-master?categoryId=${category.id}`, {
              headers: {
                Authorization: `Bearer ${Token}`,
                "Content-Type": "application/json",
              },
            })
            if (!response.ok) return null
            const data = await response.json()
            console.log("aesdfg", data)
            return data?.body?.object?.find((master: any) => master.id === id)
          }) || []

        const results = await Promise.all(masterPromises)
        const master = results.find((result) => result !== null)

        if (master) {
          setMasterDetails(master)
        } else {
          console.error("error")
        }
      } catch (error) {
        console.error("Error fetching master details:", error)
      }
      setLoading(false)
    }

    const fetchGallery = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/gallery/user/${id}`)
        const data = await response.json()
        if (data && data.body) {
          setGallery(data.body)
        }
      } catch (error) {
        console.error("Error fetching gallery:", error)
      }
      setLoading(false)
    }

    if (id) {
      fetchMasterDetails()
      fetchGallery()
    }
  }, [id])

  useEffect(() => {
    if (responseCode?.success) {
      setPage(2)
      toast(responseCode?.message)
    }
  }, [responseCode])

  useEffect(() => {
    if (responseCheck?.success) {
      globalDataFunc()
    } else if (!responseCheck?.success && errorCheck) {
      setErrorMessage(errorCheck?.message)
    }
  }, [responseCheck, errorCheck])

  useEffect(() => {
    if (response?.success) {
      setSelectedDateTime(null)
      setPage(3)
    } else if (!response?.success && error) {
      setErrorMessage(error?.message || response?.message)
    }
  }, [response, error])

  const handleTimeSelect = (date: string, time: string) => {
    setSelectedDateTime({ date, time })
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setPage(1)
  }

  if (loading || !masterDetails) {
    return <div className="text-[#B9B9C9] text-center py-10">{t("MasterProfileLoading")}...</div>
  }
  const imageUrl = masterDetails.attachmentId
    ? attachment + masterDetails.attachmentId
    : masterDetails.mainPhoto
      ? attachment + masterDetails.mainPhoto
      : null

  return (
    <div className="min-h-screen bg-[#111827]">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Button
          onClick={() => navigate(-1)}
          className="border-[#B9B9C9] text-[#B9B9C9] border rounded-xl flex items-center py-3 px-6 gap-2 mb-8"
        >
          <MdArrowBackIos className="text-[#B9B9C9]" />
          {t("MasterProfileBack")}
        </Button>

        {/* Updated Card Design */}
        <div className="bg-[#B9B9C9] rounded-[20px] overflow-hidden shadow-lg w-full">
          {/* Header Image */}
          <div className="relative h-[440px] w-full rounded-[20px]">
            <img
              src={masterDetails.attachmentId ? `${attachment}${masterDetails.attachmentId}` : ""}
              alt="Service environment"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="flex items-start gap-6">
              {/* Profile Image */}
              <img
                src={imageUrl || ""}
                alt={masterDetails.fullName}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#B9B9C9] shadow-lg"
              />

              {/* Name and Rating */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{masterDetails.fullName}</h1>
                    <p className="font-medium font-manrope text-[24px] text-gray-600">{masterDetails.specialization}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className=" ">
                      <Rate
                        disabled
                        value={masterDetails.rating}
                        className="text-[#9C0B35] w-[41px] h-[45px]"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                      />
                    </div>
                    <p className="font-medium font-manrope text-[24px] text-gray-600">
                      {masterDetails.orderCount} заказа, {masterDetails.clientCount} клиентов
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location and Contact */}
            <div className="flex align-center justify-between py-10">
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="text-[#9C0B35] w-[40px] h-[45px] flex-shrink-0" />
                <span className="font-manrope font-medium text-[24px] text-[#4F4F4F]">{masterDetails.address}</span>
              </div>
              <div className="flex items-center gap-3 ">
                <Phone className="text-[#9C0B35] w-[44px] h-[44px] flex-shrink-0" />
                <span className="font-manrope font-medium text-[24px] text-[#4F4F4F]">{masterDetails.phoneNumber}</span>
              </div>
            </div>

            {/* Appointment and Price */}
            <div className="flex justify-between items-center py-3">
              <p className="font-medium font-manrope text-[24px]">
                Ближайшая запись: <span className="font-medium">Сегодня</span>
              </p>
              <p className="text-[#9C0B35] font-bold text-[22px]">от {masterDetails.price}</p>
            </div>

            {/* Book Button */}
            <div className="flex justify-center">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
              >
                Записаться
              </Button>
            </div>
          </div>
        </div>

        {/* Keep existing Gallery and Reviews sections */}
        <section className="mt-12">
          <h2 className="text-white text-center font-medium text-3xl mb-8">{t("MasterProfileGallery")}</h2>
          {gallery.map((album) => (
            <Galereya
              key={album.id}
              name={album.albumName}
              imgData={album.resGalleryAttachments.map((item, index) => ({
                id: index + 1,
                url: `${attachment}${item.attachmentId}`,
                title: `${index + 1}`,
              }))}
            />
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-white text-center font-medium text-3xl mb-8">{t("MasterProfileReviews")}</h2>
          <TestimonialSlider />
        </section>
      </main>

      {/* Keep existing Modal code */}
      <UniversalModal isOpen={isModalOpen} onClose={closeModal}>
        {page === 1 ? (
          <div className="p-6 bg-[#B9B9C9] rounded-[20px]">
            <div className="text-center mb-6">
              <h2 className="font-manrope font-extrabold text-4xl text-gray-900 mb-2">Записаться к мастеру</h2>
            </div>
            <div>
              <CalendarTimeSelection masterId={id} onTimeSelect={(date, time) => setSelectedDateTime({ date, time })} />
            </div>
            {errorMessage && <div className="text-red-600 text-center mt-4 mb-2">{errorMessage}</div>}
            <div className="flex justify-center mt-6">
              <Button
                className="w-full max-w-md h-16 rounded-[40px] bg-[#9C0B35] text-white font-bold text-lg hover:bg-[#7d092a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  globalDataFuncCode()
                  setPage(2)
                }}
                disabled={!selectedDateTime || isSubmitting}
              >
                {isSubmitting ? "Создание записи..." : selectedDateTime ? "Записаться" : "Выберите дату и время"}
              </Button>
            </div>
          </div>
        ) : page === 2 ? (
          <div className="p-6 rounded-[20px]">
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-manrope font-extrabold text-[44px] leading-[54px]">ОТП код</h1>
              <h2 className="font-bold font-manrope text-[30px] leading-[36px] pt-5">{phoneNumber}</h2>
              <p className="font-manrope font-medium text-[#4F4F4F] text-[22px] leading-[20px]">
                Мы отправили вам SMS с кодом подтверждения.
              </p>
            </div>
            <div className="flex items-center flex-col gap-20 justify-center otp-input p-6">
              <Input.OTP
                length={4}
                onInput={(value: any) => {
                  setOtpCodeInput(value.join(""))
                  setLoginCheck(null)
                  setCheckCode(null)
                }}
                style={{
                  display: "flex",
                  width: "60%",
                  justifyContent: "between",
                  gap: "20px",
                }}
              />
              <Button
                className="w-full max-w-md h-16 rounded-[40px] bg-[#9C0B35] text-white font-bold text-lg hover:bg-[#7d092a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => globalDataFuncCheck()}
              >
                Записаться
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-[20px]">
            <div className="flex flex-col items-center justify-center gap-10 py-10">
              <MdCheckCircle style={{ color: "#9C0B35", fontSize: "100px" }} />
              <h2 className="font-manrope font-extrabold text-4xl text-gray-900 mb-2 text-center">Заявка принята</h2>
              <p className="font-manrope font-medium text-[#4F4F4F] text-[22px] text-center">
                Ваша заявка принята. Cтатус вашей записи можно
                <br />
                отслеживать в мобильном приложении bookers
              </p>
              <div className="pt-10">
                <Button
                  className="w-[340px] h-[66px] rounded-[40px] border-2 border-[#9C0B35] text-[#9C0B35] font-bold text-[18px] leading-[30px] hover:bg-[#9C0B35] hover:text-white"
                  onClick={() => alert("Войти / Регистрация")}
                >
                  Скачать приложение
                </Button>
              </div>
            </div>
          </div>
        )}
      </UniversalModal>

      <Footer />
    </div>
  )
}

