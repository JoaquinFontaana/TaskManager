import { useState } from "react";
import axios from "axios";
export default function useCreate() {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    async function createTaskFetch(url, data) {
        try {
            const token = localStorage.getItem('token')
            const headers= {
                Authorization: `Bearer ${token}`
            }
            const response = await axios.post(url,data,{headers})
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
    return { loading, error, createTaskFetch }
}