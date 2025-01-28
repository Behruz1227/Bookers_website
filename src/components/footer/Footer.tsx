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
      <div className="">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Documentation */}
          <div className="flex flex-col gap-5  items-center md:items-start">
            <h2 className="text-[20px] font-bold">{t("FooterDocumentation")}</h2>
            <div className="flex flex-col gap-2 text-base">
              {HelpType?.body?.map((item: { helpStatus: string, id: number }) => {
                const statusMap: Record<string, string> = {
                  TERMS_OF_USE_WEB: t('FooterTermsofUse'),
                  OFFER_WEB: t('FooterPublicagreement'),
                  LICENSE_AGREEMENT_WEB: t('FooterLicenseAgreement'),
                  PRIVACY_POLICY_WEB: t('FooterPrivacyPolicy'),
                };

                const displayText = statusMap[item.helpStatus] || "";

                return (
                  <Link
                    key={item.id}
                    to={`/conditions/#${item.id}`}
                  >
                    {displayText}
                  </Link>
                );
              })}
            </div>

          </div>
          {/* Main Links */}
          <div className="flex flex-col gap-5  items-center md:items-start">
            <h2 className="text-[20px] font-bold">{t("MainPageLinks")}</h2>
            <div className="flex flex-col gap-2 text-base">
              <Link to="/#offer">{t("FooterToclients")}</Link>
              <Link to="/#offer">{t("Footertothemasters")}</Link>
              <Link to="/#offer">{t('FooterBusinesspartnership')}</Link>
              <Link to="/#masterClass">{t('FooterMasterclassesEducationTrainings')}</Link>
              <Link to="/Tariffs">{t('FooterPackagesforMasters')}</Link>
              <Link to="">{t('FooterFAQ')}</Link>
            </div>
          </div>
          {/* Registration */}
          <div className="flex flex-col gap-5 items-center md:items-start">
            <h2 className="text-[20px] font-bold">{t("LoginRegister")}</h2>
            <div className="flex flex-col gap-2 text-base">
              <p onClick={() => {
                setLoginHolat(true);
                setLoginRole("CLIENT");
              }} >{t("FooterToclients")}</p>
              <p onClick={() => {
                setLoginHolat(true);
                setLoginRole("MASTER");
              }}>{t("Footertothemasters")}</p>
              <Link to="/">{t('FooterBusinesspartner')}</Link>
            </div>
          </div>
          {/* Contacts */}
          <div className="flex flex-col gap-5 items-center md:items-start">
            <h2 className="text-[20px] font-bold">{t("ContactDetails")}</h2>
            <div className="flex flex-col gap-2 text-base">
              <p  className="flex items-start gap-3">
                <img src={Pin} alt="Pin" />
                <p>Республика Узбекистан, город Ташкент</p>
              </p>
              <p  className="flex items-start gap-3">
                <img src={Phone} alt="Phone" />
                <p>+998 77 308-88-88</p>
              </p>
              <p  className="flex items-start gap-3">
                <img src={Messege} alt="Message" />
                <p>info@welltech.uz</p>
              </p>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-10 py-10">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <Link to="/">
              <img src={logo} width={60} alt="Logo" />
              <p>bookers</p>
            </Link>
          </div>
          {/* Social and App Links */}
          <div className="flex flex-col sm:flex-row gap-10">
            <div className="flex flex-col items-center sm:items-start gap-5">
              <p className="text-[20px] font-bold">{t('Weareonsocialnetworks')}</p>
              <div className="flex gap-4">
                <a href="#"><img src={Facebook} alt="Facebook" /></a>
                <a href="#"><img src={Instagram} alt="Instagram" /></a>
                <a href="#"><img src={X} alt="X" /></a>
                <a href="#"><img src={YouTube} alt="YouTube" /></a>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-5">
              <p className="text-[20px] font-bold">{t('Downloadourappat')}</p>
              <div className="flex gap-4">
                <a href="#"><img src={APP} alt="App Store" /></a>
                <a href="#"><img src={Play} alt="Google Play" /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center pb-10">
          <p className="text-[15px]">{t("Bookersreserved")}</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
