"use client";

import React, { useState, useEffect } from "react";
import { CgCheckO } from "react-icons/cg";
import { PiWarningCircle } from "react-icons/pi";

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
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otpCode, setOtpCode] = useState<string[]>([]);
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "failed"
  >("pending");

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      const simulatedPhoneNumber = "+99 888 517 11 98";
      setPhoneNumber(simulatedPhoneNumber);
    };

    fetchPhoneNumber();
  }, []);

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

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#E6E6F0] rounded-xl p-6 sm:p-8 lg:p-12 w-[90%] max-w-[90%] sm:max-w-[600px] lg:max-w-[90%] h-[75%] max-h-[600px] sm:max-h-[500px] lg:max-h-[700px] text-center relative flex flex-col justify-between">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9C0B35]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {verificationStatus === "pending" && (
          <div className="flex flex-col justify-center items-center flex-grow">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8">
              OTP код
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-4 sm:mb-6 lg:mb-6">
              Мы отправили вам SMS с кодом подтверждения.
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black mb-6 sm:mb-8 lg:mb-10">
              {phoneNumber}
            </p>
            <OTPInput length={4} onChange={setOtpCode} />
          </div>
        )}
        {verificationStatus === "success" && (
          <div className="flex flex-col justify-center items-center flex-grow">
            <CgCheckO className="w-52 h-52 mb-10 text-[#9C0A35]" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8">
              Принято
            </h2>
            <p className="text-lg sm:text-xl text-center lg:text-2xl text-gray-600 mb-4 sm:mb-6 lg:mb-6">
              Ваша заявка принята и скоро будет опубликована <br /> на этом
              сайте в разделе "НОВОСТИ".
            </p>
          </div>
        )}
        {verificationStatus === "failed" && (
          <div className="flex flex-col justify-center items-center flex-grow">
            <div className="mb-6">
              <PiWarningCircle className="w-52 h-52 mb-10 text-[#9C0A35]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Отклонено
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 text-center max-w-2xl">
              Что бы оставить заявку на мастеркласс
              <br />
              необходимо пройти регистрацию мастера
            </p>
          </div>
        )}
        {verificationStatus === "pending" && (
          <div className="flex justify-center mt-auto mb-4 sm:mb-5 lg:mb-6">
            <button
              onClick={handleVerify}
              className="w-[250px] sm:w-[300px] lg:w-[380px] bg-[#9C0B35] text-white py-4 sm:py-5 lg:py-6 rounded-full text-xl sm:text-2xl lg:text-3xl hover:bg-opacity-90"
            >
              Продолжить
            </button>
          </div>
        )}
        {verificationStatus === "failed" && (
          <div className="flex justify-center mt-auto mb-4 sm:mb-5 lg:mb-6">
            <button
              onClick={onClose}
              className="w-[250px] sm:w-[300px] lg:w-[380px] bg-[#9C0B35] text-white py-4 sm:py-5 lg:py-6 rounded-full text-xl sm:text-2xl lg:text-3xl hover:bg-opacity-90"
            >
              Зарегистрироваться
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPModal;
