import { MenuProps } from "antd";
import { Link } from "react-router-dom";

export const Bookers: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Link to="/#offer" className="hover:text-[#9C0B35] text-[#21212E]">О продукте</Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link to="/AboutCompany" className="hover:text-[#9C0B35] text-[#21212E]">О компании</Link>
        ),
        children: [
            {
                key: '2-1',
                label: (
                    <Link to="/AboutCompany#about" className="hover:text-[#9C0B35] text-[#21212E]">Нормативные права</Link>
                ),
            },
            {
                key: '2-2',
                label: (
                    <Link to="/AboutCompany#company1" className="hover:text-[#9C0B35] text-[#21212E]">Наша миссия</Link>
                ),
            },
            {
                key: '2-3',
                label: (
                    <Link to="/AboutCompany#company2" className="hover:text-[#9C0B35] text-[#21212E]">Команда</Link>
                ),
            },
        ],
    },
    {
        key: '3',
        label: (
            <Link to="/StandardsSafety" className="hover:text-[#9C0B35] text-[#21212E]">Стандартизация / Безопасность</Link>
        ),

    },
    {
        key: '4',
        label: (
            <Link to="/Vacancies#vacancies" className="hover:text-[#9C0B35] text-[#21212E]">Вакансии</Link>
        ),

    }
];

