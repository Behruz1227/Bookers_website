import { CiCircleRemove } from "react-icons/ci";
import { UniversalModalProps } from "../../types/Modal";



export const UniversalModal: React.FC<UniversalModalProps> = ({
  children,  // Modal ichidagi kontent
  isOpen,    // Modal ochiq yoki yopiqligini belgilaydi
  onClose,   // Modalni yopish funksiyasi
  style = "max-h-[95vh] w-[90%]", // Standart o'lcham va uslub
}) => {
  if (!isOpen) return null; // Modal ochilmagan bo'lsa null qaytar

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-slate-900 bg-opacity-50 transition duration-300">
      <div className={`bg-[#B9B9C9] rounded-2xl overflow-y-auto ${style}`}>
        {/* Yopish tugmasi */}
        <button
          type="button"
          className="float-right m-3 text-[#9C0B35] rounded-full text-3xl font-bold transition duration-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
          onClick={onClose}
          aria-label="Close modal"
        >
          <CiCircleRemove />
        </button>
        {/* Modal ichidagi kontent */}
        <div>{children}</div>
      </div>
    </div>
  );
};


// ishlatish qo'lanmasi !!

// const [isModalOpen, setModalOpen] = useState(false);
// const openModal = () => setModalOpen(true);
// const closeModal = () => setModalOpen(false);

// return (
//   <>
    // <button onClick={openModal} >modal on</button>
    // <UniversalModal isOpen={isModalOpen} onClose={closeModal} style="max-h-[90vh] w-[90%]">
    //   <div className="w-full text-center">
    //     <div>
    //       <h1>Modal Content</h1>
    //       <p>This is a modal.</p>
    //       <button type="button" className="mt-4 bg-[#9C0B35] text-white py-2 px-4 rounded" onClick={closeModal}>close</button>
    //     </div>
    //   </div>
    // </UniversalModal>
//   </>
// )






