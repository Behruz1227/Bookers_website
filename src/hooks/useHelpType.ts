import { useGlobalRequest } from "@/helpers/Quary/quary";

import useHelpTypeStore from "@/Store/HelpType";


export function useHelpType() {
    const apiUrl = `http://207.154.246.120:8080/api/help/web/site`;
    const { globalDataFunc } = useGlobalRequest(apiUrl, "GET");
    const { setHelpType, setError, setLoading } = useHelpTypeStore();

    const fetchHelpType = async () => {
        try {
            setLoading(true); // Set loading state
            const response = await globalDataFunc(); // API call
            setHelpType(response); // Save the result to Zustand store
            setError(null); // Clear any existing errors
        } catch (err) {
            setError(err); // Save the error to the store
            console.error("error", err);
        } finally {
            setLoading(false); // Mark the loading as finished
        }
    };

    return {
        fetchHelpType
    };
}
