import axios from "axios"
import { useEffect, useState } from "react"

export default function useFetch<T>(apiUrl: string): [ T[], () => Promise<void>, unknown ] {
  const [ data, setData ] = useState<T[]>([])
  const [ error, setError ] = useState(null)
  
  const getData = async () => {
    try {
      const res = await axios.get(apiUrl)

      setData(res.data.data)
    } catch (err) {
      console.log(err)
      setError(error)
    }
  }

  useEffect(() => {
    getData()
  }, [apiUrl]) 

  return [ data, getData, error ]
}

