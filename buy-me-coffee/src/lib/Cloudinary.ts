import { CLOUD_NAME, UPLOAD_PRESET } from "@/app/constants/routes";
import axios from "axios";

// 🎯 Cloudinary руу upload хийх function (duudagdaj ajjillana , onContinue dotor orson baigaa)
export const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
    );
    return res.data.secure_url as string;
    // Шууд Cloudinary линк буцаана
};
