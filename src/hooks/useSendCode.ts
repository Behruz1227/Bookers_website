import { useGlobalRequest } from "@/helpers/Quary/quary";
import useSendCodeStore from "@/Store/SendCodeStore";
export function useSendCode(phoneNumber: string, role: string | null, purpose: boolean | null) {
    const data = {
        "phoneNumber": `${phoneNumber}`
    };
    const apiUrl = `http://207.154.246.120:8080/api/auth/sendCode?purpose=${purpose}&ROLE=${role}`;
    const { globalDataFunc } = useGlobalRequest(apiUrl, "POST", data);
    const { setSendCode, setError, setLoading } = useSendCodeStore();
    const SendCodeBtn = async () => {
        try {
            setLoading(true); // Yuklanish holatini o‘rnatish
            const response = await globalDataFunc(); // API chaqiruvi
            setSendCode(response); // Natijani Zustand store’ga saqlash
            setError(null); // Xatolikni tozalash
        } catch (err) {
            setError(err); // Xatolikni saqlash
            console.error("Phone check failed:", err);
        } finally {
            setLoading(false); // Yuklanish tugaganini belgilash
        }
    };
    return {
        SendCodeBtn
    };
}
