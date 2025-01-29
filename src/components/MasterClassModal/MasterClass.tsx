import LoginIndex from "@/Store";
import { UniversalModal } from "../Modal/UniversalModal";
import { useEffect, useRef, useState } from "react";
import { useSendCode } from "@/hooks/useSendCode";
import useSendCodeStore from "@/Store/SendCodeStore";
import { Input, message } from "antd";
import useCheckCodeStore from "@/Store/CheckCodeStore";
import { useCheckCode } from "@/hooks/useCheckCode";
import { useMasterClass } from "@/hooks/useMasterClass";
import useMasterClassStore from "@/Store/MasterClassStore";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineErrorOutline } from "react-icons/md";
import clock from '../../assets/img/Clock.svg'
import { useTranslation } from "react-i18next";
interface FormData {
    nameSalonOrMaster: string;
    eventType: string;
    eventName: string;
    eventDate: string;
    hour: number;
    minute: number;
    eventDescription: string;
    contactInformation: string;
    eventLocation: string;
    additionalInformation: string;
    participationFee: number;
    active: boolean;
}

interface Errors {
    nameSalonOrMaster: boolean;
    eventType: boolean;
    eventName: boolean;
    eventDate: boolean;
    hour: boolean;
    minute: boolean;
    eventDescription: boolean;
    contactInformation: boolean;
    eventLocation: boolean;
    additionalInformation: boolean;
    participationFee: boolean;
    active: boolean;
}
export const MasterClassModal = () => {
    const { t } = useTranslation()
    const { masterClassHolat, setMasterClassHolat, setLoginHolat } = LoginIndex();
    const [status, setStatus] = useState<'MasterClass' | 'OTPcode' | 'Ok' | 'Error'>('MasterClass');
    const [phoneNumber, setPhoneNumber] = useState<string>("+998");
    const [OTPcode, setOTPcode] = useState<null | string>(null);
    const [btnStatus, setBtnStatus] = useState<boolean>(false);
    const [selectedHour, setSelectedHour] = useState<null | number | string>(null); // Boshlang'ich holat null
    const [selectedMinute, setSelectedMinute] = useState<null | number | string>(null); // Boshlang'ich holat null
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference for dropdown
    const hours = [1, 2]; // Soatlar
    const minutes = [0, 5, 10, 45, 15]; // Daqiqalar
    const [messageApi, contextHolder] = message.useMessage();
    const toastBtn = (text: string, type: "success" | "error") => {
        messageApi.open({
            type,
            content: text,
        });
    };
    const [formData, setFormData] = useState<FormData>({
        nameSalonOrMaster: "",
        eventType: "MASTER_CLASS",
        eventName: "",
        eventDate: "",
        hour: 0,
        minute: 0,
        eventDescription: "",
        contactInformation: "",
        eventLocation: "",
        additionalInformation: "",
        participationFee: 0,
        active: true,
    });
    const data = {
        "nameSalonOrMaster": formData.nameSalonOrMaster,
        "eventType": formData.eventType,
        "eventName": formData.eventName,
        "eventDate": formData.eventDate,
        "hour": formData.hour,
        "minute": formData.minute,
        "eventDescription": formData.eventDescription,
        "contactInformation": formData.contactInformation,
        "eventLocation": formData.eventLocation,
        "additionalInformation": formData.additionalInformation,
        "participationFee": formData.participationFee,
        "active": true
    }
    const { SendCodeBtn } = useSendCode(formData.contactInformation, 'MASTER', false);
    const { setSendCode, SendCode, error, setError } = useSendCodeStore();

    const { CheckCodeBtn } = useCheckCode(formData.contactInformation, OTPcode);
    const { setCheckCode, CheckCode } = useCheckCodeStore();

    const { MasterClassSave } = useMasterClass(data)

    const { setMasterClass, Response } = useMasterClassStore();

    useEffect(() => {

        if (SendCode) {
            setStatus('OTPcode');
            setSendCode(null);
            setBtnStatus(false);
        } else if (error) {
            setStatus('Error');
            setError(null);
            setBtnStatus(false);
        } else if (CheckCode?.body === formData.contactInformation && CheckCode?.success === true && CheckCode?.message === "Muvaffaqiyatli" && status === 'OTPcode') {
            MasterClassSave();
            setCheckCode(null);
        } else if (Response) {
            setStatus('Ok');
            resetForm();
            setMasterClass(null);
            setBtnStatus(false);
        }
    }, [SendCode, error, CheckCode, Response]);


    const [errors, setErrors] = useState<Errors>({
        nameSalonOrMaster: false,
        eventType: false,
        eventName: false,
        eventDate: false,
        hour: false,
        minute: false,
        eventDescription: false,
        contactInformation: false,
        eventLocation: false,
        additionalInformation: false,
        participationFee: false,
        active: false,
    });
    const resetForm = () => {
        setPhoneNumber("+998");
        setSelectedHour(null);
        setSelectedMinute(null);
        setShowDropdown(false);
        setBtnStatus(false);
        setFormData({
            nameSalonOrMaster: "",
            eventType: "MASTER_CLASS",
            eventName: "",
            eventDate: "",
            hour: 0,
            minute: 0,
            eventDescription: "",
            contactInformation: "",
            eventLocation: "",
            additionalInformation: "",
            participationFee: 0,
            active: true,
        });
        setErrors({
            nameSalonOrMaster: false,
            eventType: false,
            eventName: false,
            eventDate: false,
            hour: false,
            minute: false,
            eventDescription: false,
            contactInformation: false,
            eventLocation: false,
            additionalInformation: false,
            participationFee: false,
            active: false,
        });

    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, type, value } = e.target;

        // Handle 'checked' only for checkboxes
        const checked = type === "checkbox" && "checked" in e.target ? e.target.checked : undefined;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((prev) => ({ ...prev, [name]: false }));
    };

    const validateForm = (): boolean => {
        const newErrors: Errors = {
            nameSalonOrMaster: !formData.nameSalonOrMaster,
            eventType: !formData.eventType,
            eventName: !formData.eventName,
            eventDate: !formData.eventDate,
            hour: !formData.hour,
            minute: formData.minute < 0 || formData.minute > 60,
            eventDescription: !formData.eventDescription,
            contactInformation: formData.contactInformation.length !== 13,
            eventLocation: !formData.eventLocation,
            additionalInformation: !formData.additionalInformation,
            participationFee: !formData.participationFee,
            active: !formData.active
        };
        setErrors(newErrors);

        if (Object.values(newErrors).includes(true)) {
            return false;
        }

        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log(formData);
            SendCodeBtn();
            setBtnStatus(true);
        }
    };


    ////////////////////////////////////////////////////////////////




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
        const cleanedPhoneNumber = value.replace(/[^\d+]/g, "");
        handleChange(e);

        setFormData((prev) => ({
            ...prev,
            contactInformation: cleanedPhoneNumber,
        }));
    }



useEffect(() => {
    // Close dropdown if click is outside of the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false); // Close the dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // Listen for click events
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup the event listener
    };
  }, []);


    return (
        <div>
            {contextHolder}
            <UniversalModal isOpen={masterClassHolat} onClose={() => {
                setMasterClassHolat(false)
                setStatus('MasterClass')
                resetForm()
            }}
                style="max-h-[90vh] xl:w-[60%] w-[85%]"
            >
                <div className="w-full grid place-items-center my-5 px-11 mb-16">
                    <h1 className="text-3xl font-bold text-center mb-3">
                        {status === 'MasterClass' && t('Форма заявки')}
                        {status === 'OTPcode' && t('ОТП код')}
                        {status === 'Ok' && <IoMdCheckmarkCircleOutline size={130} color="#9C0B35" className='mx-auto' />}
                        {status === 'Error' && <MdOutlineErrorOutline size={100} color="#9C0B35" />}
                    </h1>
                    {
                        status === 'MasterClass' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 justify-center  gap-y-4 md:gap-6 w-full ">
                                <div className="col-start-1 col-end-3 md:col-end-2">
                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="firstName">{t('Имя мастера или название салона*')}</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="nameSalonOrMaster"
                                        value={formData.nameSalonOrMaster}
                                        onChange={handleChange}
                                        className={`border-2 ${errors.nameSalonOrMaster ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                                </div>
                                <div className="col-start-1 md:col-start-2 col-end-3">
                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">{t('Тип мероприятия*')}</label>
                                    <select
                                        id="lastName"
                                        name="eventType"
                                        value={formData.eventType}
                                        onChange={handleChange}
                                        className={`border-2 ${errors.eventType ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `}>
                                        <option value="MASTER_CLASS">{t('Мастер-класс')}</option>
                                        <option value="COURSE">{t('Курс')}</option>
                                        <option value="TRAINING">{t('Тренинг')}</option>
                                        <option value="OTHER">{t('Другое обучающее мероприятие')}</option>
                                    </select>

                                </div>
                                <div className="col-start-1 col-end-3">
                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">{t('Название мероприятия*')}</label>
                                    <textarea
                                        id="lastName"
                                        name="eventName"
                                        value={formData.eventName}
                                        onChange={handleChange}
                                        className={`border-2 ${errors.eventName ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                                </div>
                                <div className="col-start-1 col-end-3 md:col-end-2">
                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">{t('Дата проведения*')}</label>
                                    <input
                                        type="date"
                                        id="lastName"
                                        name="eventDate"
                                        value={formData.eventDate}
                                        onChange={handleChange}
                                        className={`border-2 ${errors.eventDate ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                                </div>
                                <div className="col-start-1 md:col-start-2 col-end-3">
                                    <label className="block text-gray-700 font-medium  mb-2">{t('время проведения*')}</label>
                                    <div className="flex gap-2">

                                        <div ref={dropdownRef}  className={`  cursor-pointer relative border-2 ${errors.hour || errors.minute ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0`}>
                                            {/* Input */}
                                            <div onClick={() => setShowDropdown(!showDropdown)} 
                                                className="flex items-center justify-between"
                                                
                                            >
                                                <span className="text-gray-600">
                                                    {selectedHour !== null && selectedMinute !== null
                                                        ? `${selectedHour} ч. ${selectedMinute} мин.`
                                                        : ""}
                                                </span>
                                                <img src={clock} className="w-6 h-6" alt="icon" />
                                            </div>

                                            {/* Dropdown menyu */}
                                            {showDropdown && (
                                                <div className="absolute md:w-[50%] w-[100%] top-[4.5rem] right-0 bg-[#B9B9C9] border rounded-xl shadow-lg z-10 ">
                                                    <div className="grid grid-cols-2 justify-center p-[5%] gap-x-[5%]">
                                                        {/* Hours Column */}
                                                        <div className="border-none">
                                                            {hours.map((hour) => (
                                                                <button
                                                                    key={hour}
                                                                    className={`w-full px-4  py-2 text-left text-sm rounded-[10px] hover:text-white ${selectedHour === hour ? "bg-[#9C0B35] text-white" : "text-gray-800"
                                                                        }`}
                                                                    onClick={() => {
                                                                        setSelectedHour(hour);
                                                                        setFormData((prev) => ({
                                                                            ...prev,
                                                                            hour: hour,
                                                                        }));
                                                                    }}
                                                                >
                                                                    {`${hour} ч.`}
                                                                </button>
                                                            ))}
                                                        </div >

                                                        {/* Minutes Column */}
                                                        <div className="border-none">
                                                            {minutes.map((minute) => (
                                                                <button
                                                                    key={minute}
                                                                    className={`w-full px-4 py-2 text-left text-sm rounded-[10px]  hover:text-white ${selectedMinute === minute ? "bg-[#9C0B35] text-white" : "text-gray-800"
                                                                        }`}
                                                                    onClick={() => {
                                                                        setSelectedMinute(minute);
                                                                        setFormData((prev) => ({
                                                                            ...prev,
                                                                            minute: minute,
                                                                        }));
                                                                    }}
                                                                >
                                                                    {`${minute} мин.`}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-start-1 col-end-3">

                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">{t('Описание мероприятия*')}</label>

                                    <textarea
                                        id="lastName"
                                        name="eventDescription"                                      
                                        value={formData.eventDescription}
                                        onChange={handleChange}
                                        className={`border-2 ${errors.eventDescription ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                                </div>
                                <div className="col-start-1 col-end-3 md:col-end-2">

                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">{t('Контактная информация*')}</label>

                                    <input
                                        type="text"
                                        id="lastName"
                                        name="contactInformation"
                                        value={phoneNumber}
                                        onChange={handleInputChange}
                                        className={`border-2 ${errors.contactInformation ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                                </div>
                                <div className="col-start-1 md:col-start-2 col-end-3">

                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">{t('Место проведения*')}</label>

                                    <input
                                        type="text"
                                        id="lastName"
                                        name="eventLocation"
                                        value={formData.eventLocation}
                                        onChange={handleChange}
                                        className={`border-2 ${errors.eventLocation ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                                </div>
                                <div className="col-start-1 col-end-3 md:col-end-2">
                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">{t('Дополнительная информация')}</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="additionalInformation"
                                        value={formData.additionalInformation}
                                        onChange={handleChange}
                                        className={`border-2 ${errors.additionalInformation ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                                </div>
                                <div className="col-start-1 md:col-start-2 col-end-3">

                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">{t('Стоимость участия')}</label>

                                    <input
                                        type="number"
                                        id="lastName"
                                        name="participationFee"
                                        value={formData.participationFee}
                                        onChange={handleChange}
                                        
                                        className={`border-2 focus:none ${errors.participationFee ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                                </div>
                            </div>
                        )
                    }{
                        status === 'OTPcode' && (

                            <div className="w-[90%] lg:w-[60%] otp-input p-6">
                                <Input.OTP
                                    length={4}
                                    onInput={(value) => {
                                        setOTPcode(value.join(''));
                                    }}
                                    inputMode='numeric'
                                    formatter={(str) => str.replace(/\D/g, '')}
                                    size='large'
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        justifyContent: 'between',
                                        gap: '10px',
                                    }}
                                />

                            </div>

                        )
                    }
                    {
                        status === 'Error' && (
                            <div className="grid place-items-center">
                                <h1 className="text-3xl font-bold text-center">{t('Отклонено')}</h1>
                                <p className="text-xl w-[80%] mt-6 text-slate-600 text-center">{t('Что бы оставить заявку на мастеркласс  необходимо пройти регистрацию мастера')}</p>
                            </div>
                        )
                    }
                    {
                        status === 'Ok' && (
                            <div className="grid place-items-center">
                                <h1 className="text-3xl font-bold text-center">{t('Принято')}</h1>
                                <p className="text-xl w-[80%] mt-6 text-slate-600 text-center">{t('Ваша заявка принята и скоро будет опубликована на этом сайте в разделе “НОВОСТИ”')}</p>
                            </div>
                        )
                    }
                    <div className="mt-4">
                        <button
                            onClick={() => {

                                if (status === 'MasterClass') {
                                    handleSubmit();
                                } else if (status === 'OTPcode') {
                                    if (OTPcode?.length === 4) {
                                        CheckCodeBtn()
                                        setBtnStatus(true)
                                    } else {
                                        toastBtn(t('Введите действительный одноразовый пароль'), 'error');
                                    }
                                } else if (status === 'Error') {
                                    setLoginHolat(true)
                                    setMasterClassHolat(false)
                                    setStatus('MasterClass')
                                }
                            }}
                            disabled={btnStatus} // Tugma faqat status false bo'lganda bosiladi
                            className={`mt-4  py-4 px-16 rounded-full 
                                ${status !== 'Ok' ? '' : 'hidden'} 
                                ${!btnStatus ? "bg-[#9C0B35] text-white" : "bg-[#d12253] text-white0"}`}
                        >
                            {status === 'OTPcode' && (
                                btnStatus ? t('Загрузка') : t('Отправить заявку')
                            )}
                            {status === 'MasterClass' && (
                                btnStatus ? t('Загрузка') : t('Отправить заявку')
                            )}
                            {status === 'Error' && (
                                t("Зарегистрироваться")
                            )}
                        </button>
                    </div>
                </div>



            </UniversalModal>
        </div>
    );
};
