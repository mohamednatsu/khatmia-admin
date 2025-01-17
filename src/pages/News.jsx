import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import axios from "axios";
import { API_URL } from "../api";
import Loading from "../components/loading";
import Add from "../components/Add";
import { Link } from "react-router-dom";

function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const getAll = () => {
        axios.get(`${API_URL}/get-news`).then((res) => {
            console.log(res);
            setLoading(false);
            setNews(res.data);
        });
    };

    useEffect(() => {
        getAll();
    }, []);

    const deleteNews = (titleNew) => {
        axios
            .delete(`${API_URL}/delete-new/${titleNew}`)
            .then((res) => {
                console.log(res);
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
                    الاخبار
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
                            <img
                                className=" md:w-[160px] w-[100px] rounded-md"
                                src={post.cover}
                                alt=""
                            />
                            <div className="w-full p-5  justify-around   items-center flex flex-row">
                                <div
                                    className=" cursor-pointer justify-center gap-5 items-center flex flex-row"
                                >

                                    <div 
                                    onClick={() => {
                                        deleteNews(post.title);
                                    }}
                                    className="flex flex-row items-start justify-center gap-2 text-red-400">

                                    حذف الخبر
                                    <MdDeleteForever
                                        className=" cursor-pointer md:text-[20px] text-[20px]"
                                        color="red"
                                        />
                                    </div>

                                    <Link 
                                    to={"/edit-new"}
                                    state={post}
                                    className="flex flex-row items-start justify-center gap-2 text-black">
                                    تعديل الخبر
                                    <FaRegEdit
                                        className=" cursor-pointer md:text-[20px] text-[20px]"
                                        color="black"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className=" text-center font-cairo">لا اخبار</p>
            )}

            <Add title="خبر" link="/upload-news"/>
        </div>
    );
}

export default News;
