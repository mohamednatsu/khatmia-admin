
import axios from "axios";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

/**
 * Upload a file to Cloudinary
 *
 * @param {File} file - File to upload
 * @param {string} folder - Cloudinary folder
 * @param {string} resourceType - Cloudinary resource type (image, raw, video)
 * @returns {Promise<string>} Cloudinary secure URL
 */
export const uploadToCloudinary = async (
    file,
    folder = "images",
    resourceType = "image"
) => {
    if (!file) {
        throw new Error("No file provided");
    }

    if (!CLOUDINARY_CLOUD_NAME) {
        throw new Error("Cloudinary cloud name is not configured");
    }

    if (!CLOUDINARY_UPLOAD_PRESET) {
        throw new Error("Cloudinary upload preset is not configured");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", folder);

    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
        formData
    );

    return response.data.secure_url;
};

export default {
    uploadToCloudinary,
};
