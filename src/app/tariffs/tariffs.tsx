import StandartPlan from "@/components/Accardion"
import Footer from "@/components/footer/Footer"
import Header from "@/components/Header/Header"


function Tariffs() {
  return (
    <div className="bg-[#111827] ">
      
        <h2 className=" text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] font-manrope font-extrabold text-[28px] md:text-[44px] leading-[36px] md:leading-[54px] tracking-[-0.04em] text-left">Выберите тариф и расширяйте свои <br />возможности в приложении bookers</h2>
        <div className="py-20">
        <StandartPlan />
        </div>
        <Footer/>
    </div>
  )
}

export default Tariffs