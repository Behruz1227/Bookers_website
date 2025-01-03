
import Footer from '@/components/footer/Footer'
import Header from '@/components/Header/Header'
import HeaderTitles from '@/components/HeadTitle'
import Hero from '@/components/Hero/Hero'
import Subtitle from '@/components/Subtitle'
import React from 'react'

//imgs
import imgSplide from '../../assets/img/Mask group (7).png'
import OfferCards from '@/components/cards/OfferCards'

//card 
const FirstCard = [
    { text: 'Разработка передовых IT-решений и программного обеспечения' },
    { text: 'Создание инновационных платформ для обеспечения комфорта и эффективности' },
    { text: 'Повышение качества услуг в разных сферах деятельности' },
    { text: 'Улучшение пользовательского опыта' },
    { text: 'Создание выгодных условий для всех участников экосистемы' },]

const TwoCard = [
    { text: 'Инновации' },
    { text: 'Качество' },
    { text: 'Клиентоориентированность' },
    { text: 'Партнерство' },
    { text: 'Командная рzабота' },
    { text: 'Гибкость' },
    { text: 'Устойчивое развитие' }
]
const ThreeCard = [
    { text: 'Сотрудничество' },
    { text: 'Доверие и уважение' },
    { text: 'Прозрачность и открытость' },
    { text: 'Обучение и развитие' },
    { text: 'Гибкость и адаптивность' },
    { text: 'Ответственность и самоорганизация' },
];

export const AboutCompany: React.FC = () => {
    return (
        <div className='bg-[#111827]'>
            <Header />
            <div className='container mx-auto '>
                <Hero slides={[{
                    title: "Система бронирования для мастеров, салонов красоты и их клиентов",
                    description: "Мы создаем систему взаимодействия между мастерами, бизнес-партнерами (салонами красоты) и клиентами, что является основной миссией данной системы бронирования. Платформа BOOKERS создает комфортные и выгодные условия для каждого клиента, предоставляя квалифицированные услуги мастеров.",
                    image: imgSplide, // Replace with your image path
                },
                {
                    title: "Система бронирования для мастеров, салонов красоты и их клиентов",
                    description: "Мы создаем систему взаимодействия между мастерами, бизнес-партнерами (салонами красоты) и клиентами, что является основной миссией данной системы бронирования. Платформа BOOKERS создает комфортные и выгодные условия для каждого клиента, предоставляя квалифицированные услуги мастеров.",

                    image: imgSplide, // Replace with your image path
                },
                {
                    title: "Система бронирования для мастеров, салонов красоты и их клиентов",
                    description: "Мы создаем систему взаимодействия между мастерами, бизнес-партнерами (салонами красоты) и клиентами, что является основной миссией данной системы бронирования. Платформа BOOKERS создает комфортные и выгодные условия для каждого клиента, предоставляя квалифицированные услуги мастеров.",
                    image: imgSplide, // Replace with your image path
                },]} />
                <div>
                    <HeaderTitles text='Свидетельства и сертификатdbookers' size='' />
                    <div className="flex flex-col lg:flex-row gap-10 justify-between py-20">
                        <OfferCards
                            description="Свидетельство о регистрации базы персональных данных в Государственном реестре баз персональных данных"
                            secondButtonTitle="Подробнее"
                        />
                        <OfferCards
                            description="Свидетельство о регистрации базы персональных данных в Государственном реестре баз персональных данных"
                            secondButtonTitle="Подробнее"
                        />
                    </div>
                </div>
                <div>
                    <HeaderTitles text='Компания Well Tech:  Наша миссия и ценности' size='' />
                    <div className="flex flex-col lg:flex-row gap-10 justify-between py-20">
                        <OfferCards
                            data={FirstCard}
                            title="Что предлагает BOOKERS клиентам услуг красоты?"
                        />
                        <OfferCards
                            data={TwoCard}
                            title="Что предлагает BOOKERS мастерам?"
                        />
                    </div>

                </div>
                <div>
                    <HeaderTitles text='Компания Well Tech:  Наша команда' size='' />
                    <Subtitle
                        text="Well Tech объединяет талантливых разработчиков, дизайнеров, проектных менеджеров, маркетологов и аналитиков и квалифицированных специалистов своего направления. Каждый из нас вносит уникальный вклад в создание IT-решений и ведение успешных проектов."
                        size="w-full max-w-[759px]  lg:text-left"
                    />

                    <div>
                        <OfferCards
                            data={ThreeCard}
                            title='Мы ценим'
                        />
                    </div>
                    <Subtitle 
                       text='Благодаря слаженной работе нашей команды, мы успешно реализовали множество проектов, которые получили высокую оценку от наших клиентов и пользователей. Мы гордимся нашими достижениями и продолжаем стремиться к новым высотам, улучшая качество наших продуктов и услуг.' 
                       size='max-w-[759px]  lg:text-left' />
                </div>
            </div>
            <Footer />
        </div>
    )
}
