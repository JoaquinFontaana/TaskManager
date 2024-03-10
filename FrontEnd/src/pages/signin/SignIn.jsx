import Header from "../../components/Header"
import Form from "./components/Form"
export default function SignIn(){
    const navItems = [
        {
            to: '/',
            text: "Home"
        },
        {
            to:'/signup',
            text:'SignUp'
        }
    ]
    return(
        <section className="pageContainer signIn">
            <Header searchBar={false} navItems={navItems}></Header>
            <main className="signIn">
                <Form></Form>
            </main>
        </section>
    )
}