import React from 'react';
import { FaRegCircleCheck } from "react-icons/fa6";


import Button from '../button/Button';

interface HomeOffersTypes {
    title?: string;
    icon?: React.ElementType;
    data?: HomeOffersCardData[];
    firstButtonTitle?: string;
    secondButtonTitle?: string;
    onclickFirstButton?: () => void;
    onclickSecondButton?: () => void;
    description?: string;
}

interface HomeOffersCardData {
    text: string;
}

const OfferCards: React.FC<HomeOffersTypes> = ({ title, icon: Icon, data, firstButtonTitle, description,
    secondButtonTitle,
    onclickFirstButton,
    onclickSecondButton, }) => {
    return (
        <div className="h-max w-full flex flex-col justify-center p-4 sm:p-6 rounded-3xl bg-[#B9B9C9] mb-6 lg:mb-0">
            {/* Icon va title */}
            <div className="text-center flex flex-col items-center mb-4 sm:mb-5">
                {Icon && <Icon className="text-[#9C0B35] w-[64px] h-[64px] sm:w-[82px] sm:h-[82px]" />}
                <p className="text-[#9C0B35] font-manrope font-extrabold pt-4 sm:pt-5 text-[20px] sm:text-[26px]">{title}</p>
            </div>

            {/* Ma'lumotlar ro‘yxati */}
            <div className="text-left text-[#000000] space-y-3 sm:space-y-4 mb-4 sm:mb-5">
                {data?.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3">
                        <FaRegCircleCheck size={20} className="text-[#9C0B35] mt-1" />
                        <p className="flex-1 font-manrope font-medium text-[16px] sm:text-[20px]">{item.text}</p>
                    </div>
                ))}
            </div>

            {/* Tavsif */}
            <div>
                <p className="font-manrope font-medium text-[18px] sm:text-[26px] text-center">{description}</p>
            </div>

            {/* Tugmalar */}
            <div className="flex flex-col gap-2 sm:gap-3 justify-center items-center mt-4">
                {firstButtonTitle && (
                    <Button
                        className="w-full sm:w-[50%] lg:w-[50%] xl:w-full h-[50px] sm:h-[66px] rounded-[40px] border-2 border-[#9C0B35] text-[#9C0B35] font-bold text-[16px] sm:text-[18px] leading-[26px] sm:leading-[30px]"
                        onClick={onclickFirstButton}
                    >
                        {firstButtonTitle}
                    </Button>
                )}

                {secondButtonTitle && (
                    <Button
                        className="w-full sm:w-[50%] lg:w-[50%] xl:w-full h-[50px] sm:h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[16px] sm:text-[18px] leading-[26px] sm:leading-[30px]"
                        onClick={onclickSecondButton}
                    >
                        {secondButtonTitle}
                    </Button>
                )}
            </div>
        </div>

    );
}

export default OfferCards;
