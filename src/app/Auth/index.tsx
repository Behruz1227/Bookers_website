import { UniversalModal } from "@/components/Modal/UniversalModal";
import { usePhoneCheck } from "@/hooks/usePhoneCheck";
import { useSendCode } from "@/hooks/useSendCode";
import { Button, message, Select, Space } from "antd";
// import { useLogin } from "@/hooks/useLogin";
// import { useRegisterMaster } from "@/hooks/useRegisterMaster";
// import { usePhoneCheck } from "@/hooks/usePhoneCheck";
// import { useSendCode } from "@/hooks/useSendCode";
import { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Input } from 'antd';
import { OTPProps } from "antd/es/input/OTP";
// import { useLogin } from "@/hooks/useLogin";
import usePhoneCheckStore from "@/Store/PhoneCheckStore";
// import useLoginCheckStore from "@/Store/LoginStore";
import useSendCodeStore from "@/Store/SendCode";
import { useLogin } from "@/hooks/useLogin";
import useLoginCheckStore from "@/Store/LoginStore";
import { useCheckCode } from "@/hooks/useCheckCode";
import useCheckCodeStore from "@/Store/CheckCode";


export const LoginInex = () => {
    // State for modal open/close
    const [isModalOpen, setModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage()
    const toastBtn = (text: string, type: string) => {
        messageApi.open({
          type: type,
          content: text,
        });
      };
    //----------------------------------------------------------------
    const [role, setRole] = useState<null | string>(null)
    //----------------------------------------------------------------
    const [firstNameInput, setFirstNameInput] = useState<null | string>(null);
    const [lastNameInput, setLastNameInput] = useState<null | string>(null);
    const [nicknameInput, setNicknameInput] = useState<null | string>(null);
    const [birthDatenput, setBirthDatenputInput] = useState<null | string>(null);
    const [deviceIdInput, setDeviceIdInput] = useState<null | string>(null);
    const [deviceTypeInput, setDeviceTypeInput] = useState<null | string>(null);
    const [lang, setLangInput] = useState<null | 'en' | 'uz' | 'ru'>(null);
    const [phoneNumberInput, setPhoneNumberInput] = useState<string>('');
    const [otpCodeInput, setOtpCodeInput] = useState<null | string>(null);
    //----------------------------------------------------------------
    //----------------------------------------------------------------
    const [status, setStatus] = useState<null | 'Login' | 'OTPcode' | 'Registration' | 'Ok' | 'Selection'>(null);
    //----------------------------------------------------------------
    const { checkPhoneNumberBtn } = usePhoneCheck(phoneNumberInput, role)
    const { setPhoneCheck, PhoneCheck, loading } = usePhoneCheckStore();
    //----------------------------------------------------------------
    const { SendCodeBtn } = useSendCode(phoneNumberInput, role, PhoneCheck?.success)
    const { setSendCode, SendCode, loading: loading1 } = useSendCodeStore();
    //----------------------------------------------------------------

    const { LoginBtn } = useLogin(phoneNumberInput, role, otpCodeInput)
    const { setError, setLoginCheck, LoginCheck, loading: loading2, error: error2 } = useLoginCheckStore();
    //----------------------------------------------------------------
    const { CheckCodeBtn } = useCheckCode(phoneNumberInput, otpCodeInput)
    const {  setCheckCode, CheckCode, loading: loading3,  } = useCheckCodeStore();
    
    console.log(PhoneCheck, 1);
    console.log(SendCode, 2);
    console.log(CheckCode, 3);

    console.log(LoginCheck, "Phone Number");
    console.log(SendCode, "kod");

    const onInput: OTPProps['onInput'] = (value) => {
        console.log(value);
        setOtpCodeInput(value.join(''));
    };

    const sharedProps: OTPProps = {
        onInput,
        inputMode: 'numeric', // Ensures the virtual keyboard is numeric on mobile devices
        formatter: (str) => str.replace(/\D/g, ''), // Filters out non-numeric characters
    };

    useEffect(() => {
        if (PhoneCheck?.success === false && PhoneCheck?.status === 'OK') {
            SendCodeBtn()
            setPhoneCheck(null)
        } else if (PhoneCheck?.success === true && PhoneCheck?.status === 'OK') {
            SendCodeBtn()
            setPhoneCheck(true)
        }else if (PhoneCheck === true && CheckCode?.success === true) {
            setStatus('Registration')
        }
         else if (SendCode?.success === true) {
            setStatus('OTPcode')
            setSendCode(null)
        } else if (LoginCheck?.success === true && LoginCheck?.status === "CREATED") {
            setStatus('Ok')
        } else if (LoginCheck?.success === false && LoginCheck?.status === "OK" && LoginCheck?.message === "Kod mos emas") {
            toastBtn('Kod mos emas', 'error')
        } else if (CheckCode?.success === false && CheckCode?.status === "OK" && CheckCode?.message === "Kod mos emas") {
            toastBtn('Kod mos emas', 'error')
        } else if (LoginCheck?.success === false && LoginCheck?.status === "OK") {
            toastBtn('Tel Raqam bulok', 'error')
        } 
    }, [PhoneCheck, SendCode, LoginCheck, CheckCode]);




    const handleChange = (value: string) => {
        setRole(value);
        setError(null)
    };


    return (
        <div>
            {contextHolder}
            <div>
                <button
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={() => {
                        setModalOpen(true);
                        setStatus(role !== null ? 'Login' : 'Selection');
                    }}
                >
                    login
                </button>
                
      

            </div>
            <div>
                <UniversalModal isOpen={isModalOpen} onClose={() => {
                    setRole(null)
                    setStatus(null);
                    setModalOpen(false);
                    setPhoneNumberInput('')
                    setPhoneCheck(null)
                    setLoginCheck(null)
                    setSendCode(null)
                    setCheckCode(null)
                }} style="max-h-[90vh] w-[90%]">
                    <div className="w-full grid place-items-center my-12">
                        {status === 'Ok' ? <IoMdCheckmarkCircleOutline size={130} color="#9C0B35" className='mx-auto' /> : ''}
                        <h1 className="text-3xl font-semibold">
                            {status === 'Login' ? "Регистрация / Вход" : ''}
                            {status === 'OTPcode' ? "ОТП код" : ''}
                            {status === 'Selection' ? "Выберите роль" : ''}
                            {status === 'Ok' ? "Вы вошли в свой аккаунт" : ''}
                        </h1>
                        <div>
                            {status === 'Selection' && (
                                <div className="my-6">
                                    <Space wrap >
                                        <Select
                                            style={{ width: 200, textAlign: "center" }} // % bilan width berildi
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
                            {
                                status === 'Login' && (

                                    <div className='my-8'>
                                        <label htmlFor="phoneNumber">Номер телефона*</label>
                                        <input
                                            type="number"
                                            maxLength={9}
                                            value={phoneNumberInput}
                                            onChange={(e) => setPhoneNumberInput(e.target.value)}
                                            placeholder='97XXXXXXX'
                                            className='border p-2 rounded-md w-full'
                                        />
                                    </div>
                                )
                            }
                            {
                                status === 'OTPcode' && (
                                    <div className="w-full grid place-items-center ">
                                        <h2 className='text-2xl font-semibold my-2'>{phoneNumberInput.length === 9 ? `+998${phoneNumberInput}` : '333333333'}</h2>
                                        <p className='text-slate-600 mb-6'>Мы отправили вам SMS с кодом подтверждения.</p>
                                        <div className='w-[100%] lg:w-[100%] otp-input'>
                                            <Input.OTP
                                                length={4}
                                                {...sharedProps}
                                                style={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    justifyContent: 'between',
                                                    gap: '10px',

                                                }}
                                                size='large'
                                                status={error2 === null ? '' : 'error'}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                            {
                                status === 'Ok' && (
                                    <div className='grid place-items-center'>

                                        <div className='text-xl text-slate-600 text-center'>
                                            <p className='mb-5 '>Личный кабинет веб сайта находится на стадии разработки</p>
                                            <p>Полный доступ к личному кабинету</p>
                                            <p>Вы можете получить в мобильном приложении Bookers</p>
                                        </div>
                                        <div className='text-4xl font-semibold my-10 text-center'>
                                            <p>Мы уведомим вас о готовности веб кабинета</p>
                                            <p>в ближайшее время</p>
                                        </div>
                                        <button
                                            className={`mt-4 text-[#9C0B35]  border border-[#9C0B35] py-4 hover:bg-[#88797d] px-16 rounded-full ${loading ? 'opacity-50' : ''}`}

                                            disabled={loading}
                                        >
                                            {loading ? 'Yuklanmoqda...' : 'Скачать приложение'}
                                        </button>

                                    </div>
                                )
                            }
                        </div>
                        <div>
                            {
                                status === 'Selection' && (
                                    <div>
                                        <button
                                            className={`mt-4 bg-[#9C0B35] text-white py-4 hover:bg-[#ae2e50] px-16 rounded-full`}
                                            onClick={() => {
                                                if (role === null || role === undefined) {
                                                    toastBtn('Please select a role', 'error')
                                                } else {
                                                    setStatus('Login');
                                                }
                                            }}
                                        >
                                            Продолжить
                                        </button>
                                    </div>
                                )
                            }
                            {
                                status === 'Login' && (
                                    <div>
                                        <button
                                            className={`mt-4 bg-[#9C0B35] text-white py-4 hover:bg-[#ae2e50] px-16 rounded-full ${loading ? 'opacity-50' : ''}`}
                                            onClick={()=>{
                                                if (phoneNumberInput.length === 9) {
                                                    checkPhoneNumberBtn()
                                                }else {
                                                    toastBtn('Please enter a phone number', 'error')
                                            }}}
                                            disabled={loading && loading1}
                                        >
                                            {loading || loading1 ? 'Yuklanmoqda...' : 'Продолжить'}
                                        </button>
                                    </div>
                                )
                            }
                            {
                                status === 'OTPcode' && (
                                    <div>
                                        <button
                                            className={`mt-16 bg-[#9C0B35] text-white py-4 hover:bg-[#ae2e50] px-16 rounded-full ${loading ? 'opacity-50' : ''}`}
                                            onClick={() => {
                                                if (otpCodeInput?.length === 4) {
                                                if (PhoneCheck === true) {
                                                    CheckCodeBtn()
                                                } else {
                                                    
                                                        LoginBtn()
                                                    
                                                }}else{
                                                    toastBtn('Please enter a valid OTP code', 'error')
                                                }
                                                
                                            }}
                                            disabled={loading2|| loading3}
                                        >
                                            {loading2 ||loading3 ? 'Yuklanmoqda....' : 'Отправить отзыв'}
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </UniversalModal>
            </div>
        </div>
    )
}
