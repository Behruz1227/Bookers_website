function OTPModal() {
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50">
        <div className="bg-gray-100 py-10 rounded-xl shadow-lg w-1/3 mx-20 px-24   ">
          <div className="flex justify-between items-center mb-6 ">
            <div className="flex w-full justify-between items-center">
              <p></p>
              <h2 className="text-3xl font-semibold text-center">
                Оформление подписки
              </h2>
              <button className="text-red-500 hover:text-red-700">
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
            </div>
          </div>
          <label
            htmlFor="phone-number"
            className="block text-gray-700 mb-3 text-lg"
          >
            Номер телефона*
          </label>
          <input
            id="phone-number"
            type="tel"
            placeholder="+998 00 777 00 00"
            className="w-full border border-gray-300 rounded-lg px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#9C0B35] focus:border-[#9C0B35]"
          />
          <div className="w-full flex justify-center">
            <button className="mt-8 bg-[#9C0B35] text-white py-3 px-24 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
              Продолжить
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OTPModal;
