import { useState } from "react";

type MenuItem = {
  key: string;
  label: string;
  content: string;
};

const menuData = {
  items: [
    {
      key: "1",
      label: "Условия использования",
      content: "Полное описание условий использования.",
    },
    {
      key: "2",
      label: "Публичное соглашение",
      content: "Детали публичного соглашения.",
    },
    {
      key: "3",
      label: "Лицензионное соглашение",
      content: "Текст лицензионного соглашения.",
    },
    {
      key: "4",
      label: "Политика конфиденциальности",
      content: "Политика конфиденциальности сайта.",
    },
  ] as MenuItem[],
};

export default function TermsOfUse() {
  const [selectedKey, setSelectedKey] = useState<string | null>(
    menuData.items[0]?.key || null
  );
  const [content, setContent] = useState<string>(menuData.items[0]?.content || "");

  const handleMenuClick = (key: string) => {
    const selectedItem = menuData.items.find((item) => item.key === key);
    if (selectedItem) {
      setSelectedKey(key);
      setContent(selectedItem.content);
    }
  };

  const currentLabel = menuData.items.find(
    (item) => item.key === selectedKey
  )?.label;

  return (
    <div className="min-h-screen bg-[#21212E]">
      <div className="px-28 py-10">
        <h1 className="font-bold text-[#FF6B9B] text-5xl mb-14 bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] bg-clip-text text-transparent">
          {currentLabel || "Загрузка..."} {/* H1 sarlavhasi dinamik o'zgardi */}
        </h1>

        <div className="flex">
          {/* Sidebar Menu */}
          <nav className="mr-6 pe-8 font-medium border-r-2 h-max">
            <ul>
              {menuData.items.map((item) => (
                <li key={item.key} className="mb-2">
                  <button
                    onClick={() => handleMenuClick(item.key)}
                    className={`w-full text-left py-2 px-4 rounded-full transition-colors duration-200 ${
                      selectedKey === item.key
                        ? "bg-[#9C0B35] text-white"
                        : "text-white hover:bg-[#9C0B35] hover:bg-opacity-80"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <main className="flex-1">
            <div className="px-10">
              <p className="text-[#A1A1AA] mb-4">{content}</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
