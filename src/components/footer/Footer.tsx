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
import LoginIndex from "@/Store";
import { t } from "i18next";
import useHelpTypeStore from "@/Store/HelpType";

function Footer() {
  const { setLoginHolat, setLoginRole } = LoginIndex();





  const { HelpType } = useHelpTypeStore();


  return (
    <div className="bg-[#111827] w-full text-[#ffffff]">
      <div className="mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Documentation */}
          <div className="flex flex-col gap-5 items-center md:items-start">
            <h2 className="text-[20px] font-bold">{t("Documentation")}</h2>
            <div>
              {HelpType?.body?.map((item: any) => {
                const statusMap: Record<string, string> = {
                  TERMS_OF_USE: "Условия использования",
                  OFFER: "Публичное соглашение",
                  LICENSE_AGREEMENT: "Лицензионное соглашение",
                  PRIVACY_POLICY: "Политика конфиденциальности",
                };

                const displayText = statusMap[item.helpStatus] || "Unknown Status";

                return (
                  <Link
                    key={item.id}
                    to={`/conditions/#${item.id}`}
                    className="text-[15px] e block mb-2"
                  >
                    {displayText}
                  </Link>
                );
              })}
            </div>

          </div>
          {/* Main Links */}
          <div className="flex flex-col gap-5 items-center md:items-start">
            <h2 className="text-[20px] font-bold">{t("MainPageLinks")}</h2>
            <Link to="#app" className="text-[15px]">{t("toClients")}</Link>
            <Link to="/Home" className="text-[15px]">{t("ToMasters")}</Link>
            <Link to="/Home" className="text-[15px]">Бизнес-партнерство</Link>
            <Link to="/Home" className="text-[15px]">Мастерклассы / Обучение/ Тренинги</Link>
            <Link to="/Tariffs" className="text-[15px]">Пакеты для мастеров</Link>
            <Link to="/#" className="text-[15px]">FAQ</Link>
          </div>
          {/* Registration */}
          <div className="flex flex-col gap-5 items-center md:items-start">
            <h2 className="text-[20px] font-bold">Вход / Регистрация</h2>
            <p onClick={() => {
              setLoginHolat(true);
              setLoginRole("CLIENT");
            }} className="text-[15px]">Kлиент</p>
            <p onClick={() => {
              setLoginHolat(true);
              setLoginRole("MASTER");
            }} className="text-[15px]">Mастер</p>
            <Link to="/Home" className="text-[15px]">Бизнес-партнер</Link>
          </div>
          {/* Contacts */}
          <div className="flex flex-col gap-5 items-center md:items-start">
            <h2 className="text-[20px] font-bold">Kонтактные данные</h2>
            <a href="#" className="flex items-start gap-3">
              <img src={Pin} alt="Pin" />
              <p className="text-[15px]">Республика Узбекистан, город Ташкент</p>
            </a>
            <a href="#" className="flex items-start gap-3">
              <img src={Phone} alt="Phone" />
              <p className="text-[15px]">+998 77 308-88-88</p>
            </a>
            <a href="#" className="flex items-start gap-3">
              <img src={Messege} alt="Message" />
              <p className="text-[15px]">info@welltech.uz</p>
            </a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-10 py-10">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <Link to="/Home">
              <img src={logo} width={60} alt="Logo" />
              <p>bookers</p>
            </Link>
          </div>
          {/* Social and App Links */}
          <div className="flex flex-col sm:flex-row gap-10">
            <div className="flex flex-col items-center sm:items-start gap-5">
              <p className="text-[20px] font-bold">Мы в социальных сетях</p>
              <div className="flex gap-4">
                <a href="#"><img src={Facebook} alt="Facebook" /></a>
                <a href="#"><img src={Instagram} alt="Instagram" /></a>
                <a href="#"><img src={X} alt="X" /></a>
                <a href="#"><img src={YouTube} alt="YouTube" /></a>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-5">
              <p className="text-[20px] font-bold">Загрузите наше приложение на</p>
              <div className="flex gap-4">
                <a href="#"><img src={APP} alt="App Store" /></a>
                <a href="#"><img src={Play} alt="Google Play" /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center pt-5">
          <p className="text-[15px]">© 2024 Bookers. Все права защищены.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
