import React, { useState } from "react";
import OTPModal from "./OTPModal";

const PhoneNumber: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);

  const handleVerify = (otpCode: string) => {
    console.log("Entered OTP:", otpCode);
    // Call your API or handle OTP verification logic here
  };

  return (
    <div>
      {/* Pass all required props to OTPModal */}
      <OTPModal
        visible={isModalVisible} // boolean
        onClose={() => setIsModalVisible(false)}
        // phoneNumber="+99 888 517 11 98" // s?tring
        onVerify={handleVerify}
      />
    </div>
  );
};

export default PhoneNumber;
