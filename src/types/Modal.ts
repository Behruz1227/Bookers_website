export interface UniversalModalProps {
    children: React.ReactNode; // Modal ichidagi kontent
    isOpen: boolean; // Modal ochiq yoki yopiqligini belgilaydi
    style?: string; // Maxsus class nomlari uchun parametr
    onClose: () => void; // Modalni yopish funksiyasi
  }