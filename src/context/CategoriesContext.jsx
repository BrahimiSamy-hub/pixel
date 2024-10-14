import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const CategoriesContext = createContext()
export const useCategories = () => useContext(CategoriesContext)

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.pixeldz.store/categories')
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  )
}
