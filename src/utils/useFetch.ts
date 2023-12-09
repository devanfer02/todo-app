import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFetch<T>(url: string): [T[] | null, boolean, unknown] {
  const [ data, setData ] = useState<T[] | null>(null)
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)
  

  const getData = async () => {
    try {
      const res = await axios.get(url)
      setData(res.data.data)
    } catch (err) {
      console.log(err)
      setError(error)
    }
  }

  useEffect(() => {
    getData()
    setLoading(false)
  }, [url])

  return [data, loading, error]
}