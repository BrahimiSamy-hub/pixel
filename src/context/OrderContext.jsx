import { createContext, useState, useContext } from 'react'
import axios from 'axios'

const OrderContext = createContext()
export const useOrder = () => useContext(OrderContext)

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null)
  const [isOrderLoading, setIsOrderLoading] = useState(false)
  const [orderError, setOrderError] = useState(null)

  const createOrder = async (orderData) => {
    setIsOrderLoading(true)
    setOrderError(null)

    try {
      const response = await axios.post(
        'https://api.pixeldz.store/orders',
        orderData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      setOrder(response.data)
    } catch (error) {
      setOrderError('Error creating order')
      console.error('Error creating order:', error)
    } finally {
      setIsOrderLoading(false)
    }
  }

  return (
    <OrderContext.Provider
      value={{ order, createOrder, isOrderLoading, orderError }}
    >
      {children}
    </OrderContext.Provider>
  )
}
