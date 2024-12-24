import Master from "@/components/cards/Master";
import React from "react";

const Home: React.FC = () => {
    const handleFirstButtonClick = () => {
        alert("First button clicked!");
    };

    const handleSecondButtonClick = () => {
        alert("Second button clicked!");
    };

    return (
        <div className="container">
            <Master
                image="https://picsum.photos/500"
                avatar="https://picsum.photos/500"
                name="John Doe"
                salon="Salon XYZ"
                role="Hair Stylist"
                rating={4}
                orders={25}
                clients={30}
                address="123 Salon St, City"
                price="1000 UZS"
                firstButtonTitle="Book Homeointment"
                secondButtonTitle="View Profile"
                onclickFirstButton={handleFirstButtonClick}
                onclickSecondButton={handleSecondButtonClick}
            />
        </div>
    );
};

export default Home;
