import { useGlobalRequest } from "@/helpers/Quary/quary";
import useVacanciesStore from "@/Store/VacanciesStore";
export function useVacancies(data: any) {
   
    const apiUrl = `http://207.154.246.120:8080/vacancies/save`;
    const { globalDataFunc } = useGlobalRequest(apiUrl, "POST", data);
    const { setResponse} = useVacanciesStore();
    const VacanciesSave = async () => {
        try {
            const response = await globalDataFunc(); 
            setResponse(response); 
        } catch (err) {

            console.error("vacancy check failed:", err);
        }
    };
    return {
        VacanciesSave,
    };
}
