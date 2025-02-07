const Subtitle = ({ text, size }: { text: string, size?: string }) => {
    return (
        <h2 className={`${size ? size : 'text-sm sm:text-base md:text-lg lg:text-xl'} font-manrope font-medium text-[#B9B9C9] leading-[22px] sm:leading-[24px] md:leading-[28px] lg:leading-[30px] my-6 sm:my-10 md:my-16 lg:my-20 text-left`}>
            {text}
        </h2>
    )
}

export default Subtitle;
