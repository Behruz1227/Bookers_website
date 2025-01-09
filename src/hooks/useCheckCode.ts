import { useGlobalRequest } from "@/helpers/Quary/quary";
import useCheckCodeStore from "@/Store/CheckCodeStore";
export function useCheckCode(phoneNumber: string, code: string|null ) {
    const data = {
        "phoneNumber": `${phoneNumber}`
    };
    const apiUrl = `http://207.154.246.120:8080/api/auth/checkCode?code=${code}`;
    const { globalDataFunc } = useGlobalRequest(apiUrl, "POST", data);
    const { setCheckCode, setError, setLoading } = useCheckCodeStore();
    const CheckCodeBtn = async () => {
        try {
            setLoading(true); // Yuklanish holatini o‘rnatish
            const response = await globalDataFunc(); // API chaqiruvi
            setCheckCode(response); // Natijani Zustand store’ga saqlash
            setError(null); // Xatolikni tozalash
        } catch (err) {
            setError(err); // Xatolikni saqlash
            console.error("Phone check failed:", err);
        } finally {
            setLoading(false); // Yuklanish tugaganini belgilash
        }
    };
    return {
        CheckCodeBtn
    };
}
