import React, { useState } from "react";
import logo from '../../assets/img/Layer_1.png';
import logoText from '../../assets/img/Мои записи.svg';
import { Language } from "./Language";
import { Dropdown, Space } from "antd";
import { IoChevronDownOutline } from "react-icons/io5";
import { Bookers, Бронирование } from "./navBarMenu";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import { Input } from "../ui/input";
import { FiPhoneCall } from "react-icons/fi";


const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); // Mobil menyuni boshqarish uchun state

    return (
        <div className="sticky top-0 left-0 right-0 z-[222] bg-[#111827]">
            <header className=" text-white relative container mx-auto ">
                <div className="mx-auto flex justify-between items-center py-6">
                    {/* Logo bo'limi */}
                    <div className="w-[40px] h-[75px] grid grid-cols-1 justify-center items-center">
                        <img className="w-full h-full pb-2" src={logo} alt="logo" />
                        <img src={logoText} alt="logo text" />
                    </div>

                    {/* Asosiy navigatsiya */}
                    <div className="hidden lg:flex">
                        {/* Bookers menyusi */}
                        <Dropdown
                            menu={{ items: Bookers }}
                            trigger={["hover"]}
                            getPopupContainer={(trigger: HTMLElement) => trigger.parentElement!}
                            overlayStyle={{ minWidth: "300px" }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space className="hover:text-[#9C0B35]">
                                    Bookers
                                    <IoChevronDownOutline className="w-6 h-6 pt-1 transition duration-300" />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>

                    <div className="hidden lg:flex">
                        {/* Бронирование menyusi */}
                        <Dropdown
                            menu={{ items: Бронирование }}
                            overlayClassName="bookers-dropdown"
                            trigger={["hover"]}
                            overlayStyle={{ minWidth: "300px" }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space className="hover:text-[#9C0B35]">
                                    Бронирование
                                    <IoChevronDownOutline className="w-6 h-6 pt-1 transition duration-300" />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>

                    {/* Qo'shimcha navigatsiya */}
                    <div className="hidden lg:flex hover:text-[#9C0B35]">
                        <Link to="/">Партнерство</Link>
                    </div>
                    <div className="hidden lg:flex">
                        {/* Til tanlash bo'limi */}
                        <Language />
                    </div>

                    {/* Login/Register tugmasi */}
                    <div className="absolute lg:relative lg:right-0 right-16">
                        <Button
                            className="py-3 ld:px-12  px-8 rounded-[40px] bg-[#9C0B35] text-white leading-[30px]"
                        >
                            <Link className="hover:opacity-90" to="/">Войти </Link>/
                            <Link className="hover:opacity-90" to="/"> Регистрация</Link>
                        </Button>
                    </div>

                    {/* Mobil menyu tugmasi */}
                    <button
                        className="lg:hidden focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Navigation Menu"
                    >
                        <span
                            className={`block w-6 h-0.5 bg-white mb-1 transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
                        ></span>
                        <span
                            className={`block w-6 h-0.5 bg-white mb-1 transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}
                        ></span>
                        <span
                            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
                        ></span>
                    </button>
                </div>
                <div className=" w-full h-">
                    <div>
                    </div>
                    <div className="flex items-center gap-28 lg:justify-end justify-center  py-6">
                        <Input type="search" placeholder="Поиск мастеров/салонов/услуг" className="w-[350px] px-6 pl-4">
                        </Input>
                        <div className="hidden lg:flex items-center gap-2 border font-semibold border-white pl-2 pr-4 py-2 rounded-full">
                            <FiPhoneCall className="bg-[#9C0B35] p-2 rounded-full " size={30} />
                            <span>+998 77 308-88-88</span>
                        </div>
                    </div>

                </div>

                {/* Mobil menyu */}
                <div
                    className={`lg:hidden  transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
                >
                    <div className="flex flex-col items-center py-4 gap-6">
                        <div>
                            {/* Bookers menyusi mobil versiya */}
                            <Dropdown
                                menu={{ items: Bookers }}
                                trigger={["click"]}
                                getPopupContainer={(trigger: HTMLElement) => trigger.parentElement!}
                                overlayStyle={{ minWidth: "300px" }}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space className="hover:text-[#9C0B35]">
                                        Bookers
                                        <IoChevronDownOutline className="w-6 h-6 pt-1 transition duration-300" />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>

                        <div>
                            {/* Бронирование menyusi mobil versiya */}
                            <Dropdown
                                menu={{ items: Бронирование }}
                                overlayClassName="bookers-dropdown"
                                trigger={["click"]}
                                overlayStyle={{ minWidth: "300px" }}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space className="hover:text-[#9C0B35]">
                                        Бронирование
                                        <IoChevronDownOutline className="w-6 h-6 pt-1 transition duration-300" />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>

                        <div className="hover:text-[#9C0B35]">
                            <Link to="/salom">Партнерство</Link>

                        </div>
                        <div className="flex items-center justify-center gap-2 border font-semibold border-white pl-2 pr-4 w-[250px] py-2 rounded-full">
                            <FiPhoneCall className="bg-[#9C0B35] p-2 rounded-full " size={30} />
                            <span>+998 77 308-88-88</span>
                        </div>
                        <div>
                            {/* Til tanlash bo'limi */}
                            <Language />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
