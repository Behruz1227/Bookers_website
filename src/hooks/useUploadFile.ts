import { useState } from "react";
import axios from "axios";
import useUploadFileStore from "@/Store/UploadFileStore";
import { AttachmentUpload } from "@/helpers/Url";
// import useUploadFileStore from "@/store/UploadFileStore";

export const useUploadFile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setFileResponse = useUploadFileStore((state) => state.setFileResponse);

  const uploadFile = async (file: File | '') => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        AttachmentUpload,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "*/*",
          },
        }
      );
      setFileResponse(res.data); // Response storjga saqlanadi
      return res.data;
    } catch (err: any) {
      setError(err.message || "Fayl yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, loading, error };
};
