import React from "react";

interface GradientTextProps {
    text: string;
}

const GradientText: React.FC<GradientTextProps> = ({ text }) => {
    return (
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-pink-400 to-red-600 text-transparent bg-clip-text">
            {text}
        </h2>
    );
};

export default GradientText;
