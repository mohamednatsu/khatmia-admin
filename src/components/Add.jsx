import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Add(props) {
    return (
        <Link
                to={props.link}
                className={`flex flex-col  w-[70px] h-[70px] bg-red-400 rounded-full fixed bottom-8 right-10 shadow-lg text-center items-start justify-center p-2`}
            >
                <p className="text-center font-cairo flex flex-col justify-center items-center gap-1 w-full cursor-pointer text-white text-[12px]">
                    اضافة <br />
                    {props.title}
                    <IoIosAddCircleOutline color="white" className="text-[17px]" />
                </p>
            </Link>
    )
}
