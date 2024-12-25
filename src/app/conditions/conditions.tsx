import Footer from "@/components/footer/Footer"
import Header from "@/components/Header/Header"
import TermsOfUse from "@/components/MenuBar"


function Conditions() {
  return (
    <div>
       <Header/>
        <TermsOfUse/>
        <Footer/>
    </div>
  )
}

export default Conditions




// import Footer from "@/components/footer/Footer"
// import Header from "@/components/Header/Header"
// import TermsOfUse from "@/components/MenuBar"

// function Conditions() {
//   const menuData = {
//     items: [
//       {
//         key: "1",
//         label: "Условия использования",
//         content: `Публичный договор — по гражданскому законодательству договор, заключённый коммерческой организацией (либо другим лицом, осуществляющим предпринимательскую деятельность) и устанавливающий её обязанности по продаже товаров, выполнению работ или оказанию услуг, которые такая организация по характеру своей деятельности должна осуществлять в отношении каждого, кто к ней обратится (розничная торговля, перевозка транспортом общего пользования, обязательные виды страхования, услуги связи, энергоснабжение, медицинское, гостиничное обслуживание) и не требует нотариального заверения.
// Публичный договор регулирует взаимоотношения между коммерческой организацией и массовым потребителем. Одной из его особенностей является отсутствие принципа свободы договора в отношении коммерческой организации: не допускается отказ коммерческой организации от заключения публичного договора при наличии возможности предоставить потребителю необходимые ему товары или услуги. Не допускается оказывать предпочтение одним потребителям перед другими, цены на товары и услуги должны быть одинаковыми для всех (за исключением льгот). Одна и та же коммерческая организация может совершать сделки как в рамках публичных, так и обычных договоров.`,
//       },
//       {
//         key: "2", 
//         label: "Публичное соглашение",
//         content: `Публичное соглашение определяет порядок использования сервиса, права и обязанности пользователей, а также условия предоставления услуг. Соглашение является публичной офертой и вступает в силу с момента его акцепта пользователем.`,
//       },
//       {
//         key: "3",
//         label: "Лицензионное соглашение", 
//         content: `Лицензионное соглашение регулирует порядок использования программного обеспечения и определяет права пользователя по его использованию. Соглашение предоставляет неисключительное право использования ПО в соответствии с его функциональным назначением.`,
//       },
//       {
//         key: "4",
//         label: "Политика конфиденциальности",
//         content: `Политика конфиденциальности описывает порядок обработки и защиты информации о пользователях сервиса. Мы обеспечиваем конфиденциальность и безопасность персональных данных в соответствии с действующим законодательством.`,
//       }
//     ]
//   };

//   return (
//     <div>
//       <Header/>
//       <TermsOfUse menuData={menuData} />
//       <Footer/>
//     </div>
//   )
// }

// export default Conditions