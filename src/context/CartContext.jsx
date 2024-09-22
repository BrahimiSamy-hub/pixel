import { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const toggleCart = () => {
    setOpen(!isOpen)
  }

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.selectedHero._id === product.selectedHero._id
      )
      if (existingItem) {
        return prevItems.map((item) =>
          item.selectedHero._id === product.selectedHero._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }
  console.log(cartItems)

  const removeFromCart = (heroId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.selectedHero._id !== heroId)
    )
  }
  const clearCart = () => {
    setCartItems([])
  }
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        isOpen,
        toggleCart,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
