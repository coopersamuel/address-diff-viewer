import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

// Manage fetch related state (ie loading, error and data)
const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'RESET':
      return {
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      }
    case 'FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    default:
      throw new Error('Unknown action passed to fetch reducer')
  }
}

/**
 * Custom react hook for fetching data from an external api
 */
const useApi = (initialUrl, initialData = [], requestOptions = {}) => {
  const [url, setUrl] = useState(initialUrl)
  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  })

  const clearData = () => dispatch({ type: 'RESET', payload: initialData })
 
  useEffect(() => {
    const fetchData = async () => {
      if (!url) return

      // Set loading flag when api call is initialized
      dispatch({ type: 'LOADING' })
 
      try {
        // Axios will default to GET unless otherwise specified in the requestOptions
        const result = await axios(url, {
          ...requestOptions,
          baseURL: BASE_URL
        })
        dispatch({ type: 'SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FAILURE' })
      }
    }
 
    fetchData()
  }, [url])
 
  // Expose the current state, setUrl (which can be used to execute a new fetch) and clearData
  return [state, setUrl, clearData]
}

export default useApi
