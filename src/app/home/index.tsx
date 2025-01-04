import React from 'react';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import OfferCards from '@/components/cards/OfferCards';
import { Gift } from 'lucide-react';
import { HandCoins } from 'lucide-react';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import Footer from '@/components/footer/Footer';


const FirstCard = [
  { text: 'Быстрое и удобное бронирование' },
  { text: 'Гарантированные онлайн-записи' },
  { text: 'Большой выбор мастеров' },
  { text: 'Детальная информация о профилях мастеров и отзывы клиентов' },
  { text: 'Интеграция с календарем и напоминания' },
  { text: 'Программы лояльности и бонусы' },]

const TwoCard = [
  { text: 'Возможность настраивать услуги по полу, категориям,специализациям и процедурам' },
  { text: 'Управление графиком работы' },
  { text: 'Онлайн бронирование' },
  { text: 'Активация времени для VIP клиентов' },
  { text: 'ИНастройка приема онлайн оплаты и и предоплаты' },
  { text: 'Учет расходов мастера' },
]
const ThreeCard = [
  { text: 'Модуль управления клиентами' },
  { text: 'Модуль мониторинга и аналитики' },
  { text: 'Модуль планирования и расписания' },
  { text: 'Модуль маркетинга и продвижения' },
  { text: 'Модуль управления персоналом' },
  { text: 'Модуль комьюнити' },
];


function Home() {
  return (
    <>
      <div className='bg-[#111827] w-full px-[7%]'>
        <Header />
        <Hero slides={[{
          title: "Slide 1",
          description: "This is the first slide description.",
          description2: "Additional information for Slide 1.",
          image: "https://picsum.photos/1001",
        },
        {
          title: "Slide 2",
          description: "This is the second slide description.",
          description2: "Additional information for Slide 2.",
          image: "https://picsum.photos/1002", 
        },
        {
          title: "Slide 3",
          description: "This is the third slide description.",
          image: "https://picsum.photos/1000",
        },]} />
        <div className='grid lg:grid-cols-3 gris-cols-1 pb-[162px]'>
          <OfferCards icon={Gift} data={FirstCard} title='Что предлагает BOOKERS клиентам услуг красоты?' />
          <OfferCards icon={HandCoins} data={TwoCard} title='Что предлагает BOOKERS мастерам?' />
          <OfferCards icon={Gift} data={ThreeCard} title='Какую интеграцию предлагает BOOKERS бизнес-партнерам:' />
        </div>
        <div className="bg-gray-900 p-4">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-700 text-3xl font-semibold">
            Выберите категорию услуг красоты в bookers
          </h2>
          <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 '>
            <ServiceCard link='/galereya' className='' description='Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat. услуги' image='https://picsum.photos/1000' title='Парикмахерские услуги' />
            <ServiceCard className='' description='Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat. услуги' image='https://picsum.photos/1000' title='Парикмахерские услуги' />
            <ServiceCard className='' description='Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat. услуги' image='https://picsum.photos/1000' title='Парикмахерские услуги' />
            <ServiceCard className='' description='Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat. услуги' image='https://picsum.photos/1000' title='Парикмахерские услуги' />
            <ServiceCard className='' description='Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat. услуги' image='https://picsum.photos/1000' title='Парикмахерские услуги' />
            <ServiceCard className='' description='Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat. услуги' image='https://picsum.photos/1000' title='Парикмахерские услуги' />
            <ServiceCard className='' description='Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat. услуги' image='https://picsum.photos/1000' title='Парикмахерские услуги' />
          </div>
        </div>
        <div>
          <div className='mb-[60px]'>
            <h2 className='pb-[50px]  text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-700 text-3xl font-semibold'>Продвигайте свои мастер-классы, тренинги <br /> и обучения на платформах bookers</h2>
            <p className='text-[18px] text-[#B9B9C9]'>Мы предлагаем мастерам внедрение кросс-маркетинговых проектов в рамках программы <br /> “Мастер класс”. Данная программа предназначена для мастеров, которые проводят <br /> мастер-классы, тренинги и обучения по своей специальности.</p>
          </div>
        </div>
        <div>
          <h2 className='text-white text-[30px]'>Какую пользу вы получите с участием в программе <br /> “Мастер классы”</h2>
        </div>
        <div>
          {/* <TestimonialCard /> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
