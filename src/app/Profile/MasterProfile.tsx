"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Input, Rate } from "antd"
import { MapPin, Phone } from "lucide-react"
import { MdArrowBackIos } from "react-icons/md"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Button from "@/components/button/Button"
import { UniversalModal } from "@/components/Modal/UniversalModal"
import { Galereya } from "@/components/Galereya/Galereya"
import Footer from "@/components/footer/Footer"
import { TestimonialSlider } from "@/components/splide/TestimonialSlider2"

import CalendarTimeSelection from "@/components/CalendarTimeSelection"
import { attachment, BASE_URL } from "@/helpers/Url"
import { useGlobalRequest } from "@/helpers/Quary/quary"
import { useTranslation } from "react-i18next"
import { FaRegUser } from "react-icons/fa6"
import { IoAlertCircleOutline } from "react-icons/io5"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import useMasterCategoryStore from "@/Store/MasterCategoryStore"
import Loading from "@/components/Loading/Loading"
import LoginIndex from "@/Store"

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
  reviews: string | null
  serviceId: string
}

export default function MasterProfile() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const { setLoginHolat } = LoginIndex();
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [masterDetails, setMasterDetails] = useState<MasterDetails | null>({
    attachmentId: "",
    id: "",
    fullName: "",
    mainPhoto: "",
    salonName: "",
    masterSpecialization: [],
    district: "",
    phone: "",
    street: "",
    house: "",
    masterServicePrice: 0,
    feedbackCount: 0,
    orderCount: 0,
    clientCount: 0,
    rating: 0,
    address: "",
    phoneNumber: "",
    price: 0,
    specialization: "",
    reviews: null,
    serviceId: "",
  })

  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: string; time: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [otpCodeInput, setOtpCodeInput] = useState<string>("")

  const [contentLoading, setContentLoading] = useState(true)

  const roleGet = localStorage.getItem("Role")
  const phoneNumber = localStorage.getItem("phoneNumber")

  const { response, globalDataFunc } = useGlobalRequest(`${BASE_URL}/api/order/save?status=OTHER`, "POST", {
    serviceId: masterDetails?.serviceId,
    date: selectedDateTime?.date,
    timeHour: selectedDateTime?.time.split(":")[0],
    timeMin: selectedDateTime?.time.split(":")[1],
    clientId: id,
    comment: " ",
  })

  const { MasterCategory } = useMasterCategoryStore()


  const {
    response: responseCheck,
    globalDataFunc: globalDataFuncCheck,
    error: errorCheck,
  } = useGlobalRequest(`${BASE_URL}/api/auth/checkCode?code=${otpCodeInput}`, "POST", { phoneNumber })

  const { response: responseCode, globalDataFunc: globalDataFuncCode } = useGlobalRequest(
    `${BASE_URL}/api/auth/sendCode?purpose=false&ROLE=${roleGet === "ROLE_CLIENT" ? "CLIENT" : "MASTER"}`,
    "POST",
    { phoneNumber },
  )

  const { response: galleryResponse, globalDataFunc: fetchGallery } = useGlobalRequest(
    `${BASE_URL}/api/gallery/user/${id}`,
    "GET",
  )

  useEffect(() => {
    if (id) {
      fetchGallery()
    }
  }, [id])

  useEffect(() => {
    if (galleryResponse?.body) {
      setGallery(galleryResponse.body)
      setLoading(false)
    }
  }, [galleryResponse])

  useEffect(() => {
    if (id && MasterCategory) {
      const master = MasterCategory.find((m: { id: string }) => m.id === id)
      if (master) {
        setMasterDetails(master)
        setLoading(false)
        setContentLoading(false)
      }
    }
    if (MasterCategory == null) {
      navigate(-1)
    }
  }, [id, MasterCategory])

  useEffect(() => {
    if (responseCode?.success) {
      setPage(2)
      toast.dismiss()
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
      toast.dismiss()
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
      await globalDataFunc()
    }
    setIsSubmitting(false)
  }

  useEffect(() => {
    if (responseCheck?.success) {
      setOtpCodeInput("")
      globalDataFunc()
    } else if (!responseCheck?.success && errorCheck) {
      setErrorMessage(errorCheck?.message)
    }
  }, [responseCheck, errorCheck])


  useEffect(() => {
    if (response?.success) {
      setSelectedDateTime(null)
      setPage(3)
    } else if (!response?.success) {
      toast.dismiss()
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
      setPage(1)
    }
  }, [response])

  const handleTimeSelect = (date: string, time: string) => {
    setSelectedDateTime({ date, time })
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setPage(1)
  }

  const handleAppointmentClick = () => {
    const token = localStorage.getItem("Token")
    if (!token) {
      setIsModalOpen(true)
      setPage(3) // Set to page 3 which shows the login required modal
    } else {
      setIsModalOpen(true)
      setPage(1)
      setErrorMessage(null)
    }
  }

  if (loading || !masterDetails) {
    return <Loading />
  }


  return (
    <div className="min-h-screen bg-[#111827]">
      <main className=" mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center mb-10 gap-5 md:gap-10">
          <Button
            onClick={() => navigate(-1)}
            className="border-[#FFFFFF] text-[#FFFFFF] border rounded-[10px] flex items-center py-2 px-4 md:py-3 md:px-6 gap-2 text-sm md:text-base"
          >
            <MdArrowBackIos className="text-[#FFFFFF]" />
            {t("Назад")}
          </Button>
          <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] text-2xl md:text-4xl text-center md:text-left">
            {t("Подробности о мастере")}
          </h2>
        </div>

        <div className="bg-[#B9B9C9] rounded-[20px] overflow-hidden shadow-lg w-full">
          <div className="relative h-[220px] sm:h-[300px] md:h-[360px] lg:h-[440px] w-full p-4 sm:p-6 md:p-8 lg:p-10">
            <img
              src={
                masterDetails.attachmentId
                  ? `${attachment}${masterDetails.attachmentId}`
                  : "https://picsum.photos/200/300.jpg"
              }
              alt="Service environment"
              className="w-full h-full object-cover rounded-[20px] "
              onError={(e) => (e.currentTarget.src = "https://picsum.photos/200/300.jpg")}
            />
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {masterDetails.mainPhoto ? (
                <img
                  src={`${attachment}${masterDetails.mainPhoto}`}
                  alt={masterDetails.fullName}
                  className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[153px] lg:h-[153px] rounded-full object-cover shadow-lg"
                />
              ) : (
                <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[153px] lg:h-[153px] rounded-full shadow-lg bg-gray-300 flex items-center justify-center">
                  <FaRegUser size={30} className="text-[#9c0b35] sm:text-[40px] md:text-[50px]" />
                </div>
              )}

              <div className="flex-1 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-6">
                  <div className="text-center sm:text-left">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{masterDetails.fullName}</h1>
                    <p className="font-medium font-manrope text-lg sm:text-xl md:text-2xl text-gray-600">
                      {masterDetails.salonName}
                    </p>
                  </div>

                  <div className="flex flex-col items-center sm:items-start gap-2 sm:gap-4">
                    <div>
                      <Rate
                        disabled
                        value={masterDetails.feedbackCount}
                        className="text-[#9C0B35] text-lg sm:text-xl md:text-2xl"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                      />
                    </div>
                    <p className="font-medium font-manrope text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 text-center sm:text-left">
                      {masterDetails.orderCount} {t("order")}, {masterDetails.clientCount} {t("clients")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 sm:gap-6 py-6 sm:py-8 md:py-10">
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="text-[#9C0B35] w-[30px] h-[35px] sm:w-[35px] sm:h-[40px] md:w-[40px] md:h-[45px] flex-shrink-0" />
                <span className="font-manrope font-medium text-base sm:text-lg md:text-xl lg:text-2xl text-[#4F4F4F]">
                  {masterDetails.district} {masterDetails.street} {masterDetails.house}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-[#9C0B35] w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] lg:w-[44px] lg:h-[44px] flex-shrink-0" />
                <span className="font-manrope font-medium text-base sm:text-lg md:text-xl lg:text-2xl text-[#4F4F4F]">
                  {masterDetails.phone}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center py-3 gap-2 sm:gap-0">
              <p className="font-medium font-manrope text-base sm:text-lg md:text-xl lg:text-2xl text-center sm:text-left">
                {t("NextEntry")}: <span className="font-medium">{t("Today")}</span>
              </p>
              <p className="text-[#9C0B35] font-bold text-lg sm:text-xl md:text-2xl">
                {t("from")} {masterDetails.masterServicePrice}
              </p>
            </div>

            <div className="flex justify-center mt-4 sm:mt-6">
              <Button
                onClick={handleAppointmentClick}
                className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px] h-[50px] sm:h-[58px] md:h-[62px] lg:h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-base sm:text-lg leading-[30px] hover:opacity-90"
              >
                {t("bronqilish")}
              </Button>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-white text-center font-medium text-3xl mb-8">
            {gallery.length > 0 ? t("Галерея") : " "}
          </h2>
          {contentLoading ? (
            <div className="animate-pulse">
              <div className="h-64 bg-gray-300 rounded-[20px] mb-6"></div>
              <div className="h-64 bg-gray-300 rounded-[20px] mb-6"></div>
            </div>
          ) : (
            gallery.map((album) => (
              <Galereya
                key={album.id}
                name={album.albumName}
                imgData={album.resGalleryAttachments.map((item, index) => ({
                  id: index + 1,
                  url: `${attachment}${item.attachmentId}`,
                  title: `${index + 1}`,
                }))}
              />
            ))
          )}
        </section>

        <section className="mt-12">
          <TestimonialSlider masterId={id || ""} />
        </section>
      </main>

      <UniversalModal isOpen={isModalOpen} onClose={closeModal}>
        {page === 1 ? (
          <div className="p-4 sm:p-6 bg-[#B9B9C9] rounded-[20px]">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="font-manrope font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-2">
                {t("bronqilish")}
              </h2>
            </div>
            <div>
              <CalendarTimeSelection masterId={id} onTimeSelect={handleTimeSelect} />
            </div>
            {errorMessage && <div className="text-red-600 text-center mt-4 mb-2">{errorMessage}</div>}
            <div className="flex justify-center mt-4 sm:mt-6">
              <Button
                className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px] h-[50px] sm:h-[58px] md:h-[62px] lg:h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-base sm:text-lg leading-[30px] hover:opacity-90"
                onClick={() => {
                  globalDataFuncCode();
                }}
                disabled={!selectedDateTime || isSubmitting}
              >
                {isSubmitting ? t("bronqilish") : selectedDateTime ? t("bronqilish") : t("bronqilish")}
              </Button>
            </div>
          </div>

        ) : page === 2 ? (
          <div className="p-6 rounded-[20px]">
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="font-manrope font-extrabold text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] leading-[40px] sm:leading-[46px] md:leading-[50px] lg:leading-[54px]">
                {t("OTPCode")}
              </h1>
              <h2 className="font-bold font-manrope text-[20px] sm:text-[24px] md:text-[28px] lg:text-[30px] leading-[28px] sm:leading-[32px] md:leading-[34px] lg:leading-[36px] pt-5">
                {localStorage.getItem("phoneNumber")}
              </h2>
              <p className="font-manrope font-medium text-[#4F4F4F] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] leading-[18px] sm:leading-[20px] md:leading-[22px] lg:leading-[24px]">
                {t("Мы отправили вам SMS с кодом подтверждения.")}
              </p>
            </div>
            <div className="flex items-center flex-col gap-10 sm:gap-14 md:gap-16 lg:gap-20 justify-center otp-input p-6">
              <Input.OTP
                length={4}
                onInput={(value: string[]) => {
                  setOtpCodeInput(value.join(""));
                }}
                value={otpCodeInput}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "between",
                  gap: "10px",
                }}
              />
              <Button
                className="w-full max-w-md h-12 sm:h-14 md:h-16 rounded-[40px] bg-[#9C0B35] text-white font-bold text-base sm:text-lg hover:bg-[#7d092a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  HandleSubmit();
                }}
              >
                {t("bronqilish")}
              </Button>
            </div>
          </div>

        ) : page === 3 ? (
          response?.status === "CREATED" ? (
            <div className="p-4 sm:p-6 rounded-[20px]">
              <div className="flex flex-col items-center justify-center gap-6 sm:gap-10 py-6 sm:py-10">
                <IoMdCheckmarkCircleOutline className="text-[#9C0B35] text-6xl sm:text-[100px]" />
                <h2 className="font-manrope font-extrabold text-2xl sm:text-4xl text-gray-900 mb-2 text-center">
                  {t("Заявка принята")}
                </h2>
                <p className="font-manrope font-medium text-[#4F4F4F] text-lg sm:text-[22px] text-center">
                  {t("Ваша заявка принята. Cтатус вашей записи можно")}
                  {t("отслеживать в мобильном приложении bookers")}
                </p>
                <div className="pt-6 sm:pt-10">
                  <Button
                    className="w-[240px] sm:w-[340px] h-[50px] sm:h-[66px] rounded-[30px] sm:rounded-[40px] border-2 border-[#9C0B35] text-[#9C0B35] font-bold text-[16px] sm:text-[18px] leading-[26px] sm:leading-[30px]"
                    onClick={() =>
                      window.open(
                        "https://apps.apple.com/uz/app/bookers-%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%83%D1%81%D0%BB%D1%83%D0%B3/id6503646200",
                        "_blank",
                      )
                    }
                  >
                    {t("Скачать приложение")}
                  </Button>
                </div>
              </div>
            </div>

          ) : response?.status === "WAIT" ? (
            <div className="p-4 sm:p-6 rounded-[20px]">
              <div className="flex flex-col items-center justify-center gap-6 sm:gap-10 py-6 sm:py-10">
                <IoMdCheckmarkCircleOutline className="text-[#9C0B35] text-6xl sm:text-[100px]" />
                <h2 className="font-manrope font-extrabold text-2xl sm:text-4xl text-gray-900 mb-2 text-center">{t("Ваша запись отправленана утверждение мастеру")}</h2>
                <p className="font-manrope font-medium text-[#4F4F4F] text-lg sm:text-[22px] text-center">
                  {t("Ваша заявка принята. Cтатус вашей записи можно")}
                  {t("отслеживать в мобильном приложении bookers")}
                </p>
                <div className="pt-6 sm:pt-10">
                  <Button
                    className="w-[240px] sm:w-[340px] h-[50px] sm:h-[66px] rounded-[30px] sm:rounded-[40px] border-2 border-[#9C0B35] text-[#9C0B35] font-bold text-[16px] sm:text-[18px] leading-[26px] sm:leading-[30px]"
                    onClick={() =>
                      window.open(
                        "https://apps.apple.com/uz/app/bookers-%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%83%D1%81%D0%BB%D1%83%D0%B3/id6503646200",
                        "_blank",
                      )
                    }
                  >
                    {t("Скачать приложение")}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-6 rounded-[20px]">
              <div className="flex flex-col items-center justify-center gap-6 sm:gap-10 py-6 sm:py-10">
                <IoAlertCircleOutline className="text-[#9C0B35] text-6xl sm:text-[100px]" />
                <h2 className="font-manrope font-extrabold text-2xl sm:text-4xl text-gray-900 text-center">
                  {t("Вы не можете записаться на услугу мастера")}
                </h2>
                <p className="font-manrope font-medium text-[#4F4F4F] text-lg sm:text-[22px] text-center">
                  {t("Что бы записаться необходимо пройти")}
                </p>
                <div className="pt-6 sm:pt-10">
                  <Button
                    className="w-[240px] sm:w-[340px] h-[50px] sm:h-[66px] rounded-[30px] sm:rounded-[40px]  bg-[#9C0B35] text-white font-bold text-[16px] sm:text-[18px] leading-[26px] sm:leading-[30px]"
                    onClick={() => {
                      setLoginHolat(true)
                      closeModal()
                    }}
                  >
                    {t("Ro‘yxatdan o‘tish")}
                  </Button>
                </div>
              </div>
            </div>
          )
        ) : null}
      </UniversalModal>
      <Footer />
    </div>
  )
}

