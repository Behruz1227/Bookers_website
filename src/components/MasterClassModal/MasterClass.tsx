import LoginIndex from "@/Store";
import { UniversalModal } from "../Modal/UniversalModal";
import { useEffect, useState } from "react";
import { useSendCode } from "@/hooks/useSendCode";
import useSendCodeStore from "@/Store/SendCodeStore";
import { Input } from "antd";
import useCheckCodeStore from "@/Store/CheckCodeStore";
import { useCheckCode } from "@/hooks/useCheckCode";
import { useMasterClass } from "@/hooks/useMasterClass";
import useMasterClassStore from "@/Store/MasterClassStore";
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
    const { masterClassHolat, setMasterClassHolat } = LoginIndex();
    const [status, setStatus] = useState<'MasterClass' | 'OTPcode' | 'Ok' | 'Error'>('MasterClass');
    const [phoneNumber, setPhoneNumber] = useState<string>("+998");
    const [OTPcode, setOTPcode] = useState<null | string>(null);
    const [btnStatus, setBtnStatus] = useState<boolean>(false);


    const [formData, setFormData] = useState<FormData>({
        nameSalonOrMaster: "",
        eventType: "",
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

        setFormData({
            nameSalonOrMaster: "",
            eventType: "",
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
            minute: !formData.minute,
            eventDescription: !formData.eventDescription,
            contactInformation: formData.contactInformation.length !== 13,
            eventLocation: !formData.eventLocation,
            additionalInformation: !formData.additionalInformation,
            participationFee: !formData.participationFee,
            active: !formData.active
        };
        setErrors(newErrors);

        if (Object.values(newErrors).includes(true)) {
            console.log('malumot yoz');

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

    return (
        <div>
            <UniversalModal isOpen={masterClassHolat} onClose={() => {
                setMasterClassHolat(false)
                setStatus('MasterClass')
                resetForm()
            }}
                style="max-h-[90vh] lg:w-[60%] w-[85%]"
            >
                <div className="w-full grid place-items-center my-5 px-11 mb-16">
                    <h1 className="text-3xl font-bold text-center mb-3">
                        {status === 'MasterClass' && 'Форма заявки'}
                        {status === 'OTPcode' && 'ОТП код'}
                    </h1>
                    {
                        status === 'MasterClass' && (
                            <div className="w-full grid grid-cols-2 gap-4">
                                <div className="col-start-1 col-end-2">
                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="firstName">Имя мастера или название салона*</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="nameSalonOrMaster"
                                        value={formData.nameSalonOrMaster}
                                        placeholder='Full Name'
                                        onChange={handleChange}
                                        className={`border-2 ${errors.nameSalonOrMaster ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                                </div>
                                <div className="col-start-2 col-end-3">
                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">Тип мероприятия*</label>
                                    <select
                                        id="lastName"
                                        name="eventType"
                                        value={formData.eventType}
                                        onChange={handleChange}
                                        className={`border-2 ${errors.eventType ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `}>
                                        <option value="MASTER_CLASS">Мастер-класс</option>
                                        <option value="COURSE">Курс</option>
                                        <option value="TRAINING">Тренинг</option>
                                        <option value="OTHER">Другое обучающее мероприятие</option>
                                    </select>

                                </div>
                                <div className="col-start-1 col-end-3">
                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">Название мероприятия*</label>
                                    <textarea
                                        id="lastName"
                                        name="eventName"
                                        placeholder='Event Name'
                                        value={formData.eventName}
                                        onChange={handleChange}
                                        className={`border-2 ${errors.eventName ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                                </div>
                                <div className="col-start-1 col-end-2">
                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">Дата проведения*</label>
                                    <input
                                        type="date"
                                        id="lastName"
                                        name="eventDate"
                                        value={formData.eventDate}
                                        onChange={handleChange}
                                        className={`border-2 ${errors.eventDate ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                                </div>
                                <div className="col-start-2 col-end-3">
                                    <label className="block font-medium mb-1">Время проведения*</label>
                                    <div className="flex gap-2">
                                        <select
                                            aria-label="select"
                                            name="hour"
                                            value={formData.hour}
                                            onChange={handleChange}
                                            className="w-1/2 p-3 border rounded focus:outline-blue-500"
                                            required
                                        >
                                            {Array.from({ length: 24 }, (_, i) => (
                                                <option key={i} value={i}>{`${i} ч.`}</option>
                                            ))}
                                        </select>
                                        <select
                                            aria-label="select"
                                            name="minute"
                                            value={formData.minute}
                                            onChange={handleChange}
                                            className="w-1/2 p-3 border rounded focus:outline-blue-500"
                                            required
                                        >
                                            {Array.from({ length: 60 }, (_, i) => (
                                                <option key={i} value={i}>{`${i} мин.`}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-start-1 col-end-3">

                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">Описание мероприятия*</label>

                                    <textarea
                                        id="lastName"
                                        name="eventDescription"
                                        placeholder='Event Description'
                                        value={formData.eventDescription}
                                        onChange={handleChange}
                                        className={`border-2 ${errors.eventDescription ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                                </div>
                                <div className="col-start-1 col-end-2">

                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">Контактная информация*</label>

                                    <input
                                        type="text"
                                        id="lastName"
                                        name="contactInformation"
                                        placeholder='Contact Information'
                                        value={phoneNumber}
                                        onChange={handleInputChange}
                                        className={`border-2 ${errors.contactInformation ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                                </div>
                                <div className="col-start-2 col-end-3">

                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">Место проведения*</label>

                                    <input
                                        type="text"
                                        id="lastName"
                                        name="eventLocation"
                                        placeholder='Event Location'
                                        value={formData.eventLocation}
                                        onChange={handleChange}
                                        className={`border-2 ${errors.eventLocation ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                                </div>
                                <div className="col-start-1 col-end-2">
                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">Дополнительная информация</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="additionalInformation"
                                        placeholder='Event Location'
                                        value={formData.additionalInformation}
                                        onChange={handleChange}
                                        className={`border-2 ${errors.additionalInformation ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                                </div>
                                <div className="col-start-2 col-end-3">

                                    <label className="block text-gray-700 font-medium  mb-2" htmlFor="lastName">Стоимость участия</label>

                                    <input
                                        type="number"
                                        id="lastName"
                                        name="participationFee"
                                        placeholder='Participation Fee'
                                        value={formData.participationFee}
                                        onChange={handleChange}
                                        className={`border-2 ${errors.participationFee ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
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
                            <div>
                                error
                            </div>
                        )
                    }
                    {
                        status === 'Ok' && (
                            <div>
                                ok
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
                                        alert("Iltimos Kod ni to'liq kiriting")
                                    }
                                }
                            }}
                            disabled={btnStatus} // Tugma faqat status false bo'lganda bosiladi
                            className={`mt-4  py-4 px-16 rounded-full 
                                ${status !== 'Ok' ? '' : 'hidden'} 
                                ${status !== 'Error' ? '' : 'hidden'} 
                                ${!btnStatus ? "bg-[#9C0B35] text-white" : "bg-[#d12253] text-white0"}`}
                        >
                            {status === 'OTPcode' && (
                                btnStatus ? "Loading..." : "Отправить отзыв"
                            )}
                            {status === 'MasterClass' && (
                                btnStatus ? "Loading..." : "Отправить заявку"
                            )}
                        </button>
                    </div>
                </div>



            </UniversalModal>
        </div>
    );
};
