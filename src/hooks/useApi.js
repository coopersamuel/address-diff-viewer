import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

// Manage fetch related state (ie loading, error and data)
const fetchReducer = (state, action) => {
  switch (action.type) {
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
const useApi = (initialUrl, initialData = []) => {
  const [url, setUrl] = useState(initialUrl)
  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  })
 
  useEffect(() => {
    const fetchData = async () => {
      // Set loading flag when api call is initialized
      dispatch({ type: 'LOADING' })
 
      try {
        console.log('success')
        const result = await axios(url)
        dispatch({ type: 'SUCCESS', payload: result.data })
      } catch (error) {
        // TODO - Send error message as payload
        console.log(error)
        dispatch({ type: 'FAILURE' })
      }
    }
 
    fetchData()
  }, [url])

  console.log(state)
 
  // Expose the current state as well as setUrl, which is used to execute a new fetch
  return [state, setUrl]
}

export default useApi
