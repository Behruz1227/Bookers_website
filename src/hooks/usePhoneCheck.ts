import { useGlobalRequest } from "@/helpers/Quary/quary";
import { phoneCheck } from "@/helpers/Url";
import usePhoneCheckStore from "@/Store/PhoneCheckStore";

export function usePhoneCheck(phoneNumber: string, role: string | null) {
    const data = {
        phoneNumber: `${phoneNumber}`,
    };
    const apiUrl = `${phoneCheck}?ROLE=${role}`;
    const { globalDataFunc } = useGlobalRequest(apiUrl, "POST", data);
    // Zustand store’dan funksiyalar va state’larni chaqiramiz
    const { setPhoneCheck, setError, setLoading } = usePhoneCheckStore();

    const checkPhoneNumberBtn = async () => {
        try {
            setLoading(true); // Yuklanish holatini o‘rnatish
            const response = await globalDataFunc(); // API chaqiruvi
            setPhoneCheck(response); // Natijani Zustand store’ga saqlash
            setError(null); // Xatolikni tozalash
        } catch (err) {
            setError(err); // Xatolikni saqlash 
        } finally {
            setLoading(false); // Yuklanish tugaganini belgilash
        }
    };
    return {
        checkPhoneNumberBtn, // Telefonni tekshirish funksiyasi
    };
}
