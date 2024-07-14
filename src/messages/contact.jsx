import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api";
import Loading from "../components/loading";
import { FaReply } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AllContact() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyq, setReply] = useState(false);


    const getAll = () => {
        axios
            .get(`${API_URL}/all-contact`)

            .then((res) => {
                // console.log(res.data.name)
                setEvents(res.data);
                setLoading(false);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getAll();
    }, []);


    return (
        <div className="flex flex-col gap-10 justify-around items-center my-10">
            <div className=" font-cairo flex flex-col justify-center gap-4 items-center">
                <h2 className=" text-2xl font-bold ">
                    {" "}
                    <b className="mr-3 bg-gray-100 px-4 py-0 rounded-full">
                        {events.length}
                    </b>
                    الاستفسارات
                </h2>
                <div className=" bg-red-500 w-1/2 h-2 rounded-md"></div>
            </div>

            <div className="">
                {loading ? (
                    <Loading size={"33"} color={"black"} />
                ) : (
                    <div className="flex flex-col gap-4 items-center justify-around ">
                        {events.map((user, key) => (
                            <div
                                key={key}
                                className="px-7 font-cairo flex flex-col py-8 justify-between items-center h-1/2 w-[500px] gap-6 my-7 bg-gray-50 p-4 rounded-md shadow-md"
                            >
                                <h2 className="w-full text-xl font-bold text-start capitalize">
                                    <b className="text-red-400 mx-3 capitalize font-light">
                                        Name:
                                    </b>{" "}
                                    {user.name}
                                </h2>
                                <p className="w-full ">
                                    <b className="text-red-400 mx-3 capitalize font-light">
                                        Question:
                                    </b>{" "}
                                    {user.question}
                                </p>
                                <Link to={"/reply"} state={user}
                                    className="text-red-400 cursor-pointer mt-5 justify-center items-center flex flex-row gap-2"
                                >
                                    <FaReply
                                        className=" cursor-pointer md:text-[20px] text-[20px]"
                                        color="red"
                                        />
                                        الرد على الرسالة
                                </Link>

                                {
                                    replyq && (<textarea type="text" />)
                                }
                                
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
