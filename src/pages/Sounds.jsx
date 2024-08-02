import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

import axios from "axios";
import { API_URL } from "../api";
import Loading from "../components/loading";
import Add from "../components/Add";
import { FaPlay } from "react-icons/fa";

function Sounds() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const getAll = () => {
        axios.get(`${API_URL}/get-sounds`).then((res) => {
            setLoading(false);
            setNews(res.data);
        });
    };

    useEffect(() => {
        getAll();
    }, []);

    const deletePost = (id) => {
        axios
            .delete(`${API_URL}/delete-sounds/${id}`)
            .then((res) => {
                setLoading(false);
                getAll();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    return (
        <div className="flex flex-col gap-10 justify-around items-center my-10">
            <div className=" font-cairo flex flex-col justify-center gap-4 items-center">
                <h2 className=" text-2xl font-bold ">
                    <b className="mr-3 bg-gray-100 px-4 py-0 rounded-full">
                        {news.length}
                    </b>
                    الصوتيات
                </h2>
                <div className=" bg-red-500 w-1/2 h-2 rounded-md"></div>
            </div>

            {loading ? (
                <Loading size={"33"} color={"black"} />
            ) : news.length > 0 ? (
                <div className="grid md:grid-cols-3 grid-cols-2 w-full mx-auto">
                    {news.map((post, key) => (
                        <div
                            key={key}
                            className="mx-auto font-cairo flex flex-col gap-4 justify-around py-3 px-4 items-center my-5 md:w-[350px] w-[200px] md:h-[400px]  bg-gray-100 rounded-md shadow-lg"
                        >
                            <h3 className="  text-lg">{post.title}</h3>
                            <div className="flex flex-col justify-center gap-4 items-center">
                                <a
                                    className=" md:w-[160px] w-[100px] rounded-md text-center bg-black p-5 text-white"
                                    href={post.link}
                                    target="_blank"
                                >
                                    تشغيل الصوت
                                <FaPlay size={20} color="white"/>
                                </a>
                            </div>
                            <div className="w-full p-5  justify-around   items-center flex flex-row">
                                <div
                                    onClick={() => {
                                        deletePost(post._id);
                                    }}
                                    className="text-red-400 cursor-pointer justify-center items-center flex flex-row"
                                >
                                    حذف الصوت
                                    <MdDeleteForever
                                        className=" cursor-pointer md:text-[20px] text-[20px]"
                                        color="red"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className=" text-center font-cairo">لا توجد صوتيات</p>
            )}
                <Add title="رابط صوتي" link="/upload-sound-link"/>
        </div>
    );
}

export default Sounds;
