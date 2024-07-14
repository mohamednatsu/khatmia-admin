import {useEffect, useState} from 'react'
import axios from "axios"
import { API_URL } from '../api'
import { FaCircleUser } from "react-icons/fa6";
import Loading from "../components/loading";




export default function Users() {


    const [users,setUsers] = useState([])
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get(`${API_URL}/user/all`)
        .then((res) => {
            // console.log(res.data.name)
            setUsers(res.data)
            setLoading(false);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className='flex flex-col gap-10 justify-around items-center my-10'>
            <div className=" font-cairo flex flex-col justify-center gap-4 items-center">
                <h2 className=" text-2xl font-bold "> <b className='mr-3 bg-blue-gray-50 px-4 py-0 rounded-full'>{users.length}</b>الأعضاء</h2>
                <div className=" bg-red-500 w-1/2 h-2 rounded-md"></div>
            </div>


            <div className="">
            {loading ? (
                    <Loading size={"33"} color={"black"} />
            ) : (
                <div className="flex flex-col gap-4 items-center justify-around ">
                    {users.map((user, key) => (
                        <div key={key} className="px-7 flex flex-row justify-between items-center w-full gap-4 my-7 bg-gray-100 h-20 p-4 rounded-md shadow-md">
                            <FaCircleUser color='red' size={30}/>
                            <h2 className="text-xl font-bold text-start w-full capitalize">{user.name}</h2>
                        </div>
                    ))}
                </div>
            )
            }
                
            </div>
        </div>
    )
}
