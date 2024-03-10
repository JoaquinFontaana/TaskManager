import { Link, Navigate } from "react-router-dom"
import { Button } from "../../../components/Button"
import { useState} from "react"
import useLogin from "../hooks/useLogin.js"
import Error from "../../../components/Error"
import { handleLoginServices } from "../../../services/handleLogin"
export default function Form() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userError, setUserError] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const { login, loading, error } = useLogin()

    const handleLogin = async (e) => {
        const { userError, response} = await handleLoginServices(e, email, password, login);
        setUserError(userError);
        if(response && response.ok){
            const token = response.tokenSession
            localStorage.setItem("token",token)
            setRedirect(true)
        }
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    return( 
        <>
            <section className="signIn formContainer">
                <h2>Login</h2>
                <form className="signIn form">
                    {redirect && <Navigate to="/TaskManager"/>}
                    {userError && <Error>{userError}</Error>}
                    <input
                        className="signIn formItem"
                        placeholder="Email"
                        value={email}
                        onChange={handleChangeEmail}>
                    </input>
                    <input
                        className="signIn formItem"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    ></input>

                    <Button type='login' handleClick={handleLogin}>
                        {loading ? '...' : 'Login'}
                    </Button>
                    {error && <Error>{error}</Error>}
                </form> 
                <div className="signIn suggestion">
                    <span>¿No estas registrado?</span>
                    <Link className="link" to="/signup">Registrate</Link>
                </div>
            </section>
        </>
    )
}