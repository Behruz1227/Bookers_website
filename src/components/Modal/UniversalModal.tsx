import { CiCircleRemove } from "react-icons/ci";
import { UniversalModalProps } from "../../types/Modal";

export const UniversalModal: React.FC<UniversalModalProps> = ({
  children,  // Modal ichidagi kontent
  isOpen,    // Modal ochiq yoki yopiqligini belgilaydi
  onClose,   // Modalni yopish funksiyasi
  style = "", // Standart o'lcham va uslub
}) => {
  if (!isOpen) return null; // Modal ochilmagan bo'lsa, hech narsa qaytarmaydi

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-slate-900 bg-opacity-50 transition duration-300">
      <div className={`bg-[#B9B9C9] rounded-2xl overflow-y-auto w-[90%] md:w-[70vw] lg:w-[50vw] max-h-[80vh] p-4 ${style}`}>
        {/* Yopish tugmasi */}
        <button
          type="button"
          className=" float-right top-2 right-2 text-[#9C0B35] rounded-full text-3xl font-bold transition duration-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
          onClick={onClose}
          aria-label="Close modal"
        >
          <CiCircleRemove />
        </button>
        {/* Modal ichidagi kontent */}
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
};
