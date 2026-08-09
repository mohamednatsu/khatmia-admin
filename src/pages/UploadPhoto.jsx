import { useEffect, useState } from "react";

import { validPhoto } from "../data/valid";

import { RiLoader2Fill } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";

import axios from "axios";

import { API_URL } from "../api";
import { uploadToCloudinary } from "../config/cloudinary";

function UploadPhoto() {
    const [errors, setErrors] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadState, setUploadState] = useState(false);
    const [imageURL, setImageURL] = useState("");

    const [image, setImage] = useState(null);

    const [values, setValues] = useState({
        link: "",
    });

    const handleChangeImage = (e) => {
        const imageFile = e.target.files?.[0];

        if (!imageFile) {
            setImage(null);
            return;
        }

        setImage(imageFile);

        // Store filename temporarily for validation
        setValues((prev) => ({
            ...prev,
            link: imageFile.name,
        }));

        setErrors("");
        setUploadState(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setErrors("");
        setUploadState(false);

        // Validate
        const validation = validPhoto(values);

        if (!validation.valid) {
            scrollTo({
                top: 0,
                behavior: "smooth",
            });

            setErrors(validation.message);
            return;
        }

        if (!image) {
            setErrors("يرجى اختيار الصورة");
            return;
        }

        try {
            setUploading(true);

            // ==========================================
            // 1. Upload image to Cloudinary
            // ==========================================

            const cloudinaryURL = await uploadToCloudinary(
                image,
                "photos",
                "image"
            );

            console.log(
                "Cloudinary image:",
                cloudinaryURL
            );

            setImageURL(cloudinaryURL);

            // ==========================================
            // 2. Save Cloudinary URL in database
            // ==========================================

            const photoData = {
                link: cloudinaryURL,
            };

            console.log("Photo data:", photoData);

            const response = await axios.post(
                `${API_URL}/upload-photo`,
                photoData
            );

            console.log(
                "Photo saved:",
                response.data
            );

            // ==========================================
            // 3. Success
            // ==========================================

            setUploadState(true);

            // Reset
            setValues({
                link: "",
            });

            setImage(null);

            // Reset file input
            const fileInput = document.querySelector(
                'input[name="link"]'
            );

            if (fileInput) {
                fileInput.value = "";
            }

        } catch (err) {
            console.error(
                "Upload photo error:",
                err
            );

            setErrors(
                err.response?.data?.message ||
                err.message ||
                "حدث خطأ أثناء رفع الصورة"
            );

            setUploadState(false);
        } finally {
            setUploading(false);
        }
    };

    // Hide error
    useEffect(() => {
        if (!errors) return;

        const timer = setTimeout(() => {
            setErrors("");
        }, 20000);

        return () => clearTimeout(timer);
    }, [errors]);

    // Hide success
    useEffect(() => {
        if (!uploadState) return;

        const timer = setTimeout(() => {
            setUploadState(false);
        }, 20000);

        return () => clearTimeout(timer);
    }, [uploadState]);

    return (
        <div className="flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="flex justify-around items-center gap-5 flex-col my-20"
            >
                {/* Header */}
                <div className="font-cairo flex flex-col justify-center gap-4 items-center">
                    <h2 className="text-2xl font-bold">
                        رفع صورة جديدة
                    </h2>

                    <div className="bg-red-500 w-1/2 h-2 rounded-md"></div>
                </div>

                {/* Error */}
                {errors && (
                    <div className="w-1/2 text-sm md:text-lg h-10 flex justify-center md:gap-5 gap-1 items-center rounded-md bg-red-500 shadow-md font-cairo text-white">
                        {errors}

                        <MdErrorOutline
                            size={20}
                            color="white"
                        />
                    </div>
                )}

                {/* Success */}
                {uploadState && (
                    <div className="w-1/2 h-10 flex justify-center gap-5 items-center rounded-md bg-green-500 shadow-md font-cairo text-white">
                        تم التحميل بنجاح

                        <BsCheckCircle
                            size={20}
                            color="white"
                        />
                    </div>
                )}

                <div className="flex justify-around items-center gap-5 flex-col p-5 mx-auto">

                    {/* Image */}
                    <div className="flex flex-col font-cairo w-full justify-center gap-4 mx-auto">
                        <label
                            className="text-end"
                            htmlFor="link"
                        >
                            رفع الصورة
                        </label>

                        <input
                            id="link"
                            name="link"
                            onChange={handleChangeImage}
                            className="md:w-[500px] mx-6 md:mx-0 h-[40px] outline-none rounded-md shadow-md w-[300px]"
                            type="file"
                            accept="image/*"
                        />

                        {image && (
                            <p className="text-sm text-gray-500 text-end">
                                الصورة المختارة: {image.name}
                            </p>
                        )}

                        {imageURL && (
                            <img
                                src={imageURL}
                                alt="Preview"
                                className="w-[300px] h-[180px] object-cover rounded-md shadow-md mx-auto"
                            />
                        )}
                    </div>
                </div>

                {/* Submit */}
                <div className="w-full mb-3 flex justify-center items-center p-5">
                    <button
                        type="submit"
                        disabled={uploading}
                        className="hover:-translate-y-1 shadow-md ease-in-out delay-100 transition-all bg-red-500 text-white flex justify-center items-center rounded-md mx-auto md:w-1/5 w-1/2 py-2 text-lg text-center capitalize font-cairo disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? (
                            <RiLoader2Fill
                                className="rotate-element"
                                size={20}
                                color="white"
                            />
                        ) : (
                            "تحميل"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UploadPhoto;
