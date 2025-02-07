const HeaderTitles = ({ text, size }: { text: string, size?: string }) => {
    return (
        <h1 className={`${size ? size : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl'} font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FB7CA1] to-[#9C0B35]`}>
            {text}
        </h1>
    )
}

export default HeaderTitles
