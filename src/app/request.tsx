"use client";

import React, { useState } from "react";
import { PiWarningCircle } from "react-icons/pi";
import { UniversalModal } from "../components/Modal/UniversalModal";
import { CheckCircle } from "lucide-react";
import Button from "@/components/button/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <Input
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
  console.log(OTPModal);
  const [phoneNumber, setPhoneNumber] = useState<string>("+99 888 517 11 98");
  console.log(setPhoneNumber);
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
            <Button className="text-[#9C0A35] border-[#9C0A35] rounded-full border-[1px] py-3 px-14 font-bold">
              Скачать приложение
            </Button>
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
            <Button
              className="text-white border-[#9C0A35] bg-[#9C0A35] rounded-full border-[1px] py-3 px-14 font-medium
            "
            >
              Зарегистрироваться
            </Button>
          </div>
        )}
      </div>
    </UniversalModal>
  );
};

function Index() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <UniversalModal
        style=" w-[90%] overflow-y-auto max-h-[95vh] rounded-xl"
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className="w-full h-max flex flex-col gap-5 px-16 pb-16">
          <div className=" flex justify-center">
            <h1 className=" font-bold text-4xl">Форма заявки</h1>
          </div>
          <div className=" flex justify-between ">
            <div className="w-[49%]">
              <p className="text-[#4F4F4F] mb-2">
                Имя мастера или название салона*
              </p>
              <Input className="rounded-[8px] h-16 border-[#4F4F4F] px-3"></Input>
            </div>
            <div className="w-[49%]">
              <p className="text-[#4F4F4F] mb-2">
                Имя мастера или название салона*
              </p>
              <Select>
                <SelectTrigger className="placeholder:text-[#4F4F4F] border border-[#4F4F4F] w-full h-16 text-[#4F4F4F] rounded-[7px] px-3">
                  {/* SelectValue komponentida placeholder ni to'g'ri ishlatish */}
                  <SelectValue placeholder="Парикмахерские услуги" />
                </SelectTrigger>
                <SelectContent className="text-[#4F4F4F] bg-gray-800 rounded-md">
                  <SelectGroup>
                    {/* SelectItem variantlari */}
                    <SelectItem value="option0">
                      Парикмахерские услуги
                    </SelectItem>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <p className="text-[#4F4F4F] mb-2">Название мероприятия*</p>
            <Textarea
              rows={5}
              className="rounded-[8px] border-[#4F4F4F]"
            ></Textarea>
          </div>
          <div className="flex justify-between">
            <div className="w-[49%]">
              <p className="text-[#4F4F4F] mb-2">Дата проведения*</p>
              <Input
                type="date"
                className="rounded-[8px] border-[#4F4F4F] h-16"
              ></Input>
            </div>
            <div className="w-[49%]">
              <p className="text-[#4F4F4F] mb-2">Дата проведения*</p>
              <Input
                type="time"
                className="rounded-[8px] border-[#4F4F4F] h-16"
              ></Input>
            </div>
          </div>
          <div>
            <p className="text-[#4F4F4F] mb-2">Описание мероприятия*</p>
            <Textarea
              rows={5}
              className="rounded-[8px] border-[#4F4F4F]"
            ></Textarea>
          </div>
          <div className="flex justify-between">
            <div className="w-[49%]">
              <p className="text-[#4F4F4F] mb-2">Контактная информация*</p>
              <Input
                type="phone"
                className="rounded-[8px] border-[#4F4F4F] h-16"
              ></Input>
            </div>
            <div className="w-[49%]">
              <p className="text-[#4F4F4F] mb-2">Место проведения*</p>
              <Input
                // type="time"
                className="rounded-[8px] border-[#4F4F4F] h-16"
              ></Input>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[49%]">
              <p className="text-[#4F4F4F] mb-2">Дополнительная информация</p>
              <Input className="rounded-[8px] border-[#4F4F4F] h-16"></Input>
            </div>
            <div className="w-[49%]">
              <p className="text-[#4F4F4F] mb-2">Стоимость участия</p>
              <Input className="rounded-[8px] border-[#4F4F4F] h-16"></Input>
            </div>
          </div>
          <Button className="w-52 h-12 mx-auto rounded-full bg-[#9C0B35] text-white">
            Подать заявку
          </Button>
        </div>
      </UniversalModal>
      <Button
        onClick={() => setOpenModal(true)}
        className="text-white px-12 py-3 bg-[#9C0B35] rounded-full"
      >
        Показать больше
      </Button>
    </>
  );
}

export default Index;
