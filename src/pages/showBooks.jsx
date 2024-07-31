import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

import axios from "axios";
import { API_URL } from "../api";
import Loading from "../components/loading";
import { IoIosAddCircleOutline } from "react-icons/io";

import {Link} from "react-router-dom"
import Add from "../components/Add";



function ShowBooks() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);


    const getAll = () => {
        axios.get(`${API_URL}/get-books`).then((res) => {
            console.log(res);
            setBooks(res.data);
            setLoading(false)
        });
    };

    useEffect(() => {
        getAll();
    }, []);

    const deleteBook = (titleBook) => {
        axios.delete(`${API_URL}/get-books/${titleBook}`).
        then((res) => {
            console.log(res)
            getAll()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="flex flex-col gap-10 justify-around items-center my-10">
            <div className=" font-cairo flex flex-col justify-center gap-4 items-center">
                <h2 className=" text-2xl font-bold ">
                <b className="mr-3 bg-gray-100 px-4 py-0 rounded-full">
                        {books.length}
                    </b>
                    الكتب</h2>
                <div className=" bg-red-500 w-1/2 h-2 rounded-md"></div>
            </div>

                {loading ? <Loading size={"33"} color={"black"}/> : (
                    books.length > 0 ?
                    <div className="grid md:grid-cols-3 grid-cols-2 w-full mx-auto">
                    {
                            books.map((book, key) => (
                                
                            <div key={key} className="mx-auto font-cairo flex flex-col gap-4 justify-around py-3 px-4 items-center my-5 md:w-[350px] w-[200px] md:h-[400px]  bg-gray-100 rounded-md shadow-lg">
                                <h3 className="  text-lg">{book.title}</h3>
                                <img className=" md:w-[160px] w-[100px] rounded-md" src={book.cover} alt="" />
                                <div className="w-full p-5  justify-around   items-center flex flex-row">
                                    <div onClick={() => {deleteBook(book.title)}} className="text-red-400 cursor-pointer justify-center items-center flex flex-row">
                                    حذف الكتاب
                                    <MdDeleteForever className=" cursor-pointer md:text-[20px] text-[20px]" color="red" />
                                    </div>
                                    <p className="text-sm">الفئة: {book.category}</p>
                                </div>
                            </div>
                        ))
                    }

                        </div>

                    : <p className=" text-center">No Books</p>
                )}

            <Add title="كتاب" link="/"/>
        </div>
    );
}

export default ShowBooks;
