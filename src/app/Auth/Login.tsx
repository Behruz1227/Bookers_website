import { UniversalModal } from "@/components/Modal/UniversalModal";
import { usePhoneCheck } from "@/hooks/usePhoneCheck";
import { useSendCode } from "@/hooks/useSendCode";
import { message, Select, Space, Input } from "antd";
import { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import usePhoneCheckStore from "@/Store/PhoneCheckStore";
import useSendCodeStore from "@/Store/SendCodeStore";
import { useLogin } from "@/hooks/useLogin";
import useLoginCheckStore from "@/Store/LoginStore";
import { useCheckCode } from "@/hooks/useCheckCode";
import useCheckCodeStore from "@/Store/CheckCodeStore";
import FileInput from "@/components/input/file-input";
import { useRegisterMaster } from "@/hooks/useRegister";
import { saveAuthData } from "@/helpers/Token";
import LoginIndex from "@/Store";
import Loading from "@/components/Loading/Loading";
import { useTranslation } from "react-i18next";

interface FileState {
    file: File
    name: string
    url: string
}
export const Login: React.FC = () => {
    const { loginRole: userRole, loginHolat, lang: userLang, setLoginHolat, setLoginRole } = LoginIndex();
    const [isModalOpen, setModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [role, setRole] = useState<string | null>(userRole);
    const [phoneNumberInput, setPhoneNumberInput] = useState<string>("");
    const [otpCodeInput, setOtpCodeInput] = useState<string | null>(null);
    const [status, setStatus] = useState<'Login' | 'OTPcode' | 'Registration' | 'Ok' | 'Selection' | null>(null);
    const [checkBox, setCheckBox] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nickname, setNickname] = useState("");
    const [lang, setLang] = useState(userLang);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { t } = useTranslation()
    const toastBtn = (text: string, type: "success" | "error") => {
       
        messageApi.open({
            type,
            content: text,
        });
    };

    const { checkPhoneNumberBtn } = usePhoneCheck(phoneNumberInput, role);
    const { setPhoneCheck, PhoneCheck, loading } = usePhoneCheckStore();

    const { SendCodeBtn } = useSendCode(phoneNumberInput, role, PhoneCheck?.success);
    const { setSendCode, SendCode, loading: loadingSendCode } = useSendCodeStore();

    const { LoginBtn } = useLogin(phoneNumberInput, role, otpCodeInput);
    const { setLoginCheck, LoginCheck, loading: loadingLogin, } = useLoginCheckStore();

    const { CheckCodeBtn } = useCheckCode(phoneNumberInput, otpCodeInput);
    const { setCheckCode, CheckCode, loading: loadingCheckCode } = useCheckCodeStore();

    const { loading: registerMasterLoading, response, registerMaster } = useRegisterMaster(
        firstName,
        lastName,
        nickname,
        phoneNumberInput,
        lang,
        role,
        imageFile as File
    );
    const handleOtpSubmit = () => {
        if (otpCodeInput?.length !== 4) {
            toastBtn(t('Введите действительный одноразовый пароль'), 'error');
            return;
        }
        if (PhoneCheck === null) {
            CheckCodeBtn();
        } else if (PhoneCheck === true) {
            LoginBtn();
        }
    };
    useEffect(() => {
        if (PhoneCheck?.message === "Telefon raqami allaqachon mavjud" && PhoneCheck?.status === 'OK' && status === 'Login') {
            SendCodeBtn();
            setPhoneCheck(true);
        } else if (PhoneCheck?.message === "Phone number bazada topilmadi." && PhoneCheck?.status === 'OK' && status === 'Login') {
            SendCodeBtn();
            setPhoneCheck(null);
        } else if (SendCode?.success === true && SendCode?.message === "Success" && status === 'Login') {
            setStatus('OTPcode');
            setSendCode(null)
        } else if (LoginCheck?.success === true && status === 'OTPcode') {
            setStatus('Ok');
            saveAuthData(LoginCheck?.body, LoginCheck?.message);
        } else if (CheckCode?.body === phoneNumberInput && CheckCode?.success === true && CheckCode?.message === "Muvaffaqiyatli" && status === 'OTPcode') {
            setStatus('Registration');
        } else if (LoginCheck?.success === false && LoginCheck?.status === "OK" && LoginCheck?.message === "Kod mos emas") {
            toastBtn(t('Код неправильный'), 'error');
        } else if (CheckCode?.success === false && CheckCode?.status === "OK" && CheckCode?.message === "Kod mos emas") {
            toastBtn(t('Код неправильный'), 'error');
        } else if (LoginCheck?.success === false && LoginCheck?.status === "OK") {
            toastBtn(t('Номер телефона заблокирован'), 'error');
        } if (response?.success === true && response?.message === "Muvaffaqiyatli" && status === "Registration") {
            saveAuthData(response?.body, role ? role : '');
            setStatus('Ok');
        } if (response?.success === false && response?.message === 'Telefon raqami allaqachon mavjud' && status === "Registration") {
            toastBtn(t('Номер телефона уже существует'), 'error');
        }
    }, [PhoneCheck, SendCode, LoginCheck, CheckCode, response]);

    const handleChange = (value: string) => {
        setRole(value);
    };

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
        setPhoneNumberInput(cleanedPhoneNumber);
    };
    const handleFileSelect = (fileState: FileState | null) => {
        setImageFile(fileState?.file ? fileState.file : null)
    }
    useEffect(() => {
        if (userRole === null) {
            if (loginHolat === true) {
                setModalOpen(true);

                setStatus('Selection');
            }
        } else if (userRole !== null) {
            if (loginHolat === true) {
                setModalOpen(true);
                setStatus('Login');
                setRole(userRole);
            }
        }
    }, [loginHolat])

    function RegisterBtn() {
        if (checkBox) {
            if (role === 'MASTER' &&  phoneNumberInput.length === 13 && firstName.length > 0 && lastName.length > 0 && nickname.length >= 2) {
                registerMaster();
            } else if (role === 'CLIENT'&& phoneNumberInput.length === 13 && firstName.length > 0 && lastName.length > 0) {
                registerMaster();
            }else {
                toastBtn(t('заполните информацию'), 'error');
                console.log(phoneNumberInput.length, userRole, firstName.length, lastName.length, nickname.length);
                
            }
        } else {
            toastBtn(t('подтвердить условия'), 'error');
            return;
        }
    }
    return (
        <div>
            {contextHolder}
            {
                loading || loadingCheckCode || loadingSendCode || loadingLogin || registerMasterLoading
                    ? <Loading />
                    : null
            }
            <UniversalModal
                isOpen={isModalOpen}
                onClose={() => {
                    setRole(null);
                    setStatus(null);
                    setModalOpen(false);
                    setPhoneNumberInput('');
                    setPhoneCheck(null);
                    setLoginCheck(null);
                    setSendCode(null);
                    setCheckCode(null);
                    setOtpCodeInput('');
                    setPhoneNumber('+998');
                    setImageFile(null);
                    setLang('uz');
                    setFirstName('');
                    setLastName('');
                    setNickname('');
                    setLoginHolat(false);
                    setLoginRole(null);
                }}
                style={`max-h-[90vh] ${status === 'Login' || status === 'Selection' ? 'w-[70%]' : 'w-[90%]'} `}
            >
                <div className="w-full grid place-items-center my-5 mb-16">
                    {status === 'Ok' && <IoMdCheckmarkCircleOutline size={130} color="#9C0B35" className='mx-auto' />}
                    <h1 className="text-3xl font-semibold my-5">
                        {status === 'Login' && t('Регистрация / Вход')}
                        {status === 'OTPcode' && t('ОТП код')}
                        {status === 'Selection' && t('Выберите роль')}
                        {status === 'Ok' && response?.success && t('Спасибо за регистрацию !')}
                        {status === 'Ok' && !response?.success && t('Вы вошли в свой аккаунт')}
                        {status === 'Registration' && t('Регистрация')}
                    </h1>
                    {status === 'Selection' && (
                        <div className="my-6">
                            <Space wrap>
                                <Select
                                    style={{ width: 200 }}
                                    allowClear
                                    onChange={handleChange}
                                    options={[
                                        { value: 'MASTER', label: t('Мастер') },
                                        { value: 'CLIENT', label: t('Клиент') }
                                    ]}
                                    placeholder={t('Выберите роль')}
                                />
                            </Space>
                        </div>
                    )}
                    {status === 'Login' && (
                        <div className='my-8'>
                            <div className="flex justify-center w-[300px] sm:w-[500px] s ">
                                <div className="phone-input-w-full rounded-md">
                                    <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
                                        {t('Номер телефона*')}
                                    </label>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        value={phoneNumber}
                                        onChange={handleInputChange}
                                        className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                                        maxLength={19} // +998 dan keyin 9 ta raqam bo'lishi mumkin
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {status === 'OTPcode' && (
                        <div className="w-full grid place-items-center text-center">
                            <h2 className='text-2xl font-semibold my-5'>
                                {phoneNumberInput.length === 13 ? `${phoneNumberInput}` : '+998 (__) ___ __ __'}
                            </h2>
                            <p className='text-slate-600 mb-6'>{t('Мы отправили вам SMS с кодом подтверждения.')}</p>
                            <div className="w-[60%] lg:w-[50%] otp-input p-6">
                                <Input.OTP
                                    length={4}
                                    onInput={(value) => {
                                        setOtpCodeInput(value.join(''))
                                        setLoginCheck(null);
                                        setCheckCode(null);
                                    }}
                                    inputMode='numeric'
                                    formatter={(str) => str.replace(/\D/g, '')}
                                    size='large'
                                    status={LoginCheck?.success === false || CheckCode?.success === false ? 'error' : ''}
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        justifyContent: 'between',
                                        gap: '10px',
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {status === 'Ok' && (
                        <div className='text-center px-[10%]'>
                            <div className='text-xl text-slate-600 text-center'>
                                <p className=' '>{t('Личный кабинет веб сайта находится на стадии разработки')}</p>
                                <p>{t('Полный доступ к личному кабинету')}</p>
                                <p>{t('Вы можете получить в мобильном приложении Bookers')}</p>
                            </div>
                            <div className='text-4xl font-semibold my-4 text-center'>
                                <p>{t('Мы уведомим вас о готовности веб кабинета')}</p>
                                <p>{t('в ближайшее время')}</p>
                            </div>
                        </div>
                    )}
                    {
                        status === 'Registration' && (
                            <div className="w-full grid place-items-center px-16">
                                <h1 className="text-3xl font-semibold my-5">{t('Форма регистрации мастера')}</h1>
                                <div className="grid sm:grid-cols-2 grid-cols-1 justify-between w-full gap-4">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2" htmlFor="firstName">{t('Имя*')}</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2" htmlFor="lastName">{t('Фамилия')}</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                                        />
                                    </div>
                                    {
                                        role === "MASTER" && (
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2" htmlFor="lastName">{t('Псевдоним')}</label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    onChange={(e) => setNickname(e.target.value)}
                                                    className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                                                />
                                            </div>
                                        )
                                    }
                                    <div className="">
                                        <div className=" ">
                                            <label className="block text-gray-700 font-medium mb-2" htmlFor="file">{t('Прикрепить фото')}</label>
                                            <FileInput onFileSelect={handleFileSelect} />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center flex justify-center ">
                                    <p className="text-slate-600 my-8"><div className="inline-flex items-center pr-5 ">
                                        <label className="flex items-center cursor-pointer relative">
                                            <input onChange={(e) => setCheckBox(e.target.checked)} type="checkbox" className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-500 checked:bg-[#9C0B35] checked:border-[#9C0B35]" placeholder="." />
                                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                                </svg>
                                            </span>
                                        </label>
                                    </div>{t('Я соглашаюсь с условиями пользовательского соглашения и политикой конфиденцциальности.')}</p>
                                </div>
                            </div>
                        )
                    }
                    <button
                        className={`${status !== 'Ok' ? ' bg-[#9C0B35] text-white py-4 hover:bg-[#ae2e50] px-16 rounded-full' : ''} 
               ${loading || loadingSendCode || loadingLogin || loadingCheckCode || registerMasterLoading ? 'opacity-50 cursor-not-allowed' : ''} 
               ${status === 'Ok' ? 'mt-4 text-[#9C0B35] border border-[#9C0B35] py-4 hover:bg-[#88797d] px-16 rounded-full' : ''}`}
                        onClick={() => {
                            if (status === 'Selection') {
                                if (!role) {
                                    toastBtn(t('Выберите роль'), 'error');
                                } else {
                                    setStatus('Login');
                                }
                            } else if (status === 'Login') {
                                if (phoneNumberInput.length === 13) {
                                    checkPhoneNumberBtn();
                                } else {
                                    toastBtn(t('Пожалуйста, введите действительный номер телефона.'), 'error');
                                }
                            } else if (status === 'OTPcode') {
                                handleOtpSubmit();
                            } else if (status === 'Registration') {
                                RegisterBtn()
                            }
                        }}
                        disabled={loading || loadingSendCode || loadingLogin || loadingCheckCode || registerMasterLoading}>
                        {status === 'Selection' && (loading ? t('Загрузка') : t('Продолжить'))}
                        {status === 'Login' && (loading || loadingSendCode ? t('Загрузка') : t('Продолжить'))}
                        {status === 'OTPcode' && (loadingLogin || loadingCheckCode ? t('Загрузка') : t('Отправить отзыв'))}
                        {status === 'Ok' && t('Скачать приложение')}
                        {status === 'Registration' && (registerMasterLoading ? t('Загрузка') : t('Зарегистрироваться'))}
                    </button>
                </div>
            </UniversalModal>
        </div>
    );
};
