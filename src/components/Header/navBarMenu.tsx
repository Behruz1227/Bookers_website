import { MenuProps } from "antd";
import { Link } from "react-router-dom";

export const Bookers: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <div>
                <Link to="/#offer" className="hover:text-[#9C0B35] text-[#21212E]">О продукте</Link>
            </div>
        ),
    },
    {
        key: '2',
        label: (
            <div>
                <Link to="/AboutCompany" className="hover:text-[#9C0B35] text-[#21212E]">О компании</Link>
            </div>
        ),
        children: [
            {
                key: '2-1',
                label: (
                    <div>
                        <Link to="/AboutCompany#about" className="hover:text-[#9C0B35] text-[#21212E]">Нормативные права</Link>
                    </div>
                ),
            },
            {
                key: '2-2',
                label: (
                    <div>
                        <Link to="/AboutCompany#company1" className="hover:text-[#9C0B35] text-[#21212E]">Наша миссия</Link>
                    </div>
                ),
            },
            {
                key: '2-3',
                label: (
                    <div>
                        <Link to="/AboutCompany#company2" className="hover:text-[#9C0B35] text-[#21212E]">Команда</Link>
                    </div>
                ),
            },
        ],
    },
    {
        key: '3',
        label: (
            <div>
                <Link to="/StandardsSafety" className="hover:text-[#9C0B35] text-[#21212E]">Стандартизация / Безопасность</Link>
            </div>
        ),

    },
    {
        key: '4',
        label: (
            <div>
                <Link to="/Vacancies#vacancies" className="hover:text-[#9C0B35] text-[#21212E]">Вакансии</Link>
            </div>
        ),

    }
];

export const Бронирование: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <div>
                <Link to="/Services" className="hover:text-[#9C0B35] text-[#21212E]">Парикмахерские услуги</Link>
            </div>
        ),
    },
    {
        key: '2',
        label: (
            <div>
                <Link to="/" className="hover:text-[#9C0B35] text-[#21212E]">Ногтевой сервис</Link>
            </div>
        ),
    },
    {
        key: '3',
        label: (
            <div>
                <Link to="/" className="hover:text-[#9C0B35] text-[#21212E]">Ресницы и брови</Link>
            </div>
        ),

    },
    {
        key: '4',
        label: (
            <div>
                <Link to="/" className="hover:text-[#9C0B35] text-[#21212E]">Макияж</Link>
            </div>
        ),
    },
    {
        key: '5',
        label: (
            <div>
                <Link to="/" className="hover:text-[#9C0B35] text-[#21212E]">Эпиляция</Link>
            </div>
        ),
    },
    {
        key: '6',
        label: (
            <div>
                <Link to="/" className="hover:text-[#9C0B35] text-[#21212E]">Косметологические услуги</Link>
            </div>
        ),
    },
    {
        key: '7',
        label: (
            <div>
                <Link to="/" className="hover:text-[#9C0B35] text-[#21212E]">Боди-арт</Link>
            </div>
        ),
    }
];