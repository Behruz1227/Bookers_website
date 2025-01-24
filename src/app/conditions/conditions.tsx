import Footer from "@/components/footer/Footer";
import HeaderTitles from "@/components/HeadTitle";
import Loading from "@/components/Loading/Loading";
import useHelpTypeStore from "@/Store/HelpType";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Conditions() {
  const location = useLocation();
  const hash = location.hash.replace("#", "");

  const [section, setSection] = useState<number>(1); // Default to number
  const { HelpType } = useHelpTypeStore();
  // Convert `section` to a number for comparison
  const filteredData = HelpType?.body?.find((item: { id: number }) => item.id === section) || null;
  useEffect(() => {
    // Convert hash to a number or fallback to `1`
    setSection(hash ? parseInt(hash, 10) : 1);
  }, [location, hash]);
  const statusMap: Record<string, string> = {
    TERMS_OF_USE_WEB: "Условия использования",
    OFFER_WEB: "Публичное соглашение",
    LICENSE_AGREEMENT_WEB: "Лицензионное соглашение",
    PRIVACY_POLICY_WEB: "Политика конфиденциальности",
  };

  const displayText1 = statusMap[filteredData?.helpStatus] || "Unknown Status";
  return (
    <div>
      <div className="py-14">
        <div className="mb-4">
          <HeaderTitles text={displayText1} />
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="border-r-0 lg:border-r-2 lg:border-b-0 border-b-2 w-max h-max grid gap-y-3 pr-4">
            {HelpType?.body?.length ? (
              HelpType?.body?.map((item: { helpStatus: string, id: number }) => {
                const displayText = statusMap[item.helpStatus] || "Unknown Status";
                return (
                  <div
                    key={item.id}
                    className={`text-lg rounded-full w-max text-white ${item.id === section
                      ? "bg-[#9C0B35] py-1 px-4 rounded-full"
                      : "pr-8"
                      }`}
                  >
                    <Link to={`/conditions/#${item.id}`}>{displayText}</Link>
                  </div>
                );
              })
            ) : (
              <Loading />
            )}
          </div>
          <div className="w-full h-max text-[#B9B9C9]">
            {filteredData ? (
              <p>
                {filteredData.text ||
                  null}
              </p>
            ) : (
              <p className="">Please select a section to view details.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Conditions;
