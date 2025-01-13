import React from 'react';
import { FaRegCircleCheck  } from "react-icons/fa6";


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

const OfferCards: React.FC<HomeOffersTypes> = ({ title, icon: Icon, data, firstButtonTitle,description, 
    secondButtonTitle,
    onclickFirstButton,
    onclickSecondButton, }) => {
    return (
        <div className='h-max w-full flex flex-col justify-center p-6 rounded-3xl bg-[#B9B9C9] mb-6 lg:mb-0'>
            <div className='text-center flex flex-col items-center mb-5 '>
               {Icon && <Icon className='text-[70px] text-[#9C0B35] w-[82px] h-[82px]' />}
                <p className='text-[#9C0B35] font-manrope font-extrabold  text-[26px]  lg:px-10 mt-2'>{title && title}</p>
            </div>
            <div className='text-left text-[#000000] space-y-4 mb-5'>
                {data && data.map((item, index) => (
                    <div key={index} className='flex items-center'  >
                        <FaRegCircleCheck size={24} className='text-[#9C0B35] mr-3' />
                        <p className='flex-1 font-manrope font-medium text-[20px]'>{item.text}</p>
                    </div>
                ))}
            </div>
            <div>
                <p className='font-manrope font-medium text-[26px] text-center  '>{description}</p>
            </div>
           <div className='flex flex-col gap-3 justify-center items-center '>
           {firstButtonTitle && (
                <Button
                    className="w-full h-[66px] rounded-[40px] border-2 border-[#9C0B35] text-[#9C0B35] font-bold text-[18px] leading-[30px] "
                    onClick={onclickFirstButton}
                >
                    {firstButtonTitle}
                </Button>
            )}

            {secondButtonTitle && (
                <Button
                    className=" w-full h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px]  "
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
