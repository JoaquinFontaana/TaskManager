import { FaRegCheckCircle } from "react-icons/fa";

export default function Notification({message, additionalClassName}){
    const className = `notification ${additionalClassName}`
    return(
        <div className={className}>
            <span>{message}</span>
            <FaRegCheckCircle className="icon"/>
        </div>
    )
}