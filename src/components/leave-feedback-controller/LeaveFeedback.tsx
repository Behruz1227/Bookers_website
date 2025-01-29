import { useEffect, useState } from "react";
import { UniversalModal } from "../Modal/UniversalModal"
import FileInput from "../input/file-input";
import { Input, Select } from "antd";
import { useGlobalRequest } from "@/helpers/Quary/quary";
import { useSendCode } from "@/hooks/useSendCode";
import useSendCodeStore from "@/Store/SendCodeStore";
import { useCheckCode } from "@/hooks/useCheckCode";
import useCheckCodeStore from "@/Store/CheckCodeStore";
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useUploadFile } from "@/hooks/useUploadFile";
import useUploadFileStore from "@/Store/UploadFileStore";
import LoginIndex from "@/Store";
import { leaveFeedbackMasterOrSalonSearch, leaveFeedbackSave } from "@/helpers/Url";
import { useTranslation } from "react-i18next";

export const LeaveFeedback = () => {
    const { setOtzivHolat, otzivHolat, setLoginRole, setLoginHolat } = LoginIndex();
    const [status, setStatus] = useState<'otziv' | 'OTPcode' | 'Ok' | 'Error'>('otziv');
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [masterOrSalon, setMasterOrSalon] = useState("");
    const [masterOrSalonStatus, setMasterOrSalonStatus] = useState<boolean>(false);
    const [review, setReview] = useState("");
    const [photo, setPhoto] = useState<File | ''>('');
    const [isConsentGiven, setConsentGiven] = useState(false);
    const [otpCodeInput, setOtpCodeInput] = useState("");
    const [searchText, setSearchText] = useState<string>(''); // Qidiruv so'zi
    const { uploadFile } = useUploadFile();
    const { fileResponse, isLoading, setFileResponse } = useUploadFileStore();

    const apiUrl = `${leaveFeedbackMasterOrSalonSearch}?name=${searchText}`;
    const { response, globalDataFunc } = useGlobalRequest(apiUrl, "GET");
    const data = {
        "clientName": firstName,
        "email": email,
        "phoneNumber": phone,
        "masterOrSalonId": masterOrSalon,
        "feedback": review,
        "attachmentId": fileResponse ? fileResponse?.body : '',
        "master": masterOrSalonStatus,
        "agree": true
    }
    const { response: res, globalDataFunc: globalDataFunc2 } = useGlobalRequest(leaveFeedbackSave, "POST", data);
    const { SendCodeBtn } = useSendCode(phone, "CLIENT", false);
    const { setSendCode, setError, SendCode, loading: loadingSendCode, error: errorSendCode } = useSendCodeStore();


    const { CheckCodeBtn } = useCheckCode(phone, otpCodeInput);
    const { setCheckCode, CheckCode, loading: loadingCheckCode } = useCheckCodeStore();



    const [timer, setTimer] = useState<number | null>(null);
    const startTimer = () => {
        setTimer(60); // 1 daqiqa taymerni boshlash
    };

    const handleResendCode = () => {
        startTimer(); // Taymerni qayta ishga tushirish
    };

    useEffect(() => {
        if (timer !== null && timer > 0) {
            const timeout = setTimeout(() => {
                setTimer((prev) => (prev ? prev - 1 : null)); // Har soniya kamaytirish
            }, 1000);
            return () => clearTimeout(timeout); // Tozalash
        }
    }, [timer]);
    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Form validation
    const isFormValid =
        firstName.trim() !== "" &&
        phone.trim() !== "" && phone.trim().length === 13 &&
        masterOrSalon.trim() !== "" &&
        review.trim() !== "" &&
        isConsentGiven &&
        isEmailValid(email);


    interface FileState {
        file: File
        name: string
        url: string
    }
    const handlePhotoUpload = (fileState: FileState | null) => {
        setPhoto(fileState?.file ? fileState.file : '')

    }


    const handleSubmit = () => {
        if (isFormValid) {
            SendCodeBtn();
        }
    };
    const { t } = useTranslation()


    //-------------------------------------
    const [phoneNumber, setPhoneNumber] = useState<string>("+998");

    const formatPhoneNumber = (value: string) => {
        // Remove non-digit characters except '+'
        const cleanedValue = value.replace(/[^\d+]/g, "");

        // Ensure the number starts with +998
        if (!cleanedValue.startsWith("+998")) {
            return "+998";
        }

        // Limit the input to 13 characters
        const number = cleanedValue.substring(0, 13);

        // Apply the format: +998 (_93) 171 63 80
        const match = number.match(/^(\+998)(\d{2})(\d{3})(\d{2})(\d{2})$/);
        if (match) {
            return `${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;
        }
        return number;
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const formattedPhoneNumber = formatPhoneNumber(value);
        setPhoneNumber(formattedPhoneNumber);

        // Log the cleaned phone number without formatting (e.g. +998970703839)
        const cleanedPhoneNumber = value.replace(/[^\d+]/g, "");
        setPhone(cleanedPhoneNumber);
    };

    interface MasterOrSalon {
        masterOrSalonId: string;
        masterOrSalonName: string;
        roleName: string | null;
    }
    const options = response?.body.map((item: MasterOrSalon) => ({
        value: item.masterOrSalonId,
        label: (
            <span
                className={`${item.roleName ? 'text-[#9C0B35]' : 'text-blue-700'}`}
            >
                {item.masterOrSalonName}
            </span>
        ),
        rawLabel: item.masterOrSalonName, // Foydalanuvchi tanlaganida qaytarish uchun
        roleName: item.roleName, // RoleName ni saqlash
    }));
    useEffect(() => {
        globalDataFunc();
        setMasterOrSalon('')
    }, [searchText]);

    useEffect(() => {
        if (SendCode?.message === "Success" && SendCode?.success === true && otzivHolat) {
            setStatus("OTPcode");
            if (photo !== '') {
                uploadFile(photo);
            }
            handleResendCode();
            setSendCode(null);
        } else if (errorSendCode == 'Request failed with status code 400' && otzivHolat) {
            setStatus("Error");
            setFirstName('');
            setEmail('');
            setPhone('');
            setMasterOrSalon('');
            setReview('');
            setPhoto('');
            setConsentGiven(false);
            setSearchText('');
            setSendCode(null);
            setCheckCode(null);
            setPhoneNumber('+998');
            setError(null);
            setTimer(null);
            setFileResponse(null);
        } else if (CheckCode?.body === phone && CheckCode?.message === "Muvaffaqiyatli" && CheckCode?.success === true && status === "OTPcode" && otzivHolat) {
            setCheckCode(null);
            globalDataFunc2()
        } else if (CheckCode?.message == "Kod mos emas" && CheckCode?.success === false && status === "OTPcode" && otzivHolat) {
            setCheckCode(null);
        } else if (res?.message === "Sizning sharhingiz qabul qilindi. Rahmat!" && res?.success === true && status === "OTPcode" && otzivHolat) {
            setStatus("Ok");
            setPhoneNumber('+998');
            setSendCode(null);
            setCheckCode(null);
            setTimer(null);
        }
    }, [errorSendCode, SendCode, CheckCode, res]);

    return (
        <>
            <UniversalModal isOpen={otzivHolat} onClose={() => {
                setOtzivHolat(false);
                setMasterOrSalonStatus(false);
                setReview('');
                setEmail('');
                setPhone('');
                setFirstName('');
                setPhoto('');
                setConsentGiven(false);
                setSearchText('');
                setStatus('otziv');
                setMasterOrSalon('');
                setSendCode(null);
                setError(null);
                setCheckCode(null);
                setFileResponse(null);
                setPhoneNumber('+998');
            }} style="max-h-[90vh] w-[90%] lg:w-[65%]">
                <div className="w-full grid place-items-center my-5 mb-16">
                    {
                        status === 'otziv' && (
                            <div className="px-[4%]">
                                <h1 className="font-bold text-xl lg:text-3xl px-[14%] text-center">{t('Заполните форму заявки для оформления отзыва и обеспечения видимости в мобильном приложении и на сайте bookers отправьте заявку.')}</h1>
                                <div className="grid grid-cols-1 lg:grid-cols-2 justify-center  gap-y-4 lg:gap-6 w-full my-6 px-6">
                                    <div className="col-start-1 col-end-2">
                                        <label className="block text-gray-700 font-medium  mb-2" htmlFor="firstName">{t('Имя клиента*')}</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                                        />
                                    </div>
                                    <div className="col-start-1 lg:col-start-2 col-end-2 lg:col-end-3">
                                        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">{t('Электронная почта')}</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}

                                            className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                                        />
                                    </div>
                                    <div className="col-start-1 col-end-2">
                                        <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
                                            {t('Телефон*')}
                                        </label>
                                        <input
                                            type="text"
                                            id="phoneNumber"
                                            value={phoneNumber}
                                            onChange={handleInputChange}
                                            className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                                            maxLength={13} // +998 dan keyin 9 ta raqam bo'lishi mumkin
                                        />
                                    </div>
                                    <div className="col-start-1 lg:col-start-2 col-end-2 lg:col-end-3">
                                        <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">{t('Название мастера или салона красоты*')}</label>
                                        <Select
                                            showSearch
                                            allowClear
                                            optionFilterProp="children"
                                            value={masterOrSalon || undefined} // Tanlangan qiymat
                                            filterOption={(input, option) =>
                                                option?.rawLabel.toLowerCase().includes(input.toLowerCase()) || false
                                            }
                                            className="border-2 masterOrSalonName border-gray-700 bg-[#B9B9C9] py-4 px-6 rounded-xl w-full focus:outline-none focus:ring-0"
                                            options={options}
                                            style={{ width: '100%', height: '66%' }}
                                            onSearch={(value: string) => {
                                                setSearchText(value);
                                                if (masterOrSalon) {
                                                    setMasterOrSalon(''); // Tanlangan qiymatni o'chirish
                                                }
                                            }}
                                            onChange={(value: string) => {
                                                const selectedOption = options.find((option: { value: string; roleName: string | null; }) => option.value === value);
                                                setMasterOrSalon(selectedOption?.value);
                                                setMasterOrSalonStatus(selectedOption?.roleName == null ? false : true);
                                            }}
                                            onClear={() => {
                                                setMasterOrSalon('');
                                                setSearchText('');
                                            }}
                                        />
                                    </div>
                                    <div className="col-start-1 col-end-3">
                                        <label className="block text-gray-700 font-medium mb-2" htmlFor="review">{t('Отзыв*')}</label>
                                        <textarea
                                            id="review"
                                            onChange={(e) => setReview(e.target.value)}
                                            className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                                        ></textarea>
                                    </div>
                                    <div className="col-start-1 col-end-2 grid justify-start ">

                                        <label className="block text-gray-700 font-medium mb-2" htmlFor="file">{t('Прикрепить ваши фото')}</label>
                                        <FileInput onFileSelect={handlePhotoUpload} />

                                    </div>
                                </div>

                                <div className="text-center flex justify-center ">
                                    <p className="text-slate-600 my-4"><div className="inline-flex items-center pr-5 ">
                                        <label className="flex items-center cursor-pointer relative">
                                            <input onChange={(e) => setConsentGiven(e.target.checked)} type="checkbox" className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-500 checked:bg-[#9C0B35] checked:border-[#9C0B35]" placeholder="." />
                                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                                </svg>
                                            </span>
                                        </label>
                                    </div>{t('Я согласен(на) на публикацию моего отзыва на сайте и в мобильном приложении bookers.')}</p>
                                </div>

                            </div>
                        )
                    }
                    {
                        status === 'OTPcode' && (
                            <div className="w-full grid place-items-center">
                                <h1 className="font-bold text-4xl">{t('ОТП код')}</h1>
                                <p className="font-bold text-2xl my-5">{phone}</p>
                                <p className="text-[#59595c]">{t('Мы отправили вам SMS с кодом подтверждения.')}</p>
                                <div className="w-[60%] lg:w-[50%] otp-input p-6">
                                    <Input.OTP
                                        length={4}
                                        onInput={(value) => {
                                            setOtpCodeInput(value.join(''));
                                        }}
                                        inputMode='numeric'
                                        formatter={(str) => str.replace(/\D/g, '')}
                                        size='large'
                                        // status={LoginCheck?.success === false || CheckCode?.success === false ? 'error' : ''}
                                        style={{
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'between',
                                            gap: '10px',
                                        }}
                                    />

                                </div>

                                {timer !== null && timer > 0
                                    ? <p className="text-[#59595c]">{t('Отправить код заново')}{timer} {t('сек')}</p>
                                    : <p className="text-[#9C0B35]" onClick={() => {
                                        handleResendCode()
                                        SendCodeBtn()
                                    }}>{ }{t('Отправить повторно')}</p>}

                            </div>
                        )
                    }
                    {
                        status === 'Error' && (
                            <div className="grid place-items-center">
                                <MdOutlineErrorOutline size={100} color="#9C0B35" />
                                <h1 className="font-bold text-4xl text-center my-3">{t('Вы не можете оставить отзыв')}</h1>
                                <p className="text-center text-xl">{t('Что бы оставить отзыв, необходимо пройти регистрацию клиента')}</p>
                            </div>
                        )
                    }
                    {
                        status === 'Ok' && (
                            <div className="grid place-items-center">
                                <IoMdCheckmarkCircleOutline size={130} color="#9C0B35" className='mx-auto' />
                                <h1 className="font-bold text-4xl text-center my-3">{t('Отзыв принят')}</h1>
                                <p className="text-center text-xl">{t('Спасибо что помогаете улучшить наш сервис')}</p>
                            </div>
                        )
                    }
                    {
                        status === 'otziv' && (
                            <button
                                onClick={handleSubmit}
                                className={`mt-4  py-4 px-16 rounded-full  ${isFormValid ? "bg-[#9C0B35] text-white" : "bg-gray-300 text-gray-700"}`}
                                disabled={!isFormValid || loadingSendCode}>
                                {t('Отправить отзыв')}
                            </button>
                        )
                    }
                    {
                        status === 'OTPcode' && (
                            <button
                                onClick={CheckCodeBtn}
                                className={`mt-4  py-4 px-16 rounded-full  ${!loadingCheckCode ? "bg-[#9C0B35] text-white" : "bg-gray-300 text-gray-700"}`}
                                disabled={loadingCheckCode || isLoading}
                            >
                                {t('Отправить отзыв')}
                            </button>
                        )
                    }
                    {
                        status === 'Error' && (
                            <button
                                onClick={() => {
                                    setLoginHolat(true);
                                    setLoginRole("CLIENT");
                                    setOtzivHolat(false);
                                    setMasterOrSalonStatus(false);
                                    setReview('');
                                    setEmail('');
                                    setPhone('');
                                    setFirstName('');
                                    setPhoto('');
                                    setConsentGiven(false);
                                    setSearchText('');
                                    setStatus('otziv');
                                    setMasterOrSalon('');
                                    setSendCode(null);
                                    setError(null);
                                    setCheckCode(null);
                                    setFileResponse(null);
                                    setPhoneNumber('+998');

                                }}
                                className={`mt-4  py-4 px-16 rounded-full  ${!loadingCheckCode ? "bg-[#9C0B35] text-white" : "bg-gray-300 text-gray-700"}`}
                                disabled={loadingCheckCode || isLoading}
                            >
                                {t('Зарегистрироваться')}
                            </button>
                        )
                    }
                </div>
            </UniversalModal>
        </>
    )
}




