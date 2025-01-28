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
  reviews: any[] | null
  serviceId: string
}

export default function MasterProfile() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
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
  console.log("asdfghsdrtf", masterDetails)

  const [loading, setLoading] = useState(true) // Update 4: Initialize loading to true
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: string; time: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [otpCodeInput, setOtpCodeInput] = useState<string>("")
  const [loginCheck, setLoginCheck] = useState<boolean | null>(null)
  const [checkCode, setCheckCode] = useState<boolean | null>(null)

  const roleGet = localStorage.getItem("Role")
  const phoneNumber = localStorage.getItem("phoneNumber")

  const { response, globalDataFunc, error } = useGlobalRequest(`${BASE_URL}/api/order/save?status=OTHER`, "POST", {
    serviceId: masterDetails.serviceId,
    date: selectedDateTime?.date,
    timeHour: selectedDateTime?.time.split(":")[0],
    timeMin: selectedDateTime?.time.split(":")[1],
    clientId: id,
    comment: " ",
  })

  const { MasterCategory } = useMasterCategoryStore()
  console.log(MasterCategory, "MasterCategory")

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
      setLoading(false) // Update 3: Set loading to false after fetching gallery data
    }
  }, [galleryResponse])

  useEffect(() => {
    if (id && MasterCategory) {
      const master = MasterCategory.find((m: any) => m.id === id)
      if (master) {
        setMasterDetails(master)
        setLoading(false) // Update 2: Set loading to false after fetching master details
      }
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
    setIsModalOpen(true)
    setPage(1)
    setErrorMessage(null)
  }

  if (loading || !masterDetails) {
    // Update 1: Use loading state to show Loading component
    return <Loading />
  }

  const imageUrl = masterDetails.attachmentId
    ? attachment + masterDetails.attachmentId
    : masterDetails.mainPhoto
      ? attachment + masterDetails.mainPhoto
      : null

  return (
    <div className="min-h-screen bg-[#111827]">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-10 gap-10`">
          <Button
            onClick={() => navigate(-1)}
            className="border-[#FFFFFF] text-[#FFFFFF] border rounded-[10px] flex items-center py-3 px-6 gap-2 "
          >
            <MdArrowBackIos className="text-[#FFFFFF]" />
            {t("MasterProfileBack")}
          </Button>
          <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] text-4xl ml-10">
            {t("Detailsaboutthemaster")}
          </h2>
        </div>
        <div className="bg-[#B9B9C9] rounded-[20px] overflow-hidden shadow-lg w-full ">
          <div className="relative h-[440px] w-full p-10">
            <img
              src={masterDetails.attachmentId ? `${attachment}${masterDetails.attachmentId}` : 'https://picsum.photos/200/300.jpg'}
              alt="Service environment"
              className="w-full h-full object-cover rounded-[20px]"
              onError={(e) => (e.currentTarget.src = 'https://picsum.photos/200/300.jpg')}
            />
          </div>

          <div className="p-6">
            <div className="flex items-center gap-6">
              {masterDetails.mainPhoto ? (
                <img
                  src={`${attachment}${masterDetails.mainPhoto}`}
                  alt={masterDetails.fullName}
                  className="w-[153px] h-[153px] rounded-full object-cover  shadow-lg"
                />
              ) : (
                <div className="w-[153px] h-[153px] rounded-full  shadow-lg bg-gray-300 flex items-center justify-center">
                  <FaRegUser size={50} className="text-[#9c0b35]" />
                </div>
              )}

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{masterDetails.fullName}</h1>
                    <p className="font-medium font-manrope text-[24px] text-gray-600">{masterDetails.salonName}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className=" ">
                      <Rate
                        disabled
                        value={masterDetails.feedbackCount}
                        className="text-[#9C0B35] w-[41px] h-[45px]"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                      />
                    </div>
                    <p className="font-medium font-manrope text-[24px] text-gray-600">
                      {masterDetails.orderCount} {t("order")}, {masterDetails.clientCount} {t("clients")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex align-center justify-between py-10">
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="text-[#9C0B35] w-[40px] h-[45px] flex-shrink-0" />
                <span className="font-manrope font-medium text-[24px] text-[#4F4F4F]">
                  {masterDetails.district} {masterDetails.street} {masterDetails.house}
                </span>
              </div>
              <div className="flex items-center gap-3 ">
                <Phone className="text-[#9C0B35] w-[44px] h-[44px] flex-shrink-0" />
                <span className="font-manrope font-medium text-[24px] text-[#4F4F4F]">{masterDetails.phone}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-3">
              <p className="font-medium font-manrope text-[24px]">
                {t("NextEntry")}: <span className="font-medium">{t("Today")}</span>
              </p>
              <p className="text-[#9C0B35] font-bold text-[22px]">
                {t("from")} {masterDetails.masterServicePrice}
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleAppointmentClick}
                className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
              >
                {t("Signup")}
              </Button>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-white text-center font-medium text-3xl mb-8">{gallery.length > 0 ? t("MasterProfileGallery") :""}</h2>
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
          <TestimonialSlider masterId={id || ""} />
        </section>
      </main>

      <UniversalModal isOpen={isModalOpen} onClose={closeModal}>
        {page === 1 ? (
          <div className="p-6 bg-[#B9B9C9] rounded-[20px]">
            <div className="text-center mb-6">
              <h2 className="font-manrope font-extrabold text-4xl text-gray-900 mb-2">{t("Signup")}</h2>
            </div>
            <div>
              <CalendarTimeSelection masterId={id} onTimeSelect={handleTimeSelect} />
            </div>
            {errorMessage && <div className="text-red-600 text-center mt-4 mb-2">{errorMessage}</div>}
            <div className="flex justify-center mt-6">
              <Button
                className="w-full max-w-md h-16 rounded-[40px] bg-[#9C0B35] text-white font-bold text-lg hover:bg-[#7d092a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  globalDataFuncCode()
                }}
                disabled={!selectedDateTime || isSubmitting}
              >
                {isSubmitting ? t("Signup") : selectedDateTime ? t("Signup") : t("Signup")}
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
                }}
                value={otpCodeInput}
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
                  {t("ApplicationAccepted")}
                </h2>
                <p className="font-manrope font-medium text-[#4F4F4F] text-[22px] text-center">
                  {t("Yourequest")}
                  <br />
                  {t("bookersmobile")}
                </p>
                <div className="pt-10">
                  <Button
                    className="w-[340px] h-[66px] rounded-[40px] border-2 border-[#9C0B35] text-[#9C0B35] font-bold text-[18px] leading-[30px] hover:bg-[#9C0B35] hover:text-white"
                    onClick={() => window.open('https://apps.apple.com/uz/app/bookers-%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%83%D1%81%D0%BB%D1%83%D0%B3/id6503646200', '_blank')}
                  >
                    {t("Downloadapp")}
                  </Button>
                </div>
              </div>
            </div>
          ) : response?.status === "WAIT" ? (
            <div className="p-6 rounded-[20px]">
              <div className="flex flex-col items-center justify-center gap-10 py-10">
                <IoMdCheckmarkCircleOutline style={{ color: "#9C0B35", fontSize: "100px" }} />
                <h2 className="font-manrope font-extrabold text-4xl text-gray-900 mb-2 text-center">{t("approval")}</h2>
                <p className="font-manrope font-medium text-[#4F4F4F] text-[22px] text-center">
                  {t("Yourequest")}
                  <br />
                  {t("bookersmobile")}
                </p>
                <div className="pt-10">
                  <Button
                    className="w-[340px] h-[66px] rounded-[40px] border-2 border-[#9C0B35] text-[#9C0B35] font-bold text-[18px] leading-[30px] hover:bg-[#9C0B35] hover:text-white"
                    onClick={() => window.open('https://apps.apple.com/uz/app/bookers-%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%83%D1%81%D0%BB%D1%83%D0%B3/id6503646200', '_blank')}
                  >
                    {t("Downloadapp")}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-[20px]">
              <div className="flex flex-col items-center justify-center gap-10 py-10">
                <IoAlertCircleOutline style={{ color: "#9C0B35", fontSize: "100px" }} />
                <h2 className="font-manrope font-extrabold text-4xl text-gray-900 mb-2 text-center">
                  {t("technician")}
                </h2>
                <p className="font-manrope font-medium text-[#4F4F4F] text-[22px] text-center">{t("Tosignup")}</p>
                <div className="pt-10">
                  <Button
                    className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] "
                    onClick={() => alert("Войти / Регистрация")}
                  >
                    {t("Signup")}
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

