import { Button } from "../../../components/Button"
import Error from "../../../components/Error"
import { useState } from "react"
import useRegister from "../useRegister"
import { Navigate } from "react-router-dom"

export default function Form() {
    const { loading, error, registerFetch } = useRegister()
    const [redirect, setRedirect] = useState(false)
    const [userErrors, setUserErrors] = useState(false)

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    async function handleSubmit(e) {
        e.preventDefault();
        const fields = Object.fromEntries(new FormData(e.target));

        setUserErrors(false);
        const errors = {confirmPassword: null, password: null, email: null, ok: true };
        if (!fields.password) {
            errors.password = "La contraseña es requerida";
            errors.ok = false
        }

        if (!fields.confirmPassword) {
            errors.confirmPassword = "Confirma la contraseña"
            errors.ok = false
        } else if (fields.confirmPassword !== fields.password) {
            errors.confirmPassword = "Las contraseñas no son iguales";
            errors.ok = false
        }
        if (!isValidEmail(fields.email)) {
            errors.email = "Ingresa un email válido"
            errors.ok = false
        }
        if (errors.ok) {
            const url = "http://localhost:3100/api/user/register";
            try {
                const response = await registerFetch(url, fields);
                if (response && response.ok) {
                    localStorage.setItem("token", response.tokenSession);
                    setRedirect(true);
                }
            } catch (error) {
                console.error("Registration error:", error);
            }
        }
        else {
            setUserErrors(errors)
        }
    }

    return (
        <div className="formContainer signUp">
            <h2>Register</h2>
            <form className="signUp form" onSubmit={handleSubmit}>
                {userErrors.email && <Error>{userErrors.email}</Error>}
                <input name="email" type="text" placeholder="Email" />
                {userErrors.password && <Error>{userErrors.password}</Error>}
                <input name="password" type="password" placeholder="Password" />
                {userErrors.confirmPassword && <Error>{userErrors.confirmPassword}</Error>}
                <input name="confirmPassword" type="password" placeholder="Confirm Password" />
                {error && <Error>{error}</Error>}
                <Button type="login">{loading ? "..." : "Register"}</Button>
            </form>
            {redirect && <Navigate to="/TaskManager" />}
        </div>
    );
}