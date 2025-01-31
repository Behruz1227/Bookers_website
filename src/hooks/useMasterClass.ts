import { useGlobalRequest } from "@/helpers/Quary/quary";
import { masterClassRequest } from "@/helpers/Url";
import useMasterClassStore from "@/Store/MasterClassStore";
export function useMasterClass(data: any) {
   
    const apiUrl = masterClassRequest;
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
