

import { UniversalModal } from "../Modal/UniversalModal";
import LoginIndex from "@/Store";
import { useUploadFile } from "@/hooks/useUploadFile";
import useUploadFileStore from "@/Store/UploadFileStore";
import { message } from "antd";
import { X } from "lucide-react";
import img from '../../assets/img/File_dock_add (1).png'
import { useEffect, useState } from "react";
import useVacanciesStore from "@/Store/VacanciesStore";
import { useVacancies } from "@/hooks/useVacancies";
import { useTranslation } from "react-i18next";
interface FormData {
    fullName: string;
    email: string;
    phone: string;
    type: boolean;
}

interface Errors {
    fullName: boolean;
    email: boolean;
    phone: boolean;
    type: boolean;
    file1: boolean;
    file2: boolean;
}

export const VacanciesModal = () => {
    const { vacanciesHolat, setVacanciesHolat } = LoginIndex();
    const [resumeIds, setResumeIds] = useState<string>("null");
    const [documentIds, setDocumentIds] = useState<string>("null");
    const [phoneNumber, setPhoneNumber] = useState<string>("+998");
    const [file1, setFile1] = useState<File | null>(null);
    const [file2, setFile2] = useState<File | null>(null);
    const [status, setStatus] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const toastBtn = (text: string, type: "success" | "error") => {
        messageApi.open({
            type,
            content: text,
        });
    };
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phone: "",
        type: false,
    });



    const data = {
        "fullName": formData.fullName,
        "email": formData.email,
        "phone": formData.phone,
        "resumeIds": [
            resumeIds
        ],
        "documentIds": [
            documentIds
        ]
    }

    const { uploadFile } = useUploadFile();
    const { fileResponse, setFileResponse } = useUploadFileStore();
    const { setResponse, Response } = useVacanciesStore();
    const { VacanciesSave } = useVacancies(data)

    const [errors, setErrors] = useState<Errors>({
        fullName: false,
        email: false,
        phone: false,
        type: false,
        file1: false,
        file2: false,
    });


    // Fayl yuklash va javob boshqaruvi
    useEffect(() => {

        if (fileResponse) {
            if (resumeIds === "null") {
                setResumeIds(fileResponse.body);
            } else {
                setDocumentIds(fileResponse.body);
            }
            setFileResponse(null);
        } else if (resumeIds !== "null" && documentIds !== "null") {
            VacanciesSave();
            resetForm();
        } else if (Response?.success === true) {
            setStatus(false);
            toastBtn(t('Загружено успешно'), 'success');
            setVacanciesHolat(false)
            setResponse(null);
        } else if (Response?.success === false) {
            setStatus(false);
            toastBtn(t('Произошла ошибка'), 'error');
            setResponse(null);
        }
    }, [fileResponse, resumeIds, documentIds, setFileResponse, Response]);

    // Formani tozalash
    const resetForm = () => {
        setResumeIds("null");
        setDocumentIds("null");
        setPhoneNumber("+998");
        setFile1(null);
        setFile2(null);
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            type: false,
        });
        setErrors({
            fullName: false,
            email: false,
            phone: false,
            type: false,
            file1: false,
            file2: false,
        });

    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: false }));

    };



    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    ////////////////////////////////////////////////////////////////

    const { t } = useTranslation()


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
        handleChange(e);
        setFormData((prev) => ({
            ...prev,
            phone: cleanedPhoneNumber,
        }));

    };
    // ///
    const validateForm = (): boolean => {
        const newErrors: Errors = {
            fullName: !formData.fullName,
            email: !isEmailValid(formData.email),
            phone: formData.phone.length !== 13,
            type: !formData.type,
            file1: !file1,
            file2: !file2,
        };
        setErrors(newErrors);

        if (Object.values(newErrors).includes(true)) {
            toastBtn(t('заполните детали'), 'error');
            return false;
        }

        return true;
    };

    const handleFileUpload = (file: File | string | null) => {
        if (file && typeof file !== "string") {
            uploadFile(file);
        }
    };

    const handleSubmit = () => {
        if (validateForm()) {
            setStatus(true);
            handleFileUpload(file1);
            handleFileUpload(file2);
        }
    };






    const handleFileChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]; // Faqat bitta faylni olish
        if (selectedFile) {
            setFile1(selectedFile); // Faylni state ichida saqlash
        } else {
            setFile1(null); // Fayl tanlanmasa state-ni tozalash
        }
    };
    const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]; // Faqat bitta faylni olish
        if (selectedFile) {
            setFile2(selectedFile); // Faylni state ichida saqlash
        } else {
            setFile2(null); // Fayl tanlanmasa state-ni tozalash
        }
    };
    return (
        <div>
            {contextHolder}
            <UniversalModal
                isOpen={vacanciesHolat}
                onClose={() => {
                    setVacanciesHolat(false)
                    resetForm();
                    setStatus(false);
                }}
                style="max-h-[90vh] lg:w-[60%] w-[80%]"
            >

                <div className="w-full grid place-items-center my-5 mb-16" >
                    <h1 className="font-semibold md:text-1xl text-xl text-center px-12 pb-8">{t('Пожалуйста, заполните форму ниже для рассмотрения вашей кандидатуры. Прикрепите ваше резюме и, при необходимости, другие документы, подтверждающие вашу квалификацию.')}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 justify-center  gap-y-4 md:gap-6 w-full px-12 my-6">
                        <div className="col-start-1 col-end-2">
                            <label className="block text-gray-700 font-medium  mb-2" htmlFor="firstName">{t('Имя и фамилия*')}</label>
                            <input
                                type="text"
                                id="firstName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`border-2 ${errors.fullName ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                        </div>
                        <div className="col-start-1 md:col-start-2 col-end-2 md:col-end-3">
                            <label className="block text-gray-700 font-medium  mb-2" htmlFor="email">{t('Email*')}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`border-2 ${errors.email ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `} />
                        </div>
                        <div className="col-start-1 col-end-2">
                            <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
                                {t('Телефон*')}
                            </label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phone"
                                value={phoneNumber}
                                onChange={handleInputChange}
                                className={`border-2 ${errors.phone ? "border-red-500" : "border-gray-700"} bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 `}
                                maxLength={19} // +998 dan keyin 9 ta raqam bo'lishi mumkin
                            />
                        </div>
                        <div className="col-start-1 col-end-3 flex flex-col md:flex-row gap-3">

                            <div className=" mx-auto md:mx-0 flex flex-col md:items-start items-center">
                                <label htmlFor="phoneNumber" className={`block  ${errors.file1 ? "text-red-500" : "text-gray-700"} font-medium mb-2`}>
                                  {t('Резюме*')}
                                </label>
                                <div className="max-w-[200px] px-6 py-2  border-2 border-[#9C0B35] rounded-full flex items-center justify-between"
                                    onClick={() => document.getElementById('fileInput1')?.click()}>
                                    <input className="hidden" type="file" id="fileInput1" placeholder="." onChange={(e) => {
                                        handleFileChange1(e)
                                    }} />
                                    <img src={img} alt="" className="w-8 h-8" />
                                    <span className="truncate text-[#9C0B35] font-semibold">
                                        {file1 ? file1.name : t('Выбрать файл')}
                                    </span>
                                    {file1 && (
                                        <button
                                            aria-label="Close"
                                            onClick={() => {
                                                setFile1(null);
                                            }}
                                            className="ml-2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="w-4 h-4 text-[#9C0B35]" />
                                        </button>
                                    )}

                                </div>
                            </div>

                            <div className=" mx-auto md:mx-0 flex flex-col md:items-start  items-center">
                                <label htmlFor="phoneNumber" className={`block ${errors.file2 ? "text-red-500" : "text-gray-700"} font-medium mb-2`}>
                                    {t('Дополнительные документы')}
                                </label>
                                <div className="px-6 py-2 max-w-[200px] border-2 border-[#9C0B35] rounded-full flex items-center justify-between"
                                    onClick={() => document.getElementById('fileInput2')?.click()}>
                                    <input className="hidden" type="file" id="fileInput2" placeholder="." onChange={(e) => {
                                        handleFileChange2(e)
                                    }} />
                                    <img src={img} alt="" className="w-8 h-8" />
                                    <span className="truncate text-[#9C0B35] font-semibold">
                                        {file2 ? file2.name : t('Выбрать файл')}
                                    </span>
                                    {file2 && (
                                        <button
                                            aria-label="Close"
                                            onClick={() => {
                                                setFile2(null);
                                            }}
                                            className="ml-2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="w-4 h-4 text-[#9C0B35]" />
                                        </button>
                                    )}

                                </div>
                            </div>

                        </div>
                        {/*  */}

                        {/*  */}

                    </div>

                    <div className="text-center flex justify-center items-center px-12 mb-5">
                        <p className={`${errors.type ? "text-red-500" : "text-gray-700"} my-2 flex items-center`}>
                            <label className="flex items-center cursor-pointer relative">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    type="checkbox"
                                    name="type"
                                    className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-500 checked:bg-[#9C0B35] checked:border-[#9C0B35]"
                                    placeholder="."
                                />
                                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </span>
                            </label>
                            <span className="ml-2">
                                {t('Я согласен на обработку моих персональных данных в соответствии с политикой конфиденциальности.')}
                            </span>
                        </p>
                    </div>
                    <div >
                        <button
                            onClick={handleSubmit}
                            disabled={status} // Tugma faqat status false bo'lganda bosiladi
                            className={`mt-4  py-4 px-16 rounded-full  ${!status ? "bg-[#9C0B35] text-white" : "bg-[#d12253] text-white0"}`}
                        >
                            {status ? t('Загрузка') : t('Отправить резюме')}
                        </button>

                    </div>

                </div>

            </UniversalModal>

        </div>
    );
};
