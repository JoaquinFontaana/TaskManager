import Header from "../../components/Header"
import Form from "./components/Form"
export default function SignUp() {
    const navItems = [
        {
            to: "/",
            text: "Home"
        },
        {
            to: "/login",
            text: "Login"
        }]
    return (
        <section className="pageContainer signUp">
            <Header navItems={navItems}></Header>
            <main className="signUp">
                <Form></Form>
            </main>
        </section>
    )
}