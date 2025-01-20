import { useGlobalRequest } from "@/helpers/Quary/quary";
import useCategoryStore from "@/Store/Category";


export function useCategory() {
    const apiUrl = `http://207.154.246.120:8080/api/category`;
    const { globalDataFunc } = useGlobalRequest(apiUrl, "GET");
    const { setCategory, setError, setLoading } = useCategoryStore();

    const fetchCategory = async () => {
        try {
            setLoading(true); // Set loading state
            const response = await globalDataFunc(); // API call
            setCategory(response); // Save the result to Zustand store
            setError(null); // Clear any existing errors
        } catch (err) {
            setError(err); // Save the error to the store
            console.error("Category fetch failed:", err);
        } finally {
            setLoading(false); // Mark the loading as finished
        }
    };

    return {
        fetchCategory
    };
}
