//API
import { category, dashboard } from '@/helpers/Url';

// Hooks
import { useEffect } from 'react';

//Quary
import { useGlobalRequest } from '@/helpers/Quary/quary';

//components
import Hero from '@/components/Hero/Hero';
import OfferCards from '@/components/cards/OfferCards';
import { ServiceCard } from '@/components/cards/ServiceCard';
import Footer from '@/components/footer/Footer';
import HeaderTitles from '@/components/HeadTitle';
import Button from '@/components/button/Button';
import { BlogSlider } from '@/components/splide/BlogCardSlider';
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
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import Loading from '@/components/Loading/Loading';




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



function Home() {
  const { t } = useTranslation()


  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const section = document.getElementById(hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const FirstCard = [
    { text: t("Быстрое и удобное бронирование") },
    { text: t("Гарантированные онлайн-записи") },
    { text: t("Большой выбор мастеров") },
    { text: t("Детальная информация о профилях мастеров и отзывы клиентов") },
    { text: t("Интеграция с календарем и напоминания") },
    { text: t("Программы лояльности и бонусы") },
  ];

  const TwoCard = [
    { text: t("Возможность настраивать услуги по полу, категориям, специализациям и процедурам") },
    { text: t("Управление графиком работы") },
    { text: t("Онлайн бронирование") },
    { text: t("Активация времени для VIP клиентов") },
    { text: t("Настройка приема онлайн оплаты и и предоплаты") },
    { text: t("Учет расходов мастера") },
    { text: t("Создать записи на месяц вперед и другие") },
  ];

  const ThreeCard = [
    { text: t("Модуль управления клиентами") },
    { text: t("Модуль мониторинга и аналитики") },
    { text: t("Модуль планирования и расписания") },
    { text: t("Модуль маркетинга и продвижения") },
    { text: t("Модуль управления персоналом") },
    { text: t("Модуль комьюнити") },
  ];


  const {
    loading: statsLoading,
    error: statsError,
    response: statsResponse,
    globalDataFunc: fetchStats,
  } = useGlobalRequest(
    `${dashboard}`,
    'GET',
  );
  const { setOtzivHolat, setMasterClassHolat, setLoginHolat } = LoginIndex();

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
    return <Loading />;
  }
  if (statsError || categoryError) {
    return <div>Error: {statsError || categoryError}</div>;
  }
  const statsData = statsResponse?.body || {};
  const categories = categoryResponse?.body || [];

  return (
    <>
      <div className='bg-[#111827] w-full mx-auto '>
        <div className=" w-full h-">
          <div>
          </div>
        </div>
        <Hero slides={[
          {
            title: t("Система бронирования для мастеров, салонов красоты и их клиентов"),
            description: t("Мы создаем систему взаимодействия между мастерами, бизнес-партнерами (салонами красоты) и клиентами, что является основной миссией данной системы бронирования. Платформа BOOKERS создает комфортные и выгодные условия для каждого клиента, предоставляя квалифицированные услуги мастеров."),
            image: HeroImg,
          },
          {
            title: t("Система бронирования для мастеров, салонов красоты и их клиентов"),
            description: t("Мы создаем систему взаимодействия между мастерами, бизнес-партнерами (салонами красоты) и клиентами, что является основной миссией данной системы бронирования. Платформа BOOKERS создает комфортные и выгодные условия для каждого клиента, предоставляя квалифицированные услуги мастеров."),
            image: HeroImg,
          },
          {
            title: t("Система бронирования для мастеров, салонов красоты и их клиентов"),
            description: t("Мы создаем систему взаимодействия между мастерами, бизнес-партнерами (салонами красоты) и клиентами, что является основной миссией данной системы бронирования. Платформа BOOKERS создает комфортные и выгодные условия для каждого клиента, предоставляя квалифицированные услуги мастеров."),
            image: HeroImg,
          }
        ]} />
        <Line />
        <section id="offer" className='grid grid-cols-1 xl:grid-cols-3 lg:gap-10 gap-6 md:grid-cols-1'>
          <OfferCards icon={Gift} data={FirstCard} onclickFirstButton={() => window.open('https://apps.apple.com/uz/app/bookers-%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%83%D1%81%D0%BB%D1%83%D0%B3/id6503646200', '_blank')} onclickSecondButton={() => setLoginHolat(true)} title={t("Что предлагает BOOKERS клиентам услуг красоты? ")} firstButtonTitle={t("Скачать приложение")} secondButtonTitle={t("Войти / Регистрация")} />
          <OfferCards icon={HandCoins} data={TwoCard} onclickFirstButton={() => window.open('https://apps.apple.com/uz/app/bookers-%D0%B1%D1%80%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%83%D1%81%D0%BB%D1%83%D0%B3/id6503646200', '_blank')} title={t("Что предлагает BOOKERS мастерам?")} firstButtonTitle={t("Скачать приложение")} secondButtonTitle={t("Оформить подписку")} />
          <OfferCards icon={FiRefreshCw} data={ThreeCard} title={t("Какую интеграцию предлагает BOOKERS бизнес-партнерам:")} onclickSecondButton={() => setLoginHolat(true)} firstButtonTitle={t("Интеграция")} secondButtonTitle={t("Войти / Регистрация")} />
        </section>

        <Line />
        <section>
          <HeaderTitles text={t("Выберите категорию услуг красоты в bookers")} />
          <div className='pt-10'>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-20">
              {categories.map((item: { id: number, attachmentId: string, name: string }) => (
                <ServiceCard
                  key={item.id}
                  className='px-10'
                  attachmentId={item.attachmentId}
                  title={item.name}
                  description={t("Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.")}
                  id={item.id}
                />
              ))}
            </div>
          </div>

        </section>
        <Line />
        <section id="masterClass">
          <div className="w-full xl:w-[60%]">
            <HeaderTitles text={t("Продвигайте свои мастер-классы, тренинги и обучения на платформах bookers")} />
          </div>
          <div className='w-full xl:w-[60%]'>
            <Subtitle text={t("Мы предлагаем мастерам внедрение кросс-маркетинговых проектов в рамках программы “Мастер класс”. Данная программа предназначена для мастеров, которые проводят мастер-классы, тренинги и обучения по своей специальности.")} />
          </div>
          <h2 className="font-manrope font-bold text-[20px] sm:text-[26px] md:text-[30px] text-white  sm:text-left">
            {t("Какую пользу вы получите с участием в программе “Мастер классы”")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-5">
            <Card description={t("Повышение лояльности аудитории — создание условий для укрепления связи с текущими клиентами и привлечения новых.")} />
            <Card description={t("Увеличение узнаваемости бренда — активное продвижение вашего бренда через различные каналы, чтобы сделать его более известным и популярным.")} />
            <Card description={t("Сбор целевой аудитории — привлечение и удержание клиентов, которые действительно заинтересованы в ваших услугах и продуктах.")} />
            <Card description={t("Мониторинг интереса  — постоянный анализ и отслеживание предпочтений и интересов аудитории для более точного удовлетворения их потребностей.")} />
            <Card description={t("Создание эффективного канала продвижения — разработка и внедрение стратегий, которые обеспечат максимальную эффективность в продвижении ваших услуг и продуктов.")} />
          </div>
          <div className="w-full bg-[#B9B9C9] rounded-[16px] p-4 sm:p-6 md:p-10">
            <div className="flex flex-col md:flex-col lg:flex-row justify-between items-center gap-4 md:gap-6">
              <h2 className="text-[#9C0B35] font-manrope font-extrabold text-center md:text-left leading-[26px] sm:leading-[30px] md:leading-[40px] text-[16px] sm:text-[18px] md:text-[24px]">
                {t(
                  "Для  создания объявления и обеспечения видимости мероприятия в мобильном приложении и на сайте BOOKERS отправьте заявку."
                )}
              </h2>
              <button
                className="w-full sm:w-[300px] md:w-full lg:w-[440px] h-[50px] sm:h-[60px] md:h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[16px] sm:text-[18px] leading-[26px] sm:leading-[30px]"
                onClick={() => setMasterClassHolat(true)}
              >
                {t("Отправить заявку")}
              </button>
            </div>
          </div>


        </section>
        <Line />
        <section>
          <div className='pb-10'>
            <HeaderTitles text={t("Ознакомьтесь с отзывами клиентов касательно услуг мастеров и салонов красоты перед бронированием")} />
          </div>
          <div className='pt-10'>
            <TestimonialSlider />
          </div>
          <div className='flex justify-center'>
            <Button
              className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] "
              onClick={() => setOtzivHolat(true)}
            >
              {t("Оставить отзыв")}
            </Button>
          </div>
        </section>
        <Line />
        <section>
          <HeaderTitles text={t("Статистика bookers")} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 pt-10 ">
            <StatsCard
              icon={<PiGraduationCapDuotone style={{ fontSize: '4rem' }} />}
              count={statsData.masterCount}
              title={t("Количество мастеров")}
            />
            <StatsCard
              icon={<HiOutlineUserGroup style={{ fontSize: '4rem' }} />}
              count={statsData.clientCount}
              title={t("Количество клиентов")}
            />
            <StatsCard
              icon={<PiMapPinAreaBold style={{ fontSize: '4rem' }} />}
              count={statsData.locationCount}
              title={t("Количество локаций")}
            />
            <StatsCard
              icon={<FiCheckCircle style={{ fontSize: '4rem' }} />}
              count={statsData.completedOrderCount}
              title={t("успешных бронирований")}
            />
          </div>
        </section>
        <Line />
        <section>
          <HeaderTitles text={t("Бизнес-партнеры мобильного приложения bookers")} />
          <LogoSlider logos={Logo} />
        </section>
        <section>
          <div className='pb-20'>
            <HeaderTitles text={t("Новости bookers")} />
          </div>
          <BlogSlider page={0} size={5} />
          <div className='flex justify-center pb-20'  >
            <Button
              className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] "
              onClick={() => alert("Скачать приложение")}
            >
              {t("Все новости")}
            </Button>
          </div>
        </section>
      </div>
      <Footer />

    </>
  );
}

export default Home;
