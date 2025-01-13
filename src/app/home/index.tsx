//API
import { category, dashboard } from '@/helpers/Url';

// Hooks
import { useEffect, useState } from 'react';

//Quary
import { useGlobalRequest } from '@/helpers/Quary/quary';

//components
import Header from '@/components/Header/Header'; import Hero from '@/components/Hero/Hero';
import OfferCards from '@/components/cards/OfferCards';
import { ServiceCard } from '@/components/cards/ServiceCard';
import Footer from '@/components/footer/Footer';
import HeaderTitles from '@/components/HeadTitle';
import Button from '@/components/button/Button';
import { BlogCardSlider } from '@/components/splide/BlogCardSlider';
import { TestimonialSlider } from '@/components/splide/TestimonialSlider';
import { StatsCard } from '@/components/cards/stats-card';
import { Line } from '@/components/Line/Line';
import Subtitle from '@/components/Subtitle';
import Card from '@/components/cards/Card';
import { LogoSlider } from '@/components/splide/LogoSlider';

// icons 
import { Gift } from 'lucide-react';
import { HandCoins } from 'lucide-react';
import { FiCheckCircle, FiRefreshCw } from 'react-icons/fi';
import { PiGraduationCapDuotone, PiMapPinAreaBold } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi";


// Images
import HeroImg from '@/assets/img/Mask group (7).png';

//logo img
import payme from "@/assets/logo/payme.png"
import uzun from "@/assets/logo/uzum.png"
import oson from "@/assets/logo/oson.png"
import sello from "@/assets/logo/sello.png"
import click from "@/assets/logo/click.png"
import LoginIndex from '@/Store';
import MasterClassModal from '@/components/Modal/master-class-modal';
import { useTranslation } from 'react-i18next';




//logo splider
const Logo = [
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


const FirstCard = [
  { text: 'Быстрое и удобное бронирование' },
  { text: 'Гарантированные онлайн-записи' },
  { text: 'Большой выбор мастеров' },
  { text: 'Детальная информация о профилях мастеров и отзывы клиентов' },
  { text: 'Интеграция с календарем и напоминания' },
  { text: 'Программы лояльности и бонусы' },
];

const TwoCard = [
  { text: 'Возможность настраивать услуги по полу, категориям,специализациям и процедурам' },
  { text: 'Управление графиком работы' },
  { text: 'Онлайн бронирование' },
  { text: 'Активация времени для VIP клиентов' },
  { text: 'Настройка приема онлайн оплаты и предоплаты' },
  { text: 'Учет расходов мастера' },
];

const ThreeCard = [
  { text: 'Модуль управления клиентами' },
  { text: 'Модуль мониторинга и аналитики' },
  { text: 'Модуль планирования и расписания' },
  { text: 'Модуль маркетинга и продвижения' },
  { text: 'Модуль управления персоналом' },
  { text: 'Модуль комьюнити' },
];




function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation()

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const {
    loading: statsLoading,
    error: statsError,
    response: statsResponse,
    globalDataFunc: fetchStats,
  } = useGlobalRequest(
    `${dashboard}`,
    'GET',
  );
  const { setOtzivHolat } = LoginIndex();

  const {
    loading: categoryLoading,
    error: categoryError,
    response: categoryResponse,
    globalDataFunc: fetchCategories,
  } = useGlobalRequest(
    `${category}`,
    "GET"
  );

  useEffect(() => {
    fetchStats();
    fetchCategories();
  }, []);

  if (statsLoading || categoryLoading) {
    return <div>Loading...</div>;
  }

  if (statsError || categoryError) {
    return <div>Error: {statsError || categoryError}</div>;
  }

  const statsData = statsResponse?.body || {};
  const categories = categoryResponse?.body || [];




  return (
    <>
      <div className='bg-[#111827] w-full container mx-auto '>
        <Header />
        <Hero slides={[
          {
            title: t("sistema"),
            description: "Мы создаем систему взаимодействия между мастерами, бизнес-партнерами (салонами красоты) и клиентами, что является основной миссией данной системы бронирования. Платформа BOOKERS создает комфортные и выгодные условия для каждого клиента, предоставляя квалифицированные услуги мастеров.",
            image: HeroImg,
          },
          {
            title: "Система бронирования для мастеров, салонов красоты и их клиентов",
            description: "Мы создаем систему взаимодействия между мастерами, бизнес-партнерами (салонами красоты) и клиентами, что является основной миссией данной системы бронирования. Платформа BOOKERS создает комфортные и выгодные условия для каждого клиента, предоставляя квалифицированные услуги мастеров.",
            image: HeroImg,
          },
          {
            title: "Система бронирования для мастеров, салонов красоты и их клиентов",
            description: "Мы создаем систему взаимодействия между мастерами, бизнес-партнерами (салонами красоты) и клиентами, что является основной миссией данной системы бронирования. Платформа BOOKERS создает комфортные и выгодные условия для каждого клиента, предоставляя квалифицированные услуги мастеров.",
            image: HeroImg,
          }
        ]} />
        <Line />
        <section className='grid lg:grid-cols-3 gap-10 gris-cols-1 '>
          <OfferCards icon={Gift} data={FirstCard} title='Что предлагает BOOKERS клиентам услуг красоты?' firstButtonTitle="Скачать приложение" secondButtonTitle="Войти / Регистрация" />
          <OfferCards icon={HandCoins} data={TwoCard} title='Что предлагает BOOKERS мастерам?' firstButtonTitle="Скачать приложение" secondButtonTitle="Оформить подписку" />
          <OfferCards icon={FiRefreshCw} data={ThreeCard} title='Какую интеграцию предлагает BOOKERS бизнес-партнерам:' firstButtonTitle="Интеграция" secondButtonTitle="Войти / Регистрация" />
        </section>
        <Line />
        <section>
          <HeaderTitles text='Выберите категорию услуг красоты в bookers' />
          <div className='pt-10'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
              {categories.map((item: any) => (
                <ServiceCard
                  key={item.id}
                  className='px-10'
                  attachmentId={item.attachmentId}
                  title={item.name}
                  description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat."
                  id={item.id}
                />
              ))}
            </div>
          </div>

        </section>
        <Line />
        <section>
          <div className="w-full md:w-[60%]">
            <HeaderTitles text="Продвигайте свои мастер-классы, тренинги и обучения на платформах bookers" />
          </div>
          <div className='w-full md:w-[60%]'>
            <Subtitle text='Мы предлагаем мастерам внедрение кросс-маркетинговых проектов в рамках программы “Мастер класс”. Данная программа предназначена для мастеров, которые проводят мастер-классы, тренинги и обучения по своей специальности.' />
          </div>
          <h2 className='font-manrope font-bold text-[30px] text-white'>Какую пользу вы получите с участием в программе <br /> “Мастер классы”</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-5">
            <Card description="Повышение лояльности аудитории — создание условий для укрепления связи с текущими клиентами и привлечения новых." />
            <Card description="Увеличение узнаваемости бренда — активное продвижение вашего бренда через различные каналы, чтобы сделать его более известным и популярным." />
            <Card description="Сбор целевой аудитории — привлечение и удержание клиентов, которые действительно заинтересованы в ваших услугах и продуктах." />
            <Card description="Мониторинг интереса  — постоянный анализ и отслеживание предпочтений и интересов аудитории для более точного удовлетворения их потребностей." />
            <Card description="Создание эффективного канала продвижения — разработка и внедрение стратегий, которые обеспечат максимальную эффективность в продвижении ваших услуг и продуктов." />
          </div>
          <div className="w-full bg-[#B9B9C9] rounded-[16px]">
            <div className="flex flex-col md:flex-row justify-between items-center p-6 md:p-10 gap-6">
              <h2 className="text-[#9C0B35] font-manrope font-extrabold leading-[30px] md:leading-[40px] text-[18px] md:text-[24px] text-center md:text-left">
                Для создания объявления и обеспечения видимости <br className="hidden md:block" />
                мероприятия в мобильном приложении и на сайте BOOKERS <br className="hidden md:block" />
                отправьте заявку.
              </h2>
              <div>
              <button className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90" onClick={openModal}>Отправить заявку</button>
              <MasterClassModal isOpen={isModalOpen} onClose={closeModal} />
              </div>
            </div>
          </div>
        </section>
        <Line />
        <section>
          <div className='px-2'>
            <HeaderTitles text='Ознакомьтесь с отзывами клиентов касательно услуг мастеров и салонов красоты перед бронированием' />
          </div>
          <TestimonialSlider />
          <div className='flex justify-center'>
            <Button
              className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] hover:opacity-90"
              onClick={() => setOtzivHolat(true)}
            >
              Оставить отзыв
            </Button>
          </div>
        </section>
        <Line />
        <section>
          <HeaderTitles text='Статистика bookers' />
          <div className="grid grid-cols-1 gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              icon={<PiGraduationCapDuotone style={{ fontSize: '5rem' }} />}
              count={statsData.masterCount}
              title="Количество мастеров"
            />
            <StatsCard
              icon={<HiOutlineUserGroup style={{ fontSize: '5rem' }} />}
              count={statsData.clientCount}
              title="Количество клиентов"
            />
            <StatsCard
              icon={<PiMapPinAreaBold style={{ fontSize: '5rem' }} />}
              count={statsData.locationCount}
              title="Количество локаций"
            />
            <StatsCard
              icon={<FiCheckCircle style={{ fontSize: '5rem' }} />}
              count={statsData.completedOrderCount}
              title="Успешных бронирований"
            />
          </div>

        </section>
        <Line />
        <section>
          <HeaderTitles text='Бизнес-партнеры мобильного приложения bookers' />
          <LogoSlider logos={Logo} />
        </section>
        <section>
          <HeaderTitles text='Новости bookers' />
          <BlogCardSlider />
          <div className='flex justify-center pb-20'  >
            <Button
              className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
              onClick={() => alert("Скачать приложение")}
            >
              Все новости
            </Button>
          </div>
        </section>
      </div>
      <Footer />

    </>
  );
}

export default Home;
