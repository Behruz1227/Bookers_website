import React from 'react';
import { FaRegCircleCheck } from "react-icons/fa6";

interface HomeOffersTypes {
    title: string;
    icon: React.ElementType;
    data: HomeOffersCardData[];
    firstButtonTitle?: string;
    secondButtonTitle?: string;
    onclickFirstButton?: () => void;
    onclickSecondButton?: () => void;
}

interface HomeOffersCardData {
    text: string;
}

const OfferCards: React.FC<HomeOffersTypes> = ({ title, icon: Icon, data, firstButtonTitle,
    secondButtonTitle,
    onclickFirstButton,
    onclickSecondButton, }) => {
    return (
        <div className='h-max w-full lg:w-[30%] flex flex-col items-center justify-center p-6 rounded-2xl bg-[#B9B9C9] mb-6 lg:mb-0'>
            <div className='text-center flex flex-col items-center mb-5'>
                <Icon className='text-[70px] text-[#9C0B35]' />
                <p className='text-[#9C0B35] font-semibold text-xl px-5 lg:px-10 mt-2'>{title}</p>
            </div>
            <div className='text-left text-[#242424] space-y-4 mb-5'>
                {data.map((item, index) => (
                    <div key={index} className='flex items-center'>
                        <FaRegCircleCheck size={24} className='text-[#9C0B35] mr-3' />
                        <p className='flex-1'>{item.text}</p>
                    </div>
                ))}
            </div>
            <button className="bg-[#9C0B35] text-white px-6 py-2 rounded-full mt-2" onClick={onclickFirstButton}>
                {firstButtonTitle}
            </button>
            <button className="bg-[#242424] text-white px-6 py-2 rounded-full mt-2" onClick={onclickSecondButton}>
                {secondButtonTitle}
            </button>

        </div>
    );
}

export default OfferCards;




//ishlatilishi

// const FirstCard = [
//     { text: 'Быстрое и удобное бронирование' },
//     { text: 'Гарантированные онлайн-записи' },
//     { text: 'Большой выбор мастеров' },
//     { text: 'Детальная информация о профилях мастеров и отзывы клиентов' },
//     { text: 'Интеграция с календарем и напоминания' },
//     { text: 'Программы лояльности и бонусы' },
// ];
// <OffersCard icon={BsGift} data={FirstCard} title='Что предлагает BOOKERS клиентам услуг красоты?' />

