import { UniversalModal } from "@/components/Modal/UniversalModal";
import { usePhoneCheck } from "@/hooks/usePhoneCheck";
import { useSendCode } from "@/hooks/useSendCode";
import { message, Select, Space, Input } from "antd";
import { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import usePhoneCheckStore from "@/Store/PhoneCheckStore";
import useSendCodeStore from "@/Store/SendCode";
import { useLogin } from "@/hooks/useLogin";
import useLoginCheckStore from "@/Store/LoginStore";
import { useCheckCode } from "@/hooks/useCheckCode";
import useCheckCodeStore from "@/Store/CheckCode";
import FileInput from "@/components/input/file-input";
import { useRegisterMaster } from "@/hooks/useRegister";
import { saveAuthData } from "@/helpers/Token";
import LoginIndex from "@/Store";
interface FileState {
    file: File
    name: string
    url: string
}
export const Login: React.FC = () => {
    const { loginRole: userRole, loginHolat, setLoginHolat,setLoginRole } = LoginIndex();
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
    const [lang, setLang] = useState("uz");
    const [imageFile, setImageFile] = useState<File | null>(null);

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
    const { setLoginCheck, LoginCheck, loading: loadingLogin, error: loginError } = useLoginCheckStore();

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
            toastBtn('Please enter a valid OTP code', 'error');
            return;
        }
        if (PhoneCheck === 'register') {
            CheckCodeBtn();
        } else {
            LoginBtn();
        }
    };
    useEffect(() => {
        if (PhoneCheck?.success === false && PhoneCheck?.status === 'OK') {
            SendCodeBtn();
            setPhoneCheck('login');
        } else if (PhoneCheck?.success === true && PhoneCheck?.status === 'OK') {
            SendCodeBtn();
            setPhoneCheck('register');
            setFirstName('');
            setLastName('');
            setNickname('');
        } else if (SendCode?.success === true) {
            setStatus('OTPcode');
            toastBtn(SendCode?.body, 'success');
            setSendCode(null);
        } else if (LoginCheck?.success === true && LoginCheck?.status === "CREATED") {
            setStatus('Ok');
            setSendCode(null);
            setPhoneCheck(null);
            setLoginCheck(null);
            saveAuthData(LoginCheck?.body, LoginCheck?.message);
            toastBtn('Muvaffaqiyatli', 'success')
            setLoginHolat(false);
        } else if (CheckCode?.success === true) {
            setStatus('Registration');
            setSendCode(null);
            setCheckCode(null);
        } else if (LoginCheck?.success === false && LoginCheck?.status === "OK" && LoginCheck?.message === "Kod mos emas") {
            toastBtn('Kod mos emas', 'error');
        } else if (CheckCode?.success === false && CheckCode?.status === "OK" && CheckCode?.message === "Kod mos emas") {
            toastBtn('Kod mos emas', 'error');
        } else if (LoginCheck?.success === false && LoginCheck?.status === "OK") {
            toastBtn('Tel Raqam bloklangan', 'error');
        } if (response?.success === true && response?.message === "Muvaffaqiyatli" && status === "Registration") {
            toastBtn('Muvaffaqiyatli', 'success');
            saveAuthData(response?.body, role ? role : '');
            setStatus('Ok');
            setLoginHolat(false);
            setLoginRole(null);
        } if (response?.success === false && response?.message === 'Telefon raqami allaqachon mavjud' && status === "Registration") {
            toastBtn('Telefon raqami allaqachon mavjud', 'error');
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
            setFirstName('');
            setLastName('');
            setNickname('');
            setLoginHolat(false);
            setLoginRole(null);
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
        }else if (userRole !== null) {
            if (loginHolat === true) {
                setModalOpen(true);
                setStatus('Login');
            }
        }
    }, [loginHolat])
    return (
        <div>
            {contextHolder}
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
                style="max-h-[90vh] w-[90%]"
            >
                <div className="w-full grid place-items-center my-5">
                    {status === 'Ok' && <IoMdCheckmarkCircleOutline size={130} color="#9C0B35" className='mx-auto' />}
                    <h1 className="text-3xl font-semibold my-5">
                        {status === 'Login' && "Регистрация / Вход"}
                        {status === 'OTPcode' && "ОТП код"}
                        {status === 'Selection' && "Выберите роль"}
                        {status === 'Ok' && response?.success && "Спасибо за регистрацию"}
                        {status === 'Ok' && !response?.success && "Вы вошли в свой аккаунт"}
                        {status === 'Registration' && "Регистрация"}
                    </h1>
                    {status === 'Selection' && (
                        <div className="my-6">
                            <Space wrap>
                                <Select
                                    style={{ width: 200 }}
                                    allowClear
                                    onChange={handleChange}
                                    options={[
                                        { value: 'MASTER', label: 'MASTER' },
                                        { value: 'CLIENT', label: 'CLIENT' }
                                    ]}
                                    placeholder="ROLE TANLASH"
                                />
                            </Space>
                        </div>
                    )}
                    {status === 'Login' && (
                        <div className='my-8'>
                            <div className="flex justify-center w-[300px] sm:w-[500px] s ">
                                <div className="phone-input-container w-full rounded-md">
                                    <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
                                        Номер телефона*
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
                            </div>
                        </div>
                    )}
                    {status === 'OTPcode' && (
                        <div className="w-full grid place-items-center text-center">
                            <h2 className='text-2xl font-semibold my-5'>
                                {phoneNumberInput.length === 13 ? `${phoneNumberInput}` : '+998 (__) ___ __ __'}
                            </h2>
                            <p className='text-slate-600 mb-6'>Мы отправили вам SMS с кодом подтверждения.</p>
                            <div className="w-[60%] lg:w-[50%] otp-input">
                                <Input.OTP
                                    length={4}
                                    onInput={(value) => setOtpCodeInput(value.join(''))}
                                    inputMode='numeric'
                                    formatter={(str) => str.replace(/\D/g, '')}
                                    size='large'
                                    status={loginError === null ? '' : 'error'}
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
                        <div className='text-center'>
                            <div className='text-xl text-slate-600 text-center'>
                                <p className='mb-5 '>Личный кабинет веб сайта находится на стадии разработки</p>
                                <p>Полный доступ к личному кабинету</p>
                                <p>Вы можете получить в мобильном приложении Bookers</p>
                            </div>
                            <div className='text-4xl font-semibold my-10 text-center'>
                                <p>Мы уведомим вас о готовности веб кабинета</p>
                                <p>в ближайшее время</p>
                            </div>
                        </div>
                    )}
                    {
                        status === 'Registration' && (
                            <div className="w-full grid place-items-center px-16">
                                <h1 className="text-3xl font-semibold my-5">Форма регистрации мастера</h1>
                                <div className="grid sm:grid-cols-2 grid-cols-1 justify-between w-full gap-4">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2" htmlFor="firstName">Имя *</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            placeholder="Имя"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2" htmlFor="lastName">Фамилия</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Фамилия"
                                            className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                                        />
                                    </div>
                                    {
                                        role === "MASTER" && (
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2" htmlFor="lastName">Nickname</label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    onChange={(e) => setNickname(e.target.value)}
                                                    placeholder="Фамилия"
                                                    className="border-2 border-gray-700  bg-[#B9B9C9]  p-5 rounded-xl w-full focus:outline-none focus:ring-0 "
                                                />
                                            </div>
                                        )
                                    }
                                    <div className="">
                                        <div className=" ">
                                            <label className="block text-gray-700 font-medium mb-2" htmlFor="file">Прикрепить фото</label>
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
                                    </div>Я соглашаюсь с условиями пользовательского соглашения и политикой конфиденцциальности.</p>
                                </div>
                            </div>
                        )
                    }
                    <button
                        className={`${status !== 'Ok' ? 'mt-4 bg-[#9C0B35] text-white py-4 hover:bg-[#ae2e50] px-16 rounded-full' : ''} 
               ${loading || loadingSendCode || loadingLogin || loadingCheckCode || registerMasterLoading ? 'opacity-50 cursor-not-allowed' : ''} 
               ${status === 'Ok' ? 'mt-4 text-[#9C0B35] border border-[#9C0B35] py-4 hover:bg-[#88797d] px-16 rounded-full' : ''}`}
                        onClick={() => {
                            if (status === 'Selection') {
                                if (!role) {
                                    toastBtn('Please select a role', 'error');
                                } else {
                                    setStatus('Login');
                                }
                            } else if (status === 'Login') {
                                if (phoneNumberInput.length === 13) {
                                    checkPhoneNumberBtn();
                                } else {
                                    toastBtn('Please enter a valid phone number', 'error');
                                }
                            } else if (status === 'OTPcode') {
                                handleOtpSubmit();
                            } else if (status === 'Registration') {
                                if (checkBox) {
                                    if (PhoneCheck === 'register' && phoneNumberInput.length === 13 && firstName.length > 2 && lastName.length > 3 && nickname.length > 2) {
                                        registerMaster();
                                    } else if (PhoneCheck === 'login' && phoneNumberInput.length === 13 && firstName.length > 2 && lastName.length > 3 && nickname.length > 2) {
                                        registerMaster();
                                    } else {
                                        toastBtn("To'liq ma'lumotlarni to'ldiring", 'error');
                                    }
                                } else {
                                    toastBtn('Please accept the terms and conditions', 'error');
                                }
                            }
                        }}
                        disabled={loading || loadingSendCode || loadingLogin || loadingCheckCode || registerMasterLoading}>
                        {status === 'Selection' && (loading ? 'Yuklanmoqda...' : 'Продолжить')}
                        {status === 'Login' && (loading || loadingSendCode ? 'Yuklanmoqda...' : 'Продолжить')}
                        {status === 'OTPcode' && (loadingLogin || loadingCheckCode ? 'Yuklanmoqda....' : 'Отправить отзыв')}
                        {status === 'Ok' && 'Скачать приложение'}
                        {status === 'Registration' && (registerMasterLoading ? 'Yuklanmoqda....' : 'Зарегистрироваться')}
                    </button>
                </div>
            </UniversalModal>
        </div>
    );
};
