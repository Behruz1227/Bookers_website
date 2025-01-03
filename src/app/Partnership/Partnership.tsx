import Footer from '@/components/footer/Footer'
import Header from '@/components/Header/Header'
import HeaderTitles from '@/components/HeadTitle'
import Hero from '@/components/Hero/Hero'
import Subtitle from '@/components/Subtitle'
import React from 'react'

//hero img
import imgSplide from "@/assets/img/telegram-cloud-photo-size-2-5422467465163692948-y 1 (1).png"
import { RefreshCcw } from 'lucide-react'
import OfferCards from '@/components/cards/OfferCards'

//card
const ThreeCard = [
    { text: 'Модуль управления клиентами' },
    { text: 'Модуль мониторинга и аналитики' },
    { text: 'Модуль планирования и расписания' },
    { text: 'Модуль маркетинга и продвижения' },
    { text: 'Модуль управления персоналом' },
    { text: 'Модуль комьюнити' },
];
export const Partnership: React.FC = () => {
    return (
        <div>
            <div className='bg-[#111827]'>
                <Header />
                <div className='container mx-auto '>
                    <Hero slides={[{
                        title: "Мы предлагаем взаимовыгодное сотрудничество",
                        image: imgSplide, // Replace with your image path
                    },
                    {
                        title: "Мы предлагаем взаимовыгодное сотрудничество",
                        image: imgSplide, // Replace with your image path
                    },
                    {
                        title: "Мы предлагаем взаимовыгодное сотрудничество",
                        image: imgSplide, // Replace with your image path
                    },]} />
                    <div className='py-10'>
                        <HeaderTitles text='Web-кабинет bookers: управляйте бизнес процессами своего салона красоты эффективно и выгодно' size='' />
                        <div>
                            <Subtitle text="Мы предлагаем взаимовыгодное партнерство владельцам салонов красоты с инструментами управления и мониторинга для обеспечения стабильного роста бизнеса. Вы можете интегрировать сразу несколько филиалов сети и в режиме онлайн управлять процессами с помощью адаптированного Web-кабинета bookers, разработанного под вашу бизнес-стратегию. bookers поможет создать эффективную воронку продаж и обрабатывать клиентов до сделки через модуль комьюнити." 
                            size='max-w-[759px]  lg:text-left' />
                        </div>
                        <div className='mt-[20px]'>
                            <Subtitle text="Web-кабинет bookers интегрирует ваш бизнес с модулями для повышения лояльности клиентов, увеличения доходов и анализа деятельности."
                             size='max-w-[759px]  lg:text-left' />
                        </div>
                        <OfferCards
                        icon={RefreshCcw}
                        data={ThreeCard}
                        title='Какую интеграцию предлагает BOOKERS бизнес-партнерам:'
                        firstButtonTitle="Интеграция"
                        secondButtonTitle='Войти / Регистрация'
                    />
                    </div>
                    
                </div>
                <Footer />
            </div>
        </div>
    )
}
