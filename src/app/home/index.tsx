//API
import { category, dashboard } from '@/helpers/Url';

// Hooks
import { useEffect, useState } from 'react';

//Quary
import { useGlobalRequest } from '@/helpers/Quary/quary';

//components
import Hero from '@/components/Hero/Hero';
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
import { FiCheckCircle, FiPhoneCall, FiRefreshCw } from 'react-icons/fi';
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
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
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
    { text: t("OfferCardLeft1") },
    { text: t("OfferCardLeft2") },
    { text: t("OfferCardLeft3") },
    { text: t("OfferCardLeft4") },
    { text: t("OfferCardLeft5") },
    { text: t("OfferCardLeft6") },
  ];

  const TwoCard = [
    { text: t("OfferCardMiddle1") },
    { text: t("OfferCardMiddle2") },
    { text: t("OfferCardMiddle3") },
    { text: t("OfferCardMiddle4") },
    { text: t("OfferCardMiddle5") },
    { text: t("OfferCardMiddle6") },
  ];

  const ThreeCard = [
    { text: t("OfferCardRight1") },
    { text: t("OfferCardRight2") },
    { text: t("OfferCardRight3") },
    { text: t("OfferCardRight4") },
    { text: t("OfferCardRight5") },
    { text: t("OfferCardRight6") },
  ];
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const navigate = useNavigate()
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
          <div className="flex items-center gap-28 lg:justify-end justify-center  py-6">
            <div
              onClick={() => navigate('/Master/...')}
              className="p-2 bg-[#9C0B35] rounded-full border">
              <FaSearch color="white" />
            </div>
            <div className="hidden lg:flex items-center gap-2 border font-semibold border-white pl-2 pr-4 py-2 rounded-full">
              <FiPhoneCall color="white" className="bg-[#9C0B35] p-2 rounded-full " size={30} />
              <span className='text-white'>+998 77 308-88-88</span>
            </div>
          </div>

        </div>
        <Hero slides={[
          {
            title: t("sistema"),
            description: t("HeroDescription"),
            image: HeroImg,
          },
          {
            title: t("sistema"),
            description: t("HeroDescription"),
            image: HeroImg,
          },
          {
            title: t("sistema"),
            description: t("HeroDescription"),
            image: HeroImg,
          }
        ]} />
        <Line />
        <section  id="offer" className='grid grid-cols-1 xl:grid-cols-3 lg:gap-10 gap-6 md:grid-cols-1'>
          <OfferCards icon={Gift} data={FirstCard} title={t("OfferCardsTitle")} firstButtonTitle={t("Download")} secondButtonTitle={t("auth")} />
          <OfferCards icon={HandCoins} data={TwoCard} title={t("OfferCardsTitle1")} firstButtonTitle={t("Download")} secondButtonTitle={t("follow")} />
          <OfferCards icon={FiRefreshCw} data={ThreeCard} title={t("OfferCardsTitle2")} firstButtonTitle={t("Integration")} secondButtonTitle={t("auth")} />
        </section>

        <Line />
        <section>
          <HeaderTitles text={t("Headertitle1")} />
          <div className='pt-10'>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-20">
              {categories.map((item: any) => (
                <ServiceCard
                  key={item.id}
                  className='px-10'
                  attachmentId={item.attachmentId}
                  title={item.name}
                  description={t("descriptionn")}
                  id={item.id}
                />
              ))}
            </div>
          </div>

        </section>
        <Line />
        <section>
          <div className="w-full xl:w-[60%]">
            <HeaderTitles text={t("Headertitle2")} />
          </div>
          <div className='w-full xl:w-[60%]'>
            <Subtitle text={t("Subtitle1")} />
          </div>
          <h2 className='font-manrope font-bold text-[30px] text-white'>{t("MasterClass")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-5">
            <Card description={t("MasterClasscard")} />
            <Card description={t("MasterClasscard2")} />
            <Card description={t("MasterClasscard3")} />
            <Card description={t("MasterClasscard4")} />
            <Card description={t("MasterClasscard5")} />
          </div>
          <div className="w-full bg-[#B9B9C9] rounded-[16px]">
            <div className="flex flex-col xl:flex-row justify-between items-center p-6 md:p-10 gap-6">
              <h2 className="text-[#9C0B35] font-manrope font-extrabold leading-[30px] md:leading-[40px] text-[18px] md:text-[24px] text-center md:text-left">
                {t("Bookers")}
              </h2>
              <div>
                <button className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90" onClick={openModal}>{t("SendApplication")}</button>
                <MasterClassModal isOpen={isModalOpen} onClose={closeModal} />
              </div>
            </div>
          </div>
        </section>
        <Line />
        <section>
          <div className='px-2'>
            <HeaderTitles text={t("Headertitle3")} />
          </div>
          <TestimonialSlider />
          <div className='flex justify-center'>
            <Button
              className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] hover:opacity-90"
              onClick={() => setOtzivHolat(true)}
            >
              {t("LeaveFeedback")}
            </Button>
          </div>
        </section>
        <Line />
        <section>
          <HeaderTitles text={t("chart")} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 pt-10 ">
            <StatsCard
              icon={<PiGraduationCapDuotone style={{ fontSize: '4rem' }} />}
              count={statsData.masterCount}
              title={t("masters")}
            />
            <StatsCard
              icon={<HiOutlineUserGroup style={{ fontSize: '4rem' }} />}
              count={statsData.clientCount}
              title={t("customers")}
            />
            <StatsCard
              icon={<PiMapPinAreaBold style={{ fontSize: '4rem' }} />}
              count={statsData.locationCount}
              title={t("locations")}
            />
            <StatsCard
              icon={<FiCheckCircle style={{ fontSize: '4rem' }} />}
              count={statsData.completedOrderCount}
              title={t("Successful")}
            />
          </div>
        </section>
        <Line />
        <section>
          <HeaderTitles text={t("logo")} />
          <LogoSlider logos={Logo} />
        </section>
        <section>
          <HeaderTitles text={t("news")} />
          <BlogCardSlider />
          <div className='flex justify-center pb-20'  >
            <Button
              className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
              onClick={() => alert("Скачать приложение")}
            >
              {t("AllNews")}
            </Button>
          </div>
        </section>
      </div>
      <Footer />

    </>
  );
}

export default Home;
