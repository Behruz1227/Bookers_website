const Subtitle = ({ text, size }: { text: string, size?: string }) => {
    return (
        <h1 className={`${size ? size : 'text-lg'} font-manrope text-[16px] md:text-[18px] font-medium text-[#B9B9C9] leading-[24px] md:leading-[30px] my-10 md:my-20 text-left`}>
            {text}
        </h1>
    )
}

export default Subtitle;