import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import YouTube from 'react-youtube';

import axios from "axios";
import { API_URL } from "../api";
import Loading from "../components/loading";

function Videos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAll = () => {
        axios.get(`${API_URL}/get-videos`).then((res) => {
            console.log(res);
            setLoading(false);
            setVideos(res.data);
        });
    };

    useEffect(() => {
        getAll();
    }, []);

    const deleteBook = (titleNew) => {
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
                        {videos.length}
                </b>
                    الفيديوهات
                </h2>
                <div className=" bg-red-500 w-1/2 h-2 rounded-md"></div>
            </div>

            {loading ? (
                <Loading size={"33"} color={"black"} />
            ) : videos.length > 0 ? (
                <div className="grid md:grid-cols-3 grid-cols-1 w-full mx-auto">
                    {
                        videos.map((post, key) => (
                            <div
                                key={key}
                                className="mx-auto font-cairo flex flex-col md:gap-4 justify-around py-12 md:pb-4 px-4 items-center my-5 md:w-[350px] w-[400px] h-[400px] md:h-[400px]  bg-gray-100 rounded-md shadow-lg"
                            >
                                <YouTube className="md:w-1/4 md:h-1/4 w-[10%] h-[10%] flex justify-center items-center" videoId={post.videoID}/>
                                <h3 className=" mt-4 text-lg">{post.title}</h3>
                                <div className="w-full p-5  md:justify-around justify-center   items-center flex flex-row">
                                    <div
                                        onClick={() => {
                                            deleteBook(post.title);
                                        }}
                                        className="text-red-400 cursor-pointer justify-center items-center flex flex-row"
                                    >
                                        حذف الفيديو
                                        <MdDeleteForever
                                            className=" cursor-pointer md:text-[20px] text-[20px]"
                                            color="red"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            ) : (
                <p className=" text-center">No News</p>
            )}
        </div>
    );
}

export default Videos;
