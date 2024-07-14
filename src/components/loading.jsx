import { ImSpinner6 } from "react-icons/im";


const Loading = (props) => (
    <div className=" flex justify-center items-center h-[30vh] w-full">
        <ImSpinner6 size={props.size} className={`loading text-${props.color} rotate-element text-center flex flex-col justify-center`}/>
    </div>
);

export default Loading;