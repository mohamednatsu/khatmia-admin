
import { useEffect, useState } from "react";

import  { validVideo } from "../data/valid";

import { RiLoader2Fill } from "react-icons/ri";

import { MdErrorOutline } from "react-icons/md";

import { BsCheckCircle } from "react-icons/bs";
import {useLocation} from "react-router-dom"

import axios from "axios";
import { API_URL } from "../api";

function Reply() {

    const location = useLocation()

    const user = location.state || {}

    const [errors, setErrors] = useState("");
    const [uploading, setUploading ] = useState(false)
    const [uploadState, setUploadState ] = useState(false)


    const [values, setValues] = useState({
        answer: '',
        email: user.email,
        question: user.question
    })

    const handleChange = (e) => {
        const objValues = { ...values, [e.target.name]: e.target.value }
        setValues(objValues)
    }

    

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values)
        if (values.answer != "") {
                try {
                    // set of image in storage
                    setUploading(true)
                    // save in db
                    axios.post(`https://khatmia-server.vercel.app/reply-user`, values)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                        setErrors(err.response.data.message)
                        setUploadState(false)
                    })
                } catch (err) {
                    console.log(err)
                }
                finally {
                    setUploading(false)
                    setUploadState(true)
                }
        }
        else {
            scrollTo({
                top: 0,
                behavior: 'smooth',
            })
            setErrors(validVideo(values).message)
        }
    };

    useEffect(() => {
        // malke the error div wait 2 seconds and then hide
        setTimeout(() => {
            setErrors("");
            setUploadState(false)
            }, 20000);
            //clear time
            return () => clearTimeout();
    }, [errors])

    useEffect(() => {
        // malke the error div wait 2 seconds and then hide
        setTimeout(() => {
            setUploadState(false)
            }, 20000);
            
            //clear time
            return () => clearTimeout();
    }, [uploadState])


    return (
        <div className=" flex justify-center items-center">
            <form onSubmit={handleSubmit} className=" flex justify-around items-center gap-5 flex-col my-20">
            <div className=" font-cairo flex flex-col justify-center gap-4 items-center">
                <h2 className=" text-2xl font-bold ">الرد على السؤال</h2>
                <div className=" bg-black w-1/2 h-2 rounded-md"></div>
            </div>

                {!errors ?  
                    "" : 
                    <div className="w-1/2 text-sm md:text-lg h-10 flex justify-center md:gap-5 gap-1 items-center rounded-md bg-red-500 shadow-md font-cairo text-white">
                        {errors}
                        <MdErrorOutline size={20} color="white" />
                    </div>
                }

                {
                    uploadState ? 
                    <div className="w-1/2 h-10 flex justify-center gap-5 items-center rounded-md bg-green-500 shadow-md font-cairo text-white">
                        تم ارسال الرد بنجاح
                        <BsCheckCircle size={20} color="white" />
                    </div>
                    : ""
                }
                
                <div className="flex justify-around items-center gap-5 flex-col p-5 mx-auto">
                    <div className="flex flex-col font-cairo w-full justify-center gap-4 mx-auto">
                        <h2 className="text-xl text-end text-red-400"   htmlFor=""> {user.name}  :الاسم</h2>
                    </div>
                    <div className="flex flex-col font-cairo w-full justify-center gap-4 mx-auto">
                        <h2 className="text-md text-end text-black"   htmlFor=""> {user.question}  :السؤال</h2>
                    </div>
                    <div className="flex flex-col font-cairo w-full justify-center gap-4 mx-auto">
                        <label  className="text-end"  htmlFor="">:اجابة السؤال</label>
                        <textarea name="answer" onChange={handleChange} className=" md:w-[500px] mx-6 md:mx-0 h-[80px] outline-none rounded-md shadow-md w-[300px]"   type="text" />
                    </div>
                </div>

                <div className=" w-full mb-3 flex justify-center items-center p-5">
                    <button className=" hover:-translate-y-1 shadow-md ease-in-out delay-100 transition-all bg-black text-white flex justify-center rounded-md mx-auto md:w-1/5 w-1/2 py-2 text-lg text-center capitalize font-cairo">
                        {uploading ? <RiLoader2Fill className="rotate-element" size={20} color="white" /> : "ارسال"}
                    </button>
                </div>
            </form>
        </div>
    )
}



export default Reply