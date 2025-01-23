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
  const filteredData = HelpType?.body?.find((item : {id : number}) => item.id === section) || null;

  useEffect(() => {
    // Convert hash to a number or fallback to `1`
    setSection(hash ? parseInt(hash, 10) : 1);
  }, [location, hash]);

  return (
    <div>
      <div className="mb-4">
        <HeaderTitles text={filteredData ? filteredData.helpStatus : "No Data Available"} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Sidebar Navigation */}
        <div className="border-r-2 pr-10 w-max h-max sticky top-4 grid grid-cols-1 gap-2">
          {HelpType?.body?.length ? (
            HelpType.body.map((item: {id : number, helpStatus: string}) => (
              <div
                key={item.id}
                className={` text-smrounded-full w-max text-white ${
                  item.id === section ? "bg-[#9C0B35] py-1 px-4" : " pr-8"
                }`}
              >
                <Link to={`/conditions/#${item.id}`}>{item.helpStatus}</Link>
              </div>
            ))
          ) : (
            <Loading />
          )}
        </div>

        {/* Content Section */}
        <div className="w-full bg-purple-100">
          {filteredData ? (
            <p>{filteredData.text || "Публичный договор — по гражданскому законодательству договор, заключённый коммерческой организацией (либо другим лицом, осуществляющим предпринимательскую деятельность) и устанавливающий её обязанности по продаже товаров, выполнению работ или оказанию услуг, которые такая организация по характеру своей деятельности должна осуществлять в отношении каждого, кто к ней обратится (розничная торговля, перевозка транспортом общего пользования, обязательные виды страхования, услуги связи, энергоснабжение, медицинское, гостиничное обслуживание) и не требует нотариального заверения. Публичный договор регулирует взаимоотношения между коммерческой организацией и массовым потребителем. Одной из его особенностей является отсутствие принципа свободы договора в отношении коммерческой организации: не допускается отказ коммерческой организации от заключения публичного договора при наличии возможности предоставить потребителю необходимые ему товары или услуги. Не допускается оказывать предпочтение одним потребителям перед другими, цены на товары и услуги должны быть одинаковыми для всех (за исключением льгот). Одна и та же коммерческая организация может совершать сделки как в рамках публичных, так и обычных договоров"}</p>
          ) : (
            <p className="text-gray-500">Please select a section to view details.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Conditions;
