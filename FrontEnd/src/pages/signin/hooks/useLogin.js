import { useState } from "react";
import axios from 'axios'
export default function useLogin() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function login(url, email, password) {
        try {
            setLoading(true)
            setError(null)
            const response = await axios.post(url, { email, password })
            return response.data
        }
        catch (e) {
            if (e.response.status >= 500) {
                setError('Ha ocurrido un error. Vuelva a intentar más tarde')
            }
            else {
                setError(e.response.data.message)
            }
            return e.response.data
        }
        finally {
            setLoading(false)
        }
    }
    return { loading, error, login }
}

