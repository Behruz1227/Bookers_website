import { Link } from "react-router-dom";

//img
import Pin from "../../assets/footer/Pin.png";
import Phone from "../../assets/footer/Phone.png";
import Messege from "../../assets/footer/Message.png";
import logo from "../../assets/footer/Layer_1 (5).png";
import Facebook from "../../assets/footer/Footer.png";
import Instagram from "../../assets/footer/instagram.png";
import X from "../../assets/footer/X.png";
import YouTube from "../../assets/footer/youtube.png";
import APP from "../../assets/footer/Group (8).png";
import Play from "../../assets/footer/Group 144.png";

function Footer() {
  return (
    <div className="bg-[#161621] w-full text-[#ffffff]">
      <div className=" mx-auto py-10 container ">
        {/* top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10  text-center md:text-left">
          <div className="flex flex-col gap-5 items-center md:items-start">
            <h2 className="text-[20px] font-bold font-manrope">Документация</h2>
            <Link to="/conditions" className="text-[15px] font-normal font-manrope">
              Условия использования
            </Link>
            <Link to="/conditions" className="text-[15px] font-normal font-manrope">
              Публичное соглашение
            </Link>
            <Link to="/conditions" className="text-[15px] font-normal font-manrope">
              Лицензионным соглашением
            </Link>
            <Link to="/conditions" className="text-[15px] font-normal font-manrope">
              Политикой конфиденциальности
            </Link>
          </div>
          <div className="flex flex-col gap-5 items-center md:items-start">
            <h2 className="text-[20px] font-bold font-manrope">Ссылки основных страниц</h2>
            <Link to="/Home" className="text-[15px] font-normal font-manrope">Kлиентам</Link>
            <Link to="/Home" className="text-[15px] font-normal font-manrope">Mастерам</Link>
            <Link to="/Home" className="text-[15px] font-normal font-manrope">Бизнес-партнерство</Link>
            <Link to="/Home" className="text-[15px] font-normal font-manrope">Мастерклассы / Обучение/ Тренинги</Link>
            <Link to="/Tariffs" className="text-[15px] font-normal font-manrope">Пакеты для мастеров</Link>
            <Link to="/#" className="text-[15px] font-normal font-manrope">FAQ</Link>
          </div>
          <div className="flex flex-col gap-5 items-center md:items-start">
            <h2 className="text-[20px] font-bold font-manrope">Вход / Регистрация</h2>
            <Link to="/register" className="text-[15px] font-normal font-manrope">Kлиент</Link>
            <Link to="/register" className="text-[15px] font-normal font-manrope">Mастер</Link>
            <Link to="/Home" className="text-[15px] font-normal font-manrope">Бизнес-партнер</Link>
          </div>
          <div className="flex flex-col gap-5 items-start md:items-start">
            <h2 className="text-[20px] font-bold font-manrope">Kонтактные данные</h2>
            <a href="#" className="flex flex-col sm:flex-row items-start gap-3">
              <img src={Pin} alt="Pin" />
              <p className="text-[15px] font-normal font-manrope">
                Республика Узбекистан, город <br />
                Ташкент, Алмазарский район СГМ <br />
                Янги Себзор, Массив Себзар <br />
                Ц17/18, дом 8, кв. 31
              </p>
            </a>
            <a href="#" className="flex flex-col sm:flex-row  gap-3">
              <img src={Phone} alt="Phone" />
              <p className="text-[15px] font-normal font-manrope">+998 77 308-88-88</p>
            </a>
            <a href="#" className="flex flex-col sm:flex-row items-center gap-3">
              <img src={Messege} alt="Message" />
              <p className="text-[15px] font-normal font-manrope">info@welltech.uz</p>
            </a>
          </div>
        </div>

        {/* main */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-10 py-10">
          <div className="flex justify-center items-center flex-col gap-3">
            <Link to="Home" className="flex flex-col items-center">
              <img src={logo} width={60} height={76.67} alt="logo" />
              <p>bookers</p>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-10">
            <div className="flex flex-col gap-5 items-center sm:items-start">
              <p className="text-[20px] font-extrabold font-manrope text-center sm:text-left">
                Мы в социальных сетях
              </p>
              <div className="flex gap-4">
                <a href="#"><img src={Facebook} alt="Facebook" /></a>
                <a href="#"><img src={Instagram} alt="Instagram" /></a>
                <a href="#"><img src={X} alt="X" /></a>
                <a href="#"><img src={YouTube} alt="YouTube" /></a>
              </div>
            </div>
            <div className="flex flex-col gap-5 items-center sm:items-start">
              <p className="text-[20px] font-extrabold font-manrope text-center sm:text-left">
                Загрузите наше приложение на
              </p>
              <div className="flex gap-4">
                <a href="#"><img src={APP} alt="App Store" /></a>
                <a href="#"><img src={Play} alt="Google Play" /></a>
              </div>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="text-center pt-5">
          <p className="text-[15px] font-normal font-manrope">© 2024 Bookers. Все права защищены.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
