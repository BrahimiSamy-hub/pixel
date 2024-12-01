import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const PostersContext = createContext()

export const usePosters = () => useContext(PostersContext)

export const PostersProvider = ({ children }) => {
  const [posters, setPosters] = useState([])
  const [selectedPoster, setSelectedPoster] = useState(null)
  const [selectedHero, setSelectedHero] = useState(null)
  const [open, setOpen] = useState(false)
  const [singleProduct, setSingleProduct] = useState(null) // State for a single product

  const fetchPosters = async (categoryId = null) => {
    try {
      const url = categoryId
        ? `https://api.pixeldz.store/posters?category=${categoryId}`
        : 'https://api.pixeldz.store/posters'
      const response = await axios.get(url)

      setPosters(response.data)
      setSelectedPoster(response.data[0])
    } catch (error) {
      console.error('Error fetching posters:', error)
    }
  }

  // Function to fetch a single product by ID
  const fetchSingleProduct = async (productId) => {
    try {
      const response = await axios.get(
        `https://api.pixeldz.store/posters/${productId}`
      )
      setSingleProduct(response.data)
    } catch (error) {
      console.error('Error fetching single product:', error)
    }
  }

  useEffect(() => {
    fetchPosters()
  }, [])

  const handlePosterClick = (poster) => {
    setSelectedPoster(poster)
    setSelectedHero(null) // Reset selected hero when a new poster is selected
    setOpen(true)
  }

  return (
    <PostersContext.Provider
      value={{
        posters,
        selectedPoster,
        selectedHero,
        setSelectedHero,
        open,
        setOpen,
        handlePosterClick,
        fetchPosters,
        fetchSingleProduct, // Expose this function to fetch a single product
        singleProduct, // Expose the single product data
      }}
    >
      {children}
    </PostersContext.Provider>
  )
}
