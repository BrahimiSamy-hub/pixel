import { createContext, useContext, useState } from 'react'
import axios from 'axios'

// Create a context
const ContactContext = createContext()

// Create a custom hook to use the context
export const useContact = () => {
  return useContext(ContactContext)
}

// ContactProvider to manage the state and API call
export const ContactProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const submitContactForm = async (data) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      await axios.post('http://localhost:3000/contact', data)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ContactContext.Provider
      value={{ loading, error, success, submitContactForm }}
    >
      {children}
    </ContactContext.Provider>
  )
}
