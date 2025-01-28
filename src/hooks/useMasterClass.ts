import { useGlobalRequest } from "@/helpers/Quary/quary";
import useMasterClassStore from "@/Store/MasterClassStore";
export function useMasterClass(data: any) {
   
    const apiUrl = `http://207.154.246.120:8080/api/masterClass/request`;
    const { globalDataFunc } = useGlobalRequest(apiUrl, "POST", data);
    const { setMasterClass} = useMasterClassStore();
    const MasterClassSave = async () => {
        try {
            const response = await globalDataFunc(); 
            setMasterClass(response); 
        } catch (err) {

            console.error("vacancy check failed:", err);
        }
    };
    return {
        MasterClassSave,
    };
}
