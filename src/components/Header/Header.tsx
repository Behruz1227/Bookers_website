import React, { useEffect, useState } from "react";
import logo from '../../assets/img/Layer_1.png';
import logoText from '../../assets/img/Мои записи.svg';
import { Language } from "./Language";
import { Dropdown, Space } from "antd";
import { IoChevronDownOutline } from "react-icons/io5";
import { Bookers, Бронирование } from "./navBarMenu";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import { FiPhoneCall } from "react-icons/fi";
import LoginIndex from "@/Store";
import { t } from "i18next";
import { useGlobalRequest } from "@/helpers/Quary/quary";
import { getMe } from "@/helpers/Url";

import HeaderTitles from "../HeadTitle";
import useCategoryStore from "@/Store/Category";
import { useCategory } from "@/hooks/useCategory";



const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); // Mobil menyuni boshqarish uchun state
    const { response, globalDataFunc, } = useGlobalRequest(getMe, 'GET');
    useEffect(() => {
        globalDataFunc();
    }, [])
    console.log('get me', response?.body);
    const res = response?.body;
    const { setLoginHolat } = LoginIndex();
    const token = localStorage.getItem('Token');
    localStorage.setItem("phoneNumber", res?.phoneNumber || "")




    const { fetchCategory } = useCategory(); // Custom hook to fetch categories
    useEffect(() => {
        fetchCategory();
    }, [])

    const { category } = useCategoryStore(); // Assuming `category` is typed correctly in the store

    // Fallback item to be used when category.body is empty or undefined
    const fallbackCategory = {
        id: "",
        name: "topilmadi",
        categoryFatherId: null,
        categoryFatherName: null,
        attachmentId: "",
        statusCategory: "APPROVED",
        message: null,
        isNew: false,
    };

    // If category.body is empty or undefined, use fallbackCategory
    const categoriesToDisplay = category?.body && Array.isArray(category.body) && category.body.length > 0
        ? category.body
        : [fallbackCategory];

    // Dynamically generate menu items
    const menuItems: MenuProps['items'] = categoriesToDisplay.map((item) => ({
        key: item.id, // Use `id` as the unique key
        label: (
            <Link
                to={item.id ? `/Services/${item.id}` : "/Services"}
                className="hover:text-[#9C0B35] text-[#21212E]"
            >
                {item.name} {/* Displaying ID and name */}
            </Link>
        ),
    }));

    return (
        <div className="sticky top-0 left-0 right-0 z-[222] bg-[#111827]">
            <header className=" text-white relative ">
                <div className="mx-auto flex justify-between items-center py-3">
                    {/* Logo bo'limi */}
                    <div className="w-[40px] h-[75px] grid grid-cols-1 justify-center items-center">
                        <Link to='/'>
                            <img className="w-full h-full pb-2" src={logo} alt="logo" />
                            <img src={logoText} alt="logo text" />
                        </Link>
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
                            menu={{ items: menuItems }} // Assign generated items to the menu
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
                        <Link to="/Partnership">Партнерство</Link>
                    </div>
                    <div className="hidden lg:flex">
                        {/* Til tanlash bo'limi */}
                        <Language />
                    </div>

                    {/* Login/Register tugmasi */}
                    {!token ?
                        <div className="absolute lg:relative lg:right-0 right-16">
                            <Button onClick={() => setLoginHolat(true)}
                                className="py-3 ld:px-12  px-8 rounded-[40px] bg-[#9C0B35] text-white leading-[30px]"
                            >
                                <span className="hover:opacity-90">{t("auth")}</span>
                            </Button>
                        </div> :
                        <div className="flex flex-col items-end justify-end">
                            {/* <h1 className="text-[#9c0a1b] ">
                                {`${res?.firstName || ''} ${res?.lastName || 'ds'}`}
                            </h1> */}
                            <HeaderTitles size="text-2xl" text={res?.firstName || ''} />
                            <p className="text-sm">
                                {res?.phoneNumber || ''}
                            </p>
                        </div>
                    }
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
                            menu={{ items: menuItems }} // Assign generated items to the menu
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

                        <div className="hover:text-[#9C0B35]">
                            <Link to="/Partnership">Партнерство</Link>

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
