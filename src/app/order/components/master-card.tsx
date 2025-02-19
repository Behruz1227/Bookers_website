import "react-toastify/dist/ReactToastify.css"

import {useState} from "react"
import {Rate} from "antd"
import {HiOutlineLocationMarker} from "react-icons/hi"
import {attachment} from "@/helpers/Url"
import Button from "@/components/button/Button"

import {useTranslation} from "react-i18next"
import {FaRegUser} from "react-icons/fa6"

interface MasterProps {
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
    secondButtonTitle?: string
    mainPhoto?: string
    onClick?: () => void
}

export default function MasterCard(
    {
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
        secondButtonTitle = "Записаться",
        mainPhoto,
        onClick
    }: MasterProps) {
    const {t} = useTranslation()
    const [imageLoading, setImageLoading] = useState(true)

    const imageUrl = attachmentId ? attachment + attachmentId : mainPhoto ? attachment + mainPhoto : null

    return (
        <div
            className="bg-[#B9B9C9] w-full rounded-[20px] text-gray-800 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-4">
                {imageUrl && (
                    <div className="relative pb-[56.25%]">
                        {imageLoading && (
                            <div
                                className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 rounded-[20px]">
                                <div
                                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9C0B35]"></div>
                            </div>
                        )}
                        <img
                            src={imageUrl || "/placeholder.svg"}
                            alt={`${name}'s service`}
                            className={`absolute top-0 left-0 w-full h-full object-cover rounded-[20px] transition-opacity duration-300 ${
                                imageLoading ? "opacity-0" : "opacity-100"
                            }`}
                            onLoad={() => setImageLoading(false)}
                        />
                    </div>
                )}

                <div className="flex items-center gap-4 mt-4 mb-3">
                    {avatar ? (
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-full shrink-0">
                            {imageLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                    <div
                                        className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#9C0B35]"></div>
                                </div>
                            )}
                            <img
                                src={attachment + avatar || "/placeholder.svg"}
                                alt={name}
                                className="w-full h-full object-cover"
                                onLoad={() => setImageLoading(false)}
                            />
                        </div>
                    ) : (
                        <div
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
                            <FaRegUser size={24} className="text-[#9c0b35]  sm:size={30}"/>
                        </div>
                    )}

                    <div>
                        <div className="flex flex-col sm:flex-row sm:gap-2">
                            <h3 className="font-bold font-manrope text-[20px] sm:text-[24px]">{name}</h3>
                            {salon && (
                                <>
                                    <span
                                        className="hidden sm:inline font-manrope font-bold text-[20px] sm:text-[24px]">/</span>
                                    <span className="font-manrope font-medium text-[20px] sm:text-[24px]">{salon}</span>
                                </>
                            )}
                        </div>

                        {role && (
                            <p className="font-manrope font-medium text-[14px] sm:text-[16px] text-[#4F4F4F]">{role}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between py-3">
                        <Rate disabled value={feedbackCount} className="text-[#9C0B35] text-md sm:text-lg"/>
                        <span className="font-manrope font-medium text-[14px] sm:text-[16px] text-[#4F4F4F]">
                            {orderCount} {t("order")}, {clientCount} {t("clients")}
                        </span>
                    </div>

                    {address && (
                        <div className="flex items-center gap-2">
                            <HiOutlineLocationMarker className="text-[#9C0B35] flex-shrink-0  size={20} sm:size={25}"/>
                            <span
                                className="font-manrope font-medium text-[14px] sm:text-[16px] text-[#4F4F4F]">{address}</span>
                        </div>
                    )}

                    <div className="flex justify-between items-center py-3">
                        <span className="font-medium font-manrope text-[18px] sm:text-[22px]">
                            {t("NextEntry")}: {t("Today")}
                        </span>
                        {masterServicePrice && (
                            <span className="text-[#9C0B35] font-semibold text-md sm:text-lg">
                                {t("from")} {masterServicePrice}
                            </span>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex flex-col md:flex-row justify-center gap-3">
                    <Button
                        onClick={onClick}
                        className="w-full md:w-[280px] lg:w-[340px] h-[40px] md:h-[55px] lg:h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[14px] md:text-[16px] lg:text-[18px] leading-[24px] md:leading-[26px] lg:leading-[30px]"
                    >
                        {secondButtonTitle}
                    </Button>
                </div>
            </div>
        </div>
    )
}