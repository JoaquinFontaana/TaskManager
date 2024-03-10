import Logo from "./Logo"
import NavBar from "./NavBar"
import SearchBar from "../pages/taskmanager/components/SearchBar.jsx"
import { Button } from "./Button.jsx"
import { Navigate } from "react-router-dom"
import { useState } from "react"
export default function Header({navItems=[], searchBar=false, logout=false, searchTasks, tasks}){
    const [redirect ,setRedirect] = useState(false)
    function handleLogOut(e){
        e.preventDefault()
        localStorage.removeItem("token")
        setRedirect(true)
    }
    const className=`header`
    return (
        <header className={className}>
            <div className="header-itemsContainer">
            <Logo />
            {searchBar && <SearchBar searchTasks={searchTasks} tasks={tasks}></SearchBar>}
            <NavBar navItems={navItems}/>
            {redirect && <Navigate to="/login"/>}
            {logout && <Button handleClick={handleLogOut} type="logout">LogOut</Button>}
            </div>
        </header>
    )
}