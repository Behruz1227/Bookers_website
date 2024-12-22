import React from "react";
import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode; // Tugma ichidagi matn
  onClick?: () => void; // Bosish funksiyasi
  disabled?: boolean; // Faolsiz holat
  className?: string; // Qo‘shimcha uslublar
}

const Buttonn: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = "",
}) => {
  const styles = classNames(
    "transition duration-300 text-center", // Static styles (basic interactivity)
    { "opacity-50 cursor-not-allowed": disabled }, // Disabled state
    className // Custom styles passed as props
  );

  return (
    <button onClick={onClick} className={styles} disabled={disabled}>
      {children}
    </button>
  );
};

export default Buttonn;
