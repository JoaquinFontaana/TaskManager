import { useState } from "react"
import { Navigate } from "react-router-dom"
export default function Logo() {
    const [redirect, setRedirect] = useState(false)
    function handleClick() {
        setRedirect(true)
    }
    return (
        <div className='icon-container' onClick={handleClick}>
            {redirect && <Navigate to="/"/>}
            <h1 className="icon-text">TaskManager</h1>
        </div>
    )
}