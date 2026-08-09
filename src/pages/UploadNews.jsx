
import { useEffect, useState } from "react";

import { validNew } from "../data/valid";
import { RiLoader2Fill } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";
import axios from "axios";

import { API_URL } from "../api";
import { uploadToCloudinary } from "../config/cloudinary";

function UploadNews() {
    const [errors, setErrors] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadState, setUploadState] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const [users, setUsers] = useState([]);

    const [image, setImage] = useState(null);

    const [values, setValues] = useState({
        title: "",
        description: "",
        cover: "",
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeImage = (e) => {
        const imageFile = e.target.files?.[0];

        if (!imageFile) {
            setImage(null);
            return;
        }

        setImage(imageFile);

        // Keep the filename in the form values for validation
        setValues((prev) => ({
            ...prev,
            cover: imageFile.name,
        }));

        setErrors("");
        setUploadState(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setErrors("");
        setUploadState(false);

        // Validate form
        const validation = validNew(values);

        if (!validation.valid) {
            scrollTo({
                top: 0,
                behavior: "smooth",
            });

            setErrors(validation.message);
            return;
        }

        // Make sure an image was selected
        if (!image) {
            setErrors("يرجى اختيار غلاف الخبر");
            return;
        }

        try {
            setUploading(true);

            // ==========================================
            // 1. Upload image to Cloudinary
            // ==========================================

            const cloudinaryURL = await uploadToCloudinary(
                image,
                "news",
                "image"
            );

            console.log("Cloudinary image:", cloudinaryURL);

            setImageURL(cloudinaryURL);

            // ==========================================
            // 2. Send news data + Cloudinary URL
            //    to your existing API
            // ==========================================

            const newsData = {
                title: values.title,
                description: values.description,
                cover: cloudinaryURL,
            };

            const response = await axios.post(
                `${API_URL}/upload-news`,
                newsData
            );

            console.log("News saved:", response.data);

            // ==========================================
            // 3. Success
            // ==========================================

            setUploadState(true);

            // Reset form
            setValues({
                title: "",
                description: "",
                cover: "",
            });

            setImage(null);

            // Reset file input
            const fileInput = document.querySelector(
                'input[name="cover"]'
            );

            if (fileInput) {
                fileInput.value = "";
            }

        } catch (err) {
            console.error("Upload news error:", err);

            setErrors(
                err.response?.data?.message ||
                err.message ||
                "حدث خطأ أثناء رفع الخبر"
            );

            setUploadState(false);
        } finally {
            setUploading(false);
        }
    };

    // Hide error message
    useEffect(() => {
        if (!errors) return;

        const timer = setTimeout(() => {
            setErrors("");
        }, 20000);

        return () => clearTimeout(timer);
    }, [errors]);

    // Hide success message
    useEffect(() => {
        if (!uploadState) return;

        const timer = setTimeout(() => {
            setUploadState(false);
        }, 20000);

        return () => clearTimeout(timer);
    }, [uploadState]);

    const getAllUsers = () => {
        axios
            .get(`${API_URL}/user/all`)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="flex justify-around items-center gap-5 flex-col my-20"
            >
                {/* Header */}
                <div className="font-cairo flex flex-col justify-center gap-4 items-center">
                    <h2 className="text-2xl font-bold">
                        رفع خبر جديد
                    </h2>

                    <div className="bg-black w-1/2 h-2 rounded-md"></div>
                </div>

                {/* Error */}
                {errors !== "" && (
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

                    {/* Title */}
                    <div className="flex flex-col font-cairo w-full justify-center gap-4 mx-auto">
                        <label
                            className="text-end"
                            htmlFor="title"
                        >
                            عنوان الخبر
                        </label>

                        <input
                            id="title"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            className="md:w-[500px] mx-6 md:mx-0 h-[40px] outline-none rounded-md shadow-md w-[300px]"
                            type="text"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col font-cairo w-full justify-center gap-4 mx-auto">
                        <label
                            className="text-end"
                            htmlFor="description"
                        >
                            وصف الخبر
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            className="md:w-[500px] mx-6 md:mx-0 h-[80px] outline-none rounded-md shadow-md w-[300px]"
                        />
                    </div>

                    {/* Cover */}
                    <div className="flex flex-col font-cairo w-full justify-center gap-4 mx-auto">
                        <label
                            className="text-end"
                            htmlFor="cover"
                        >
                            رفع غلاف الخبر
                        </label>

                        <input
                            id="cover"
                            name="cover"
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
                                alt="News cover preview"
                                className="w-[300px] h-[180px] object-cover rounded-md shadow-md"
                            />
                        )}
                    </div>
                </div>

                {/* Submit */}
                <div className="w-full mb-3 flex justify-center items-center p-5">
                    <button
                        type="submit"
                        disabled={uploading}
                        className="hover:-translate-y-1 shadow-md ease-in-out delay-100 transition-all bg-black text-white flex justify-center items-center rounded-md mx-auto md:w-1/5 w-1/2 py-2 text-lg text-center capitalize font-cairo disabled:opacity-50 disabled:cursor-not-allowed"
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

export default UploadNews;

