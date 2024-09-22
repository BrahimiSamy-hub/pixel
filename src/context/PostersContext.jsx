// import { createContext, useState, useEffect, useContext } from 'react'
// import axios from 'axios'

// const PostersContext = createContext()

// export const usePosters = () => useContext(PostersContext)

// export const PostersProvider = ({ children }) => {
//   const [posters, setPosters] = useState([])
//   const [selectedPoster, setSelectedPoster] = useState(null)
//   const [open, setOpen] = useState(false)

//   useEffect(() => {
//     const fetchPosters = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/posters')
//         setPosters(response.data)
//         setSelectedPoster(response.data[0])
//       } catch (error) {
//         console.error('Error fetching posters:', error)
//       }
//     }

//     fetchPosters()
//   }, [])
//   console.log(posters)

//   const handlePosterClick = (poster) => {
//     setSelectedPoster(poster)
//     setOpen(true)
//   }

//   return (
//     <PostersContext.Provider
//       value={{
//         posters,
//         selectedPoster,
//         open,
//         setOpen,
//         handlePosterClick,
//       }}
//     >
//       {children}
//     </PostersContext.Provider>
//   )
// }

import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const PostersContext = createContext()

export const usePosters = () => useContext(PostersContext)

export const PostersProvider = ({ children }) => {
  const [posters, setPosters] = useState([])
  const [selectedPoster, setSelectedPoster] = useState(null)
  const [selectedHero, setSelectedHero] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const response = await axios.get('https://api.pixeldz.store/posters')

        setPosters(response.data)
        setSelectedPoster(response.data[0])
      } catch (error) {
        console.error('Error fetching posters:', error)
      }
    }

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
      }}
    >
      {children}
    </PostersContext.Provider>
  )
}
