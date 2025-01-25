import { useEffect, useState } from "react";
import { UniversalModal } from "../Modal/UniversalModal";
import LoginIndex from "@/Store";
import { useUploadFile } from "@/hooks/useUploadFile";
import useUploadFileStore from "@/Store/UploadFileStore";

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    file1: File | string | null;
    file2: File | string | null;
    type: boolean;
}

interface Errors {
    fullName: boolean;
    email: boolean;
    phone: boolean;
    file1: boolean;
    file2: boolean;
    type: boolean;
}

export const VacanciesModal = () => {
    const { vacanciesHolat, setVacanciesHolat } = LoginIndex();
    const [resumeIds, setResumeIds] = useState<string>("null");
    const [documentIds, setDocumentIds] = useState<string>("null");
    const [status, setStatus] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phone: "",
        file1: null,
        file2: null,
        type: false,
    });

    const { uploadFile } = useUploadFile();
    const { fileResponse, setFileResponse } = useUploadFileStore();

    const [errors, setErrors] = useState<Errors>({
        fullName: false,
        email: false,
        phone: false,
        file1: false,
        file2: false,
        type: false,
    });

    const [errorMessage, setErrorMessage] = useState<string>("");

    // Fayl yuklash va javob boshqaruvi
    useEffect(() => {
        if (fileResponse) {
            if (resumeIds === "null") {
                setResumeIds(fileResponse.body);
            } else {
                setDocumentIds(fileResponse.body);
            }
            setFileResponse(null); // Fayl javobini tozalash
        }

        // Forma to'liq tugagach, uni tozalash
        if (resumeIds !== "null" && documentIds !== "null") {
            console.log("Resume:", resumeIds, "Document:", documentIds);
            resetForm();
        }
    }, [fileResponse, resumeIds, documentIds, setFileResponse]);

    // Formani tozalash
    const resetForm = () => {
        setResumeIds("null");
        setDocumentIds("null");
        setStatus(false);
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            file1: null,
            file2: null,
            type: false,
        });
        setErrors({
            fullName: false,
            email: false,
            phone: false,
            file1: false,
            file2: false,
            type: false,
        });
        setErrorMessage("");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: false }));
        setErrorMessage("");
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: "file1" | "file2"
    ) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFormData((prev) => ({ ...prev, [field]: files[0] }));
            setErrors((prev) => ({ ...prev, [field]: false }));
            setErrorMessage("");
        } else {
            setFormData((prev) => ({ ...prev, [field]: null }));
            setErrors((prev) => ({ ...prev, [field]: true }));
            setErrorMessage("Fayl tanlanishi kerak.");
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Errors = {
            fullName: !formData.fullName,
            email: !formData.email,
            phone: !formData.phone,
            file1: !formData.file1,
            file2: !formData.file2,
            type: !formData.type,
        };
        setErrors(newErrors);

        if (Object.values(newErrors).includes(true)) {
            setErrorMessage("Please fill out all fields.");
            return false;
        }

        setErrorMessage("");
        return true;
    };

    const handleFileUpload = (file: File | string | null) => {
        if (file && typeof file !== "string") {
            uploadFile(file);
        }
    };

    const handleSubmit = () => {
        if (validateForm()) {
            setStatus(true);
            console.log("Form Submitted:", formData);

            handleFileUpload(formData.file1);
            handleFileUpload(formData.file2);
        }
    };

    return (
        <UniversalModal
            isOpen={vacanciesHolat}
            onClose={() => setVacanciesHolat(false)}
            style="max-h-[90vh] md:w-[60%] w-[90%]"
        >
            <div className="w-full grid place-items-center my-5 mb-16" >
                <h1 className="font-semibold md:text-1xl text-xl text-center px-12 pb-8">Пожалуйста, заполните форму ниже для рассмотрения вашей кандидатуры. Прикрепите ваше резюме и, при необходимости, другие документы, подтверждающие вашу квалификацию.</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 justify-center  gap-y-4 lg:gap-6 w-full my-6">
                    <div className="">1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </div>
                <div className="flex flex-col gap-5">
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className={`border-2 ${errors.fullName ? "border-red-500" : "border-gray-300"
                            } p-2`}
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className={`border-2 ${errors.email ? "border-red-500" : "border-gray-300"
                            } p-2`}
                    />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className={`border-2 ${errors.phone ? "border-red-500" : "border-gray-300"
                            } p-2`}
                    />
                    <input
                        placeholder="File 1"
                        type="file"
                        name="file1"
                        onChange={(e) => handleFileChange(e, "file1")}
                        className={`border-2 ${errors.file1 ? "border-red-500" : "border-gray-300"
                            } p-2`}
                    />
                    <input
                        placeholder="File 2"
                        type="file"
                        name="file2"
                        onChange={(e) => handleFileChange(e, "file2")}
                        className={`border-2 ${errors.file2 ? "border-red-500" : "border-gray-300"
                            } p-2`}
                    />
                    <div className="flex items-center gap-2">
                        <input
                            placeholder="File 2"
                            type="checkbox"
                            name="type"
                            checked={formData.type}
                            onChange={handleChange}
                            className={`border-2 ${errors.type ? "border-red-500" : "border-gray-300"
                                } p-2`}
                        />
                        <label>I accept terms</label>
                    </div>
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={handleSubmit}
                    disabled={status} // Tugma faqat status false bo'lganda bosiladi
                    className={`bg-blue-500 text-white p-2 rounded ${status ? "cursor-not-allowed opacity-50" : ""
                        }`}
                >
                    {status ? "Loading..." : "Submit"}
                </button>

            </div>
        </UniversalModal>
    );
};
