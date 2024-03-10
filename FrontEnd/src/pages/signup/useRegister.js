import { useState } from "react";
import axios from 'axios'
export default function useRegister(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const registerFetch = async (url,data) => {
        setLoading(true)
        try{ 
        const response = await axios.post(url,data)
        return(response.data)
        }
        catch(e){
            setError(e.response.data.message)
            return e.response.data
        }
        finally{
            setLoading(false)
        }
    }
    return { loading, registerFetch, error}
}