import { useState } from "react";
import axios from "axios";
export default function useDeleteTask(){
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const deleteTaskFetch = async (url,id) => {
        try {
            setLoading(true)
            const token = localStorage.getItem("token")

            const headers = {
                Authorization:`Bearer ${token}`
            }
            const response = await axios.delete(`${url}/${id}`, { headers });
            return response.data
        } catch (error) {
            if (error.response.status >= 500) {
                setError("Ha ocurrido un error. Vueleve a intentarlo mas tarde")
            }
            else {
                setError(error.response.data.message)
            }
            return error.response.data
        }
        finally {
            setLoading(false)
        }
    }
    return {deleteTaskFetch,error,loading}
}
