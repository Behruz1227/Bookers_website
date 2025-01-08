import { useGlobalRequest } from "@/helpers/Quary/quary";
import useLoginCheckStore from "@/Store/LoginStore";
export function useLogin( phoneNumber : string, role : string | null, code: string | null) {
    const data = {
        "phone": `${phoneNumber}`,
        "code": code,
    };
    const apiUrl = `http://207.154.246.120:8080/api/auth/login?ROLE=${role}`;
    const { globalDataFunc } = useGlobalRequest(apiUrl,"POST", data);
    const { setLoginCheck, setError, setLoading } = useLoginCheckStore();


    const LoginBtn = async () => {
        try {
            setLoading(true); // Yuklanish holatini o‘rnatish
            const response = await globalDataFunc(); // API chaqiruvi
            setLoginCheck(response); // Natijani Zustand store’ga saqlash
            setError(null); // Xatolikni tozalash
        } catch (err) {
            setError(err); // Xatolikni saqlash
            console.error("Phone check failed:", err);
        } finally {
            setLoading(false); // Yuklanish tugaganini belgilash
        }
    };
    return {
        LoginBtn,
    };
}
