import { useState } from "react";
import axios from "axios";
import { register } from "@/helpers/Url";

export function useRegisterMaster(
    firstName: string,
    lastName: string,
    nickname: string,
    phoneNumber: string,
    lang: string,
    role: string | null,
    imageFile: File | null
) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<any>(null);

    // API URL with query parameters
    const apiUrl = `${register}?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&phoneNumber=${encodeURIComponent(phoneNumber)}&ROLE=ROLE_${role}&lang=${encodeURIComponent(lang)}${role === 'MASTER' ? `&nickname=${encodeURIComponent(nickname)}` : ''}`;



    // FormData to send image
    const formData = new FormData();
    if (imageFile) {
        formData.append("image", imageFile);
    }

    // Register function that handles the POST request with axios
    const registerMaster = async () => {
        try {
            setLoading(true);
            setError(null); // Reset error before new request

            const response = await axios.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Make sure to send the file properly
                },
            });

            setResponse(response.data);
            console.log(response);
            // Save response data
        } catch (err: any) {
            console.log(err);

            setError(err.response ? err.response.data : "An error occurred"); // Set error message
        } finally {
            setLoading(false);
        }
    };

    // This will re-run if the form values change

    return {
        loading,
        error,
        response,
        registerMaster,
    };
}
