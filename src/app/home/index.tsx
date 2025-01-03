//card img
import img from "@/assets/img/Bg (1).png"
import { Line } from '@/components/Line/Line';
import imgSplide from '../../assets/img/Mask group (7).png'
import blogImg from "@/assets/cards/Rectangle 4165 (1).png"

//logo img
import payme from "@/assets/logo/payme.png"
import uzun from "@/assets/logo/uzum.png"
import oson from "@/assets/logo/oson.png"
import sello from "@/assets/logo/sello.png"
import click from "@/assets/logo/click.png"


//card icons
import { Gift, HandCoins, RefreshCcw } from 'lucide-react';

import { PiGraduationCapDuotone } from "react-icons/pi";
import { HiUserGroup } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { BsCheckCircle } from "react-icons/bs";


//components
import Card from "@/components/cards/Card";
import Button from '@/components/button/Button';

import Footer from '@/components/footer/Footer';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import OfferCards from '@/components/cards/OfferCards';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { StatsCard } from "@/components/cards/stats-card";
import { useState } from "react";
import { UniversalModal } from "@/components/Modal/UniversalModal";
import { TestimonialSlider } from "@/components/splide/TestimonialSlider";
import { LogoSlider } from "@/components/splide/LogoSlider";
import { BlogCardSlider } from "@/components/splide/BlogCardSlider";


//blog card

const blogPosts = [
  {
    id: 1,
    image: blogImg,
    date: "18 июня 2024 г.",
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since..."
  },
  {
    id: 2,
    image: blogImg,
    date: "18 июня 2024 г.",
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since..."
  },
  {
    id: 3,
    image: blogImg,
    date: "18 июня 2024 г.",
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since..."
  }
];


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
  { text: 'Создать записи на месяц вперед и другие' },
]
const ThreeCard = [
  { text: 'Модуль управления клиентами' },
  { text: 'Модуль мониторинга и аналитики' },
  { text: 'Модуль планирования и расписания' },
  { text: 'Модуль маркетинга и продвижения' },
  { text: 'Модуль управления персоналом' },
  { text: 'Модуль комьюнити' },
];


//logo splider
const paymentLogos = [
  { src: payme, alt: 'Payme' },
  { src: uzun, alt: 'Uzum Bank' },
  { src: oson, alt: 'OSRN' },
  { src: sello, alt: 'Sello' },
  { src: click, alt: 'Click' },
  { src: payme, alt: 'Payme' },
  { src: uzun, alt: 'Uzum Bank' },
  { src: oson, alt: 'OSRN' },
  { src: sello, alt: 'Sello' },
  { src: click, alt: 'Click' },
];


function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
      <div className='bg-[#111827] w-full px-[7%]'>
        <Header />
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
        <Line />
        <div className="flex flex-col lg:flex-row justify-between gap-5" id="offer">
          <OfferCards
            icon={Gift}
            data={FirstCard}
            title="Что предлагает BOOKERS клиентам услуг красоты? "
            firstButtonTitle="Скачать приложение"
            secondButtonTitle="Войти / Регистрация"
          />
          <OfferCards
            icon={HandCoins}
            data={TwoCard}
            title="Что предлагает BOOKERS мастерам?"
            firstButtonTitle="Скачать приложение"
            secondButtonTitle="Оформить подписку"
          />
          <OfferCards
            icon={RefreshCcw}
            data={ThreeCard}
            title="Какую интеграцию предлагает BOOKERS бизнес-партнерам:"
            firstButtonTitle="Интеграция"
            secondButtonTitle="Войти / Регистрация"
          />
        </div>
        <Line />
        <div >
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] font-manrope font-extrabold text-[32px] sm:text-[40px] lg:text-[44px] leading-[40px] sm:leading-[48px] lg:leading-[54px] tracking-[-0.04em]">
            Выберите категорию услуг красоты в bookers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
            <ServiceCard className="" description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat. услуги" image={img} title="Парикмахерские услуги" />
            <ServiceCard className="" description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat. услуги" image={img} title="Парикмахерские услуги" />
            <ServiceCard className="" description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat. услуги" image={img} title="Парикмахерские услуги" />
            <ServiceCard className="" description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat. услуги" image={img} title="Парикмахерские услуги" />
            <ServiceCard className="" description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat. услуги" image={img} title="Парикмахерские услуги" />
            <ServiceCard className="" description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat. услуги" image={img} title="Парикмахерские услуги" />
            <ServiceCard className="" description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat. услуги" image={img} title="Парикмахерские услуги" />
          </div>
        </div>

        <Line />
        <div>
          <div className="w-full">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] font-manrope font-extrabold text-[28px] md:text-[44px] leading-[36px] md:leading-[54px] tracking-[-0.04em] text-left">
              Продвигайте свои мастер-классы, тренинги <br className="hidden md:block" /> и обучения на платформах bookers
            </h2>
            <p className="font-manrope text-[16px] md:text-[18px] font-medium text-[#B9B9C9] leading-[24px] md:leading-[30px] my-10 md:my-20 text-left">
              Мы предлагаем мастерам внедрение кросс-маркетинговых проектов в рамках программы <br className="hidden md:block" />
              “Мастер класс”. Данная программа предназначена для мастеров, которые проводят <br className="hidden md:block" />
              мастер-классы, тренинги и обучения по своей специальности.
            </p>
          </div>
        </div>
        <div>
          <h2 className='font-manrope font-bold text-[30px] leading-[40px] text-[#ffffff]'>Какую пользу вы получите с участием в программе <br /> “Мастер классы”</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-5">
          <Card
            description="Повышение лояльности аудитории — создание условий для укрепления связи с текущими клиентами и привлечения новых."
          />
          <Card
            description="Сбор целевой аудитории — привлечение и удержание клиентов, которые действительно заинтересованы в ваших услугах и продуктах."
          />
          <Card
            description="Мониторинг интереса  — постоянный анализ и отслеживание предпочтений и интересов аудитории для более точного удовлетворения их потребностей."
          />
          <Card
            description="Создание эффективного канала продвижения — разработка и внедрение стратегий, которые обеспечат максимальную эффективность в продвижении ваших услуг и продуктов."
          />
          <Card
            description="Создание эффективного канала продвижения — разработка и внедрение стратегий, которые обеспечат максимальную эффективность в продвижении ваших услуг и продуктов."
          />
        </div>
        <div className="w-full bg-[#B9B9C9] rounded-[16px]">
          <div className="flex flex-col md:flex-row justify-between items-center p-6 md:p-10 gap-6">
            <h2 className="text-[#9C0B35] font-manrope font-extrabold leading-[30px] md:leading-[40px] text-[18px] md:text-[24px] text-center md:text-left">
              Для создания объявления и обеспечения видимости <br className="hidden md:block" />
              мероприятия в мобильном приложении и на сайте BOOKERS <br className="hidden md:block" />
              отправьте заявку.
            </h2>
            <Button
              className="w-full md:w-[340px] h-[50px] md:h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[16px] md:text-[18px] leading-[25px] md:leading-[30px] hover:opacity-90"
              onClick={openModal}
            >
              Отправить заявку
            </Button>
          </div>
        </div>
        <Line />
        <div>
          <h1 className=" text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] font-manrope font-extrabold text-[32px] sm:text-[40px] lg:text-[44px] leading-[40px] sm:leading-[48px] lg:leading-[54px] tracking-[-0.04em]">Ознакомьтесь с отзывами клиентов касательно услуг мастеров и салонов красоты перед бронированием</h1>
          <TestimonialSlider />
          <div className="text-center">
            <Button
              className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
              onClick={() => alert("Скачать приложение")}
            >
              Оставить отзыв
            </Button>
          </div>
        </div>
        <Line />
        <div>
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] font-manrope font-extrabold text-[32px] sm:text-[40px] lg:text-[44px] leading-[40px] sm:leading-[48px] lg:leading-[54px] tracking-[-0.04em]">Статистика bookers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center my-20">
            <StatsCard
              icon={<PiGraduationCapDuotone style={{ fontSize: '50px' }} />}
              count={500}
              title="Количество мастеров"
            />
            <StatsCard
              icon={<HiUserGroup style={{ fontSize: '50px' }} />}
              count={1002}
              title="Количество клиентов"
            />
            <StatsCard
              icon={<IoLocationSharp style={{ fontSize: '50px' }} />}
              count={135}
              title="Количество локаций"
            />
            <StatsCard
              icon={<BsCheckCircle style={{ fontSize: '50px' }} />}
              count={1200}
              title="Успешных бронирований"
            />
          </div>


        </div>
        <Line />
        <div id="#app">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] font-manrope font-extrabold text-[32px] sm:text-[40px] lg:text-[44px] leading-[40px] sm:leading-[48px] lg:leading-[54px] tracking-[-0.04em]">Бизнес-партнеры мобильного приложения bookers</h2>
          <LogoSlider logos={paymentLogos} />
        </div>
        <Line />
        <div>
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] font-manrope font-extrabold text-[32px] sm:text-[40px] lg:text-[44px] leading-[40px] sm:leading-[48px] lg:leading-[54px] tracking-[-0.04em]">Новости bookers</h2>
          <BlogCardSlider posts={blogPosts} />
          <div className="text-center pb-20">
            <Button
              className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
              onClick={() => alert("Скачать приложение")}
            >
              Все новости
            </Button>
          </div>
        </div>
      </div>
      <Footer />
      <>

        <UniversalModal isOpen={isModalOpen} onClose={closeModal} style="max-h-[90vh] w-[90%]">
          <div className="w-full text-center">
            <div>
              <h1>Форма заявки</h1>
              <div>
                <div>

                </div>
              </div>
              <button type="button" className="mt-4 bg-[#9C0B35] text-white py-2 px-4 rounded" onClick={closeModal}>close</button>
            </div>
          </div>
        </UniversalModal>
      </>
    </>
  );

}

export default Home;
