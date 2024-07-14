import { Select, Option } from "@material-tailwind/react";
import { Input, Button } from "@material-tailwind/react";

export default function UploadSound() {
    return (
        <div className=" relative">
            
        <div className=" relative  flex justify-center flex-col items-center  font-cairo gap-4 w-full h-[120vh]">
            <div className=" flex flex-col justify-center gap-4 items-center">
                <h2 className=" text-2xl font-bold text-end ">رفع صوت جديد</h2>
                <div className=" bg-green-500 w-1/2 h-2 rounded-md"></div>
            </div>

            <div className="flex flex-col justify-around items-center gap-4 p-4 my-4 w-full">
                <div className=" flex flex-col w-1/2 items-center justify-between ">
                    <label htmlFor="message" className=" text-end  w-full block mb-4 text-[16px] font-medium text-gray-900 dark:text-white">عنوان الصوت</label>
                    <Input label="Write book title here" className=" text-end  text-sm" />
                </div>
                <div className=" flex flex-col w-1/2 items-center justify-between ">
                    <label htmlFor="message" className=" text-end  w-full block mb-4 text-[16px] font-medium text-gray-900 dark:text-white">الوصف</label>
                    <textarea id="message" rows="4" className=" text-end block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                </div>

                <div className=" flex flex-col w-1/2 items-center justify-between">

                    <label className=" text-end block w-full  text-[16px] mb-4 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">رفع الملف</label>
                    <input className=" text-end block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />

                </div>

        
                <div className="w-1/2 flex justify-around items-center flex-col">
                    <label htmlFor="file" className=" text-end my-3 w-full">فئة الصوت</label>
                    <Select label="Select Version" className="shadow-md w-full" >
                        <Option>Material Tailwind HTML</Option>
                        <Option>Material Tailwind React</Option>
                    </Select>
                </div>
            </div>

            <div className=" w-full mb-3 flex justify-center items-center p-5">
                <Button className=" bg-green-500 font-cairo text-white flex justify-center rounded-md mx-auto w-1/5 py-2 text-lg text-center capitalize">تحميل</Button>
            </div>
        </div>
        </div>
    );
}
