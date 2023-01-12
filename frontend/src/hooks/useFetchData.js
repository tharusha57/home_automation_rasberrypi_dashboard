import axios from "axios";
import { useEffect, useState } from "react";
import {useRenderContext} from '../hooks/useRenderContext'

const useFetchData = (url) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        const firstCall = async () => {
            try {
                const response = await axios.get(url)
                setData(response.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        firstCall()
       

        var timer
        timer = setInterval(async function () {
            try {
                const response = await axios.get(url)
                setData(response.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)

        }, 5000);
        return () => clearTimeout(timer);
        
    }, [])
    return { data, error, loading }
}

export default useFetchData