
import { NavLink } from "react-router-dom"
import logo from "../assets/logo.png"
import { useState } from "react"




export default function Navbar() {
    const [open, setOpen] = useState(false)
    return (
            <nav className="bg-white shadow-md rounded-md border-gray-200 dark:bg-gray-900 container">
                <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4 ">
                    <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className=" w-[100px] h-12 " alt="Flowbite Logo" />
                    </NavLink>
                    <button onClick={() => {setOpen(!open)}} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`w-full md:block md:w-auto ${open ? "" : "hidden"}`} id="navbar-default">
                        <ul className=" font-cairo font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 content-center dark:border-gray-700">
                            <li>
                                <NavLink to="/" className={({ isActive }) => (isActive ? 'block py-2 px-3  text-red-500' : 'block py-2 px-3  text-black')} aria-current="page">تحميل كتاب</NavLink>
                            </li>
                            <li>
                                <NavLink to="/upload-news" className={({ isActive }) => (isActive ? 'block py-2 px-3  text-red-500' : 'block py-2 px-3  text-black')} aria-current="page">تحميل خبر</NavLink>
                            </li>
                            <li>
                                <NavLink to="/upload-video" className={({ isActive }) => (isActive ? 'block py-2 px-3  text-red-500' : 'block py-2 px-3  text-black')} aria-current="page">تحميل فيديو</NavLink>
                            </li>
                            <li>
                                <NavLink to="/upload-event" className={({ isActive }) => (isActive ? 'block py-2 px-3  text-red-500' : 'block py-2 px-3  text-black')} aria-current="page">تحميل حدث</NavLink>
                            </li>
                            <li>
                                <NavLink to="/upload-photo" className={({ isActive }) => (isActive ? 'block py-2 px-3  text-red-500' : 'block py-2 px-3  text-black')} aria-current="page">تحميل صورة</NavLink>
                            </li>
                            <li>
                                <NavLink to="/books" className={({ isActive }) => (isActive ? 'block py-2 px-3  text-red-500' : 'block py-2 px-3  text-black')} aria-current="page">الكتب</NavLink>
                            </li>
                            <li>
                                <NavLink to="/news" className={({ isActive }) => (isActive ? 'block py-2 px-3  text-red-500' : 'block py-2 px-3  text-black')} aria-current="page">الاخبار</NavLink>
                            </li>
                            <li>
                                <NavLink to="/users" className={({ isActive }) => (isActive ? 'block py-2 px-3  text-red-500' : 'block py-2 px-3  text-black')} aria-current="page">الأعضاء</NavLink>
                        </li>
                            <li>
                                <NavLink to="/events" className={({ isActive }) => (isActive ? 'block py-2 px-3  text-red-500' : 'block py-2 px-3  text-black')} aria-current="page">الاحداث</NavLink>
                            </li>
                            <li>
                                <NavLink to="/videos" className={({ isActive }) => (isActive ? 'block py-2 px-3  text-red-500' : 'block py-2 px-3  text-black')} aria-current="page">الفيديوهات</NavLink>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    )
}
