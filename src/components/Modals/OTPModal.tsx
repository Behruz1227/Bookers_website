function OTPModal() {
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
        <div className="bg-gray-100 py-8 rounded-xl shadow-lg w-full max-w-lg mx-4 sm:mx-10 md:mx-20 px-6 sm:px-8 md:px-12 relative">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 focus:outline-none"
            aria-label="Close Modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex justify-center items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center">
              Оформление подписки
            </h2>
          </div>
          <label
            htmlFor="phone-number"
            className="block text-gray-700 mb-3 text-base sm:text-lg"
          >
            Номер телефона*
          </label>
          <input
            id="phone-number"
            type="tel"
            placeholder="+998 00 777 00 00"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 sm:py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#9C0B35] focus:border-[#9C0B35]"
          />
          <div className="w-full flex justify-center">
            <button className="mt-6 sm:mt-8 bg-[#9C0B35] text-white w-full max-w-xs py-2 rounded-full text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
              Продолжить
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OTPModal;
