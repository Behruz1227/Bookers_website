

interface Master {
    image: string;
    avatar: string;
    name: string;
    salon: string;
    role: string;
    rating: number; 
    orders: number;
    clients: number;
    address: string;
    price: string; 
}
interface MasterCardProps {
    master: Master;
}

const Master = ({ master }: MasterCardProps) => {
    return (
        <div className="bg-[#B9B9C9] rounded-xl text-black p-4 shadow-md">
            {/* Image Section */}
            <div className="overflow-hidden rounded-xl">
                <img
                    src={master.image}
                    alt="Hair Styling"
                    className="w-full h-48 object-cover"
                />
            </div>
            <div className="flex items-center mt-4">
                <img
                    src={master.avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full"
                />
                <div className="ml-3">
                    <h3 className="font-bold text-lg">{master.name} /<span className="font-normal"> {master.salon}</span>  </h3>
                    <p className="">{master.role}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex justify-between  items-center">
                    <div className="flex text-[#9C0B35]">
                        {[...Array(master.rating)].map((_, index) => (
                            <span key={index}>&#9733;</span>
                        ))}
                    </div>
                    <p className="ml-2 text-sm ">
                        {master.orders} заказа, {master.clients} клиентов
                    </p>
                </div>
                <p className="flex justify-between items-center text-sm      mt-2">
                    <span className="material-icons text[#9C0B35]">location_on</span>
                    <span>{master.address}</span>
                </p>
                <div className="text-right mt-2 flex justify-between items-center text-lg  font-bold">
                    <span className="font-normal text-sm">
                        Ближайшая запись: Сегодня
                    </span>
                    <span className="text-[#9C0B35]">от {master.price}</span>
                </div>
            </div>
            <div className="flex gap-5 justify-between mt-4">
                <button className="bg-[#9C0B35] rounded-full text-sm px-10 py-3 text-white hover:bg-red-800">
                    Профиль
                </button>
                <button className="bg-[#9C0B35] rounded-full text-sm px-10 py-2 text-white hover:bg-red-800">
                    Записаться
                </button>
            </div>
        </div>
    );
};

export default Master;
