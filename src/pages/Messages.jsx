import React from 'react'
import {Link} from "react-router-dom"

import { AiOutlineMessage } from "react-icons/ai";
import { BiSolidMessageSquareEdit } from "react-icons/bi";

export default function Messages() {
    return (
        <div className='bg-[rgb(0,0,0)] opacity-75 h-auto md:w-[140px] md:fixed w-[140px] block  md:top-1/2 top-[100px] shadow-md py-4 px-2 text-white font-cairo rounded-e-md mb-4'>
            <div className="flex flex-col justify-around items-end gap-4 text-sm">
                <Link to={"/fatwa"} className="flex flex-row justify-center items-center px-4 gap-2">
                <BiSolidMessageSquareEdit />
                    الفتوى
                </Link>
                <Link to={"/contact"} className="flex flex-row justify-center items-center px-4 gap-2">
                <AiOutlineMessage />
                    الاستفسارات
                </Link>
            </div>
        </div>
    )
}
