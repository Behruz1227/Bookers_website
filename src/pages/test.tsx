"use client";

import React, { useState } from "react";
import { PiWarningCircle } from "react-icons/pi";
import { UniversalModal } from "../components/Modal/UniversalModal";
import { CheckCircle } from "lucide-react";
import Buttonn from "@/components/Button";
import { Textarea } from "@/components/ui/textarea";

interface OTPInputProps {
  length: number;
  onChange: (otp: string[]) => void;
}

interface OTPModalProps {
  visible: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onChange }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]*$/.test(value) && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp);

    if (value === "" && index > 0) {
      const prevInput = document.getElementById(
        `otp-${index - 1}`
      ) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    } else if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(
        `otp-${index + 1}`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "ArrowRight" && index < otp.length - 1) {
      const nextInput = document.getElementById(
        `otp-${index + 1}`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      const prevInput = document.getElementById(
        `otp-${index - 1}`
      ) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
      {otp.map((value, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          value={value}
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 text-center text-3xl sm:text-4xl lg:text-5xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          type="text"
          inputMode="numeric"
        />
      ))}
    </div>
  );
};

const OTPModal: React.FC<OTPModalProps> = ({ visible, onClose, onVerify }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("+99 888 517 11 98");
  const [otpCode, setOtpCode] = useState<string[]>([]);
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "failed"
  >("pending");

  const handleVerify = () => {
    const code = otpCode.join("");
    if (code.length === 4) {
      if (code === "1234") {
        setVerificationStatus("success");
        onVerify(code);
      } else {
        setVerificationStatus("failed");
      }
    } else {
      alert("Пожалуйста, введите полный код.");
    }
  };

  return (
    <UniversalModal isOpen={visible} onClose={onClose}>
      <div className=" rounded-xl mb-10 p-6 sm:p-8 lg:p-12 w-full max-w-full h-[70%] max-h-[600px] sm:max-h-[500px] lg:max-h-[700px] text-center relative flex flex-col justify-evenly">
        {verificationStatus === "pending" && (
          <>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                OTP код
              </h2>
              <p className="text-xl sm:text-2xl">{phoneNumber}</p>
              <p className="text-xl sm:text-xl text-gray-600">
                Мы отправили вам SMS с кодом подтверждения.
              </p>
              <OTPInput length={4} onChange={setOtpCode} />
            </div>
            <button
              onClick={handleVerify}
              className="bg-[#9C0B35] w-80 mx-auto text-white py-4 rounded-full"
            >
              Подтвердить
            </button>
          </>
        )}
        {verificationStatus === "success" && (
          <div className="flex flex-col gap-10 items-center">
            <CheckCircle size={"10rem"} className=" text-[#9C0A35]" />
            <p className="text-xl text-bold">Заявка принята</p>
            <p className="text-xl">
              Ваша заявка принята. Cтатус вашей записи можно <br /> отслеживать
              в мобильном приложении bookers
            </p>
            <Buttonn className="text-[#9C0A35] border-[#9C0A35] rounded-full border-[1px] py-3 px-14 font-bold">
              Скачать приложение
            </Buttonn>
          </div>
        )}
        {verificationStatus === "failed" && (
          <div className="flex flex-col gap-10 items-center">
            <PiWarningCircle size={"10rem"} className=" text-[#9C0A35]" />
            <p className="text-xl font-medium">
              Вы не можете записаться на услугу мастера
            </p>
            <p className="text-xl">
              Что бы записаться необходимо пройти <br /> регистрацию клиента
            </p>
            <Buttonn
              className="text-white border-[#9C0A35] bg-[#9C0A35] rounded-full border-[1px] py-3 px-14 font-medium
            "
            >
              Зарегистрироваться
            </Buttonn>
          </div>
        )}
      </div>
    </UniversalModal>
  );
};

function Index() {
  return (
    <>
    </>
  );
}

export default Index;
