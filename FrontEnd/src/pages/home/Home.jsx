import { Navigate } from "react-router-dom"
import Header from "../../components/Header"
import { Button } from "../../components/Button"
export default function Home() {
    const navItems = [
        {
            to: '/login',
            text: 'Login',
        },
        {
            to: '/signup',
            text: 'SignUp'
        }
    ]
    return (
        <div className='pageContainer home'>
            <Header searchBar={false} navItems={navItems}></Header>
            <main className="home">
                <div className="sloganContainer">
                    <h2>Elevate Your Productivity.</h2>
                    <h3>Where Tasks Meet Simplicity</h3>
                    <Button>Lets Start</Button>
                </div>
                <div className="imageContainer"></div>
            </main>
        </div>
    )
}