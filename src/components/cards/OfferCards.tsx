import { Button } from 'antd';
import React from 'react';
import { FaRegCircleCheck } from "react-icons/fa6";

interface HomeOffersTypes {
    title: string;
    icon: React.ElementType;
    data: HomeOffersCardData[];
}

interface HomeOffersCardData {
    text: string;
}

const OfferCards: React.FC<HomeOffersTypes> = ({ title, icon: Icon, data }) => {
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
            <div>
            <Button
                className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
                onClick={() => alert("Скачать приложение")}
                >
                button
            </Button>

            <Button
                className="w-[340px] h-[66px] rounded-[40px] border-2 border-[#9C0B35] text-[#9C0B35] font-bold text-[18px] leading-[30px] hover:bg-[#9C0B35] hover:text-white"
                onClick={() => alert("Войти / Регистрация")}
                >
                Войти / Регистрация
             </Button>
            </div>
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

