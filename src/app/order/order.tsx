import {useParams} from "react-router-dom";
import {useGlobalRequest} from "@/helpers/Quary/quary.tsx";
import {BASE_URL, currentByMaster, currentByMasterGallery} from "@/helpers/Url.tsx";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Loading from "@/components/Loading/Loading.tsx";
import MasterCard from "@/app/order/components/master-card.tsx";
import CalendarTimeSelection from "@/components/CalendarTimeSelection.tsx";
import Button from "@/components/button/Button.tsx";
import {Input} from "antd";
import {IoMdCheckmarkCircleOutline} from "react-icons/io";
import {IoAlertCircleOutline} from "react-icons/io5";
import {UniversalModal} from "@/components/Modal/UniversalModal.tsx";
import {toast} from "react-toastify";
import GradientText from "@/app/order/components/header.tsx";
import MasterGallery, {IMasterGallery} from "@/app/order/components/master-gallery.tsx";
import Feedback from "@/app/order/components/feedback.tsx";

const Order = () => {
    const {t} = useTranslation()
    const {id} = useParams<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [masterData, setMasterData] = useState<null | any>(null)
    const [activeTab, setActiveTab] = useState<0 | 1 | 2 | 3>(0)
    const [page, setPage] = useState(1)
    const [selectedDateTime, setSelectedDateTime] = useState<{ date: string; time: string } | null>(null)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [userFullName, setUserFullName] = useState("")
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [otpCodeInput, setOtpCodeInput] = useState<string>("")

    const {globalDataFunc: fetchMastersBy} = useGlobalRequest(`${currentByMaster}${id}`, "GET")
    const {
        globalDataFunc: masterGalleryFetch,
        // loading: masterGalleryLoading,
        response: masterGalleryResponse
    } = useGlobalRequest(`${currentByMasterGallery}${id}`, "GET")
    const {
        // response: responseCode,
        globalDataFunc: globalDataFuncCode,
    } = useGlobalRequest(`${BASE_URL}/api/auth/sendCode/web`, "POST", {phoneNumber: phoneNumber?.replace(/[^\d+]/g, "")})
    const {
        response: responseCheck,
        globalDataFunc: globalDataFuncCheck,
        error: errorCheck,
    } = useGlobalRequest(`${BASE_URL}/api/auth/checkCode?code=${otpCodeInput}`, "POST", {phoneNumber: phoneNumber?.replace(/[^\d+]/g, "")})

    const {response, globalDataFunc} = useGlobalRequest(`${BASE_URL}/api/order/save/web`, "POST", {
        serviceId: masterData?.serviceId,
        date: selectedDateTime?.date,
        timeHour: selectedDateTime?.time.split(":")[0],
        timeMin: selectedDateTime?.time.split(":")[1],
        fullName: userFullName,
        phoneNumber: phoneNumber?.replace(/[^\d+]/g, ""),
    })
    const {
        response: responseStatus,
        globalDataFunc: globalDataFuncStatus
    } = useGlobalRequest(`${BASE_URL}/api/order/status/${response?.body}`, 'GET')

    useEffect(() => {
        if (id) {
            setLoading(true)
            fetchMastersBy()
                .then((res: any) => {
                    if (res?.success) setMasterData(res.body)
                    else setMasterData(null)
                })
                .catch(() => setMasterData(null))
                .finally(() => setLoading(false))
        }
    }, []);

    useEffect(() => {
        if (id && activeTab === 1) masterGalleryFetch().then(() => "")
    }, [activeTab, id, masterGalleryFetch]);

    useEffect(() => {
        if (responseCheck?.success) {
            setOtpCodeInput("")
            globalDataFunc().then(() => "")
        } else if (!responseCheck?.success) toast.error(responseCheck?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }, [responseCheck, errorCheck])

    useEffect(() => {
        if (response?.success) {
            if (response?.body) globalDataFuncStatus().then(() => "")
        } else if (response?.message === 'O\'tib ketgan vaqt uchun order qilolmaysiz') toast.error(response?.message)
    }, [response]);

    useEffect(() => {
        if (responseStatus?.body === 'CREATED') setPage(2)
        if (responseStatus?.body === 'WAIT') setPage(2)
    }, [responseStatus]);

    const handleTimeSelect = (date: string, time: string) => setSelectedDateTime({date, time})

    const formatPhoneNumber = (value: string): string => {
        const cleanedValue: string = value.replace(/[^\d+]/g, "");
        if (!cleanedValue.startsWith("+998")) return "+998";

        const number = cleanedValue.substring(0, 13);
        const match = number.match(/^(\+998)(\d{2})(\d{3})(\d{2})(\d{2})$/);
        if (match) return `${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;

        return number;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const formattedPhoneNumber = formatPhoneNumber(value);
        setPhoneNumber(formattedPhoneNumber);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false)
        setPage(1)
        setActiveTab(0)
        setUserFullName("")
        setPhoneNumber("")
        setSelectedDateTime(null)
    }

    return (
        <div className={'my-5'}>
            <div className={'text-center mt-5 mb-10'}>
                {activeTab === 0 && <GradientText text="Подробности о мастере"/>}
                {activeTab === 1 && <GradientText text="Записаться"/>}
                {activeTab === 2 && <GradientText text="Введите своё имя и телефон"/>}
            </div>
            {activeTab === 0 && (<>
                {loading ? <Loading/> : masterData ? (
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2">
                        <MasterCard
                            attachmentId={masterData.mainPhoto}
                            avatar={masterData.attachmentId}
                            name={masterData.fullName}
                            salon={masterData.salonName || ""}
                            role={masterData.masterSpecialization?.[0] || t("Мастер")}
                            address={`${masterData.district || ""} ${masterData.street || ""} ${masterData.house || ""}`}
                            masterServicePrice={masterData.masterServicePrice?.toString() || "0"}
                            feedbackCount={masterData.feedbackCount || 0}
                            orderCount={masterData.orderCount || 0}
                            clientCount={masterData.clientCount || 0}
                            secondButtonTitle={t("bronqilish")}
                            onClick={() => setActiveTab(1)}
                        />
                    </div>
                ) : null}
            </>)}
            {activeTab === 1 && (<>
                <div className="p-4 sm:p-6 bg-[#B9B9C9] rounded-[20px]">
                    <div className="text-center mb-4 sm:mb-6">
                        <h2 className="font-manrope font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-2">
                            {t("bronqilish")}
                        </h2>
                    </div>
                    <CalendarTimeSelection isNotToken masterId={masterData?.id} onTimeSelect={handleTimeSelect}/>
                    <div className="flex justify-center mt-4 sm:mt-6">
                        <Button
                            className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px] h-[50px] sm:h-[58px] md:h-[62px] lg:h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-base sm:text-lg leading-[30px] hover:opacity-90"
                            onClick={() => setActiveTab(2)}
                            disabled={!selectedDateTime}
                        >
                            {selectedDateTime ? t("bronqilish") : t("bronqilish")}
                        </Button>
                    </div>
                </div>
                <div className={'my-10'}>
                    <div className={'text-center mb-5'}><GradientText text={'Gallery'}/></div>
                    {masterGalleryResponse?.body?.length > 0 ? (<div className={'grid grid-cols-1 gap-7'}>
                        {masterGalleryResponse?.body?.map((item: IMasterGallery, index: number) => (
                            <MasterGallery {...item} key={index}/>
                        ))}
                    </div>) : null}
                </div>
                <div className={'my-10'}>
                    <div className={'text-center mb-5'}><GradientText text={'Отзывы'}/></div>
                    <Feedback/>
                </div>
            </>)}
            {activeTab === 2 && (<>
                <div className="p-4 sm:p-6 bg-[#B9B9C9] rounded-[20px]">
                    <div className="my-8">
                        <div className="grid grid-cols-1 gap-5 w-full md:px-32">
                            <div className="rounded-md w-full">
                                <label
                                    htmlFor="fullName"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    {t("fullName*")}
                                </label>
                                <input
                                    id="fullName"
                                    value={userFullName}
                                    onChange={e => setUserFullName(e.target.value)}
                                    className="border-2 border-gray-700 bg-[#B9B9C9] p-3 rounded-xl w-full focus:outline-none focus:ring-0"
                                />
                            </div>
                            <div className="w-full rounded-md">
                                <label
                                    htmlFor="phoneNumber"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    {t("Номер телефона*")}
                                </label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={handleInputChange}
                                    className="border-2 border-gray-700 bg-[#B9B9C9] p-3 rounded-xl w-full focus:outline-none focus:ring-0"
                                    maxLength={19}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex items-center flex-col gap-10 sm:gap-14 md:gap-16 lg:gap-20 justify-center otp-input p-6"
                    >
                        <Button
                            className="w-full max-w-md h-12 sm:h-14 md:h-16 rounded-[40px] bg-[#9C0B35] text-white font-bold text-base sm:text-lg hover:bg-[#7d092a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={async () => {
                                await globalDataFuncCode()
                                openModal()
                                setPage(1)
                            }}
                            disabled={!phoneNumber || !userFullName}
                        >
                            {t("Signup")}
                        </Button>
                    </div>
                </div>
            </>)}

            <UniversalModal isOpen={isModalOpen} onClose={closeModal}>
                {page === 1 ? (
                    <div className="p-6  rounded-[20px]">
                        <div className="flex flex-col items-center justify-center text-center">
                            <h1 className="font-manrope font-extrabold text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] leading-[40px] sm:leading-[46px] md:leading-[50px] lg:leading-[54px]">{t("OTPCode")}</h1>
                            <h2 className="font-bold font-manrope text-[20px] sm:text-[24px] md:text-[28px] lg:text-[30px] leading-[28px] sm:leading-[32px] md:leading-[34px] lg:leading-[36px] pt-5">
                                {phoneNumber}
                            </h2>
                            <p className="font-manrope font-medium text-[#4F4F4F] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] leading-[18px] sm:leading-[20px] md:leading-[22px] lg:leading-[24px]">{t("sentCode")}</p>
                        </div>
                        <div
                            className="flex items-center flex-col gap-10 sm:gap-14 md:gap-16 lg:gap-20 justify-center otp-input p-6">
                            <Input.OTP
                                length={4}
                                onInput={(value: string[]) => setOtpCodeInput(value.join(""))}
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
                                onClick={globalDataFuncCheck}
                                disabled={!otpCodeInput}
                            >
                                {t("Signup")}
                            </Button>
                        </div>
                    </div>
                ) : page === 2 ? (
                    responseStatus?.body === "CREATED" ? (
                        <div className="p-4 sm:p-6 rounded-[20px]">
                            <div className="flex flex-col items-center justify-center gap-6 sm:gap-10 py-6 sm:py-10">
                                <IoMdCheckmarkCircleOutline className="text-[#9C0B35] text-6xl sm:text-[100px]"/>
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
                                        onClick={() => window.open('https://apps.apple.com/uz/app/bookers-%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%83%D1%81%D0%BB%D1%83%D0%B3/id6503646200', '_blank')}
                                    >
                                        {t("Скачать приложение")}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : responseStatus?.body === "WAIT" ? (
                        <div className="p-4 sm:p-6 rounded-[20px]">
                            <div className="flex flex-col items-center justify-center gap-6 sm:gap-10 py-6 sm:py-10">
                                <IoMdCheckmarkCircleOutline className="text-[#9C0B35] text-6xl sm:text-[100px]"/>
                                <h2 className="font-manrope font-extrabold text-2xl sm:text-4xl text-gray-900 mb-2 text-center">{t("Ваша запись отправленана утверждение мастеру")}</h2>
                                <p className="font-manrope font-medium text-[#4F4F4F] text-lg sm:text-[22px] text-center">
                                    {t("Ваша заявка принята. Cтатус вашей записи можно")}
                                    <br/>
                                    {t("отслеживать в мобильном приложении bookers")}
                                </p>
                                <div className="pt-6 sm:pt-10">
                                    <Button
                                        className="w-[240px] sm:w-[340px] h-[50px] sm:h-[66px] rounded-[30px] sm:rounded-[40px] border-2 border-[#9C0B35] text-[#9C0B35] font-bold text-[16px] sm:text-[18px] leading-[26px] sm:leading-[30px]"
                                        onClick={() => window.open('https://apps.apple.com/uz/app/bookers-%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%83%D1%81%D0%BB%D1%83%D0%B3/id6503646200', '_blank')}
                                    >
                                        {t("Скачать приложение")}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 sm:p-6 rounded-[20px]">
                            <div className="flex flex-col items-center justify-center gap-6 sm:gap-10 py-6 sm:py-10">
                                <IoAlertCircleOutline className="text-[#9C0B35] text-6xl sm:text-[100px]"/>
                                <h2 className="font-manrope font-extrabold text-2xl sm:text-4xl text-gray-900 text-center">
                                    {t("Вы не можете записаться на услугу мастера")}
                                </h2>
                                <p className="font-manrope font-medium text-[#4F4F4F] text-lg sm:text-[22px] text-center">
                                    {t("Что бы записаться необходимо пройти")}
                                </p>
                                <div className="pt-6 sm:pt-10">
                                    <Button
                                        className="w-[240px] sm:w-[340px] h-[50px] sm:h-[66px] rounded-[30px] sm:rounded-[40px]  bg-[#9C0B35] text-white font-bold text-[16px] sm:text-[18px] leading-[26px] sm:leading-[30px]"
                                        onClick={() => closeModal()}
                                    >
                                        {t("Записаться")}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                ) : null}
            </UniversalModal>
        </div>
    );
};

export default Order;