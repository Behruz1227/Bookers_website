import { useState, useEffect } from "react";

type MenuItem = {
  key: string;
  label: string;
  content: string;
};

export default function TermsOfUse() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [content, setContent] = useState<string>(""); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setError(null);

        const response = await new Promise<{ menu: MenuItem[] }>((resolve) =>
          setTimeout(
            () =>
              resolve({
                menu: [
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
                ],
              }),
            1000
          )
        );

        setMenuItems(response.menu);
        setSelectedKey(response.menu[0]?.key || null); // Default to the first item
        setContent(response.menu[0]?.content || "");
      } catch (err) {
        setError("Failed to load data");
      }
    };

    fetchMenuData();
  }, []);

  const handleMenuClick = (key: string) => {
    const selectedItem = menuItems.find((item) => item.key === key);
    if (selectedItem) {
      setSelectedKey(key);
      setContent(selectedItem.content);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center py-20">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#21212E]">
      <div className="px-28 py-10">
        <h1 className="font-bold text-[#FF6B9B] text-5xl mb-14 bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35] bg-clip-text text-transparent">
          Условия использования
        </h1>

        <div className="flex">
          {/* Sidebar Menu */}
          <nav className="mr-6 pe-8 font-medium border-r-2 h-max">
            <ul>
              {menuItems.map((item) => (
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
