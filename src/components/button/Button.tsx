
import React from "react";
import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode; // Tugma ichidagi matn
  onClick?: () => void; // Bosish funksiyasi
  disabled?: boolean; // Faolsiz holat
  className?: string; // Qo‘shimcha uslublar
}

const Button: React.FC<ButtonProps> = ({
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

export default Button;


///////ishlatish

{/* <Buttonn
className="w-[340px] h-[66px] rounded-[40px] bg-[#9C0B35] text-white font-bold text-[18px] leading-[30px] hover:opacity-90"
onClick={() => alert("Скачать приложение")}
>
button
</Buttonn> */}

{/* <Buttonn
className="w-[340px] h-[66px] rounded-[40px] border-2 border-[#9C0B35] text-[#9C0B35] font-bold text-[18px] leading-[30px] hover:bg-[#9C0B35] hover:text-white"
onClick={() => alert("Войти / Регистрация")}
>
Войти / Регистрация
</Buttonn> */}


