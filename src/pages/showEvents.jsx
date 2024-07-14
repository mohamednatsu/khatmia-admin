import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api";
import Loading from "../components/loading";
import { MdDeleteForever } from "react-icons/md";

export default function AllEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);


    const getAll = () => {
        axios
            .get(`${API_URL}/get-events`)

            .then((res) => {
                // console.log(res.data.name)
                setEvents(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getAll();
    }, []);

    const handleDate = (dateValue) => {
        const date = new Date(dateValue);

        const dayOfWeekNumber = date.getUTCDay();

        // Extract the date components
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const day = String(date.getUTCDate()).padStart(2, "0");
        const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const dayOfWeekName = daysOfWeek[dayOfWeekNumber];
        console.log(dayOfWeekName);
        const formattedDate = `${year}-${month}-${day} Day: ${dayOfWeekName}`;

        return formattedDate;
    };

    const deleteEvent = (title) => {
        setLoading(true);
        axios.delete(
            `${API_URL}/delete-event/${title}`)
                .then((res) => {
                    console.log(res);
                    setLoading(false);
                    getAll();
                })
                .catch((err) => {
                    console.log(err);
                })
    };

    return (
        <div className="flex flex-col gap-10 justify-around items-center my-10">
            <div className=" font-cairo flex flex-col justify-center gap-4 items-center">
                <h2 className=" text-2xl font-bold ">
                    {" "}
                    <b className="mr-3 bg-gray-100 px-4 py-0 rounded-full">
                        {events.length}
                    </b>
                    الاحداث
                </h2>
                <div className=" bg-green-500 w-1/2 h-2 rounded-md"></div>
            </div>

            <div className="">
                {loading ? (
                    <Loading size={"33"} color={"black"} />
                ) : (
                    <div className="flex flex-col gap-4 items-center justify-around ">
                        {events.map((event, key) => (
                            <div
                                key={key}
                                className="px-7 font-cairo flex flex-col py-8 justify-between items-center h-1/2 w-[500px] gap-6 my-7 bg-gray-50 p-4 rounded-md shadow-md"
                            >
                                <h2 className="w-full text-xl font-bold text-start capitalize">
                                    <b className="text-green-400 mx-3 capitalize font-light">
                                        Title:
                                    </b>{" "}
                                    {event.title}
                                </h2>
                                <p className="w-full ">
                                    <b className="text-green-400 mx-3 capitalize font-light">
                                        description:
                                    </b>{" "}
                                    {event.description}
                                </p>
                                <p className="w-full font-bold space-x-5">
                                    <b className="text-green-400 mx-3 capitalize font-light">
                                        date:
                                    </b>{" "}
                                    {handleDate(event.date)}
                                </p>
                                <div
                                    onClick={() => {
                                        deleteEvent(event.title);
                                    }}
                                    className="text-red-400 cursor-pointer mt-5 justify-center items-center flex flex-row"
                                >
                                    حذف الحدث
                                    <MdDeleteForever
                                        className=" cursor-pointer md:text-[20px] text-[20px]"
                                        color="red"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
