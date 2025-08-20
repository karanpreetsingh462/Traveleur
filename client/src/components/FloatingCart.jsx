import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const FloatingCart = () => {
  const { cart, removeFromCart, clearCart, currency } = useAppContext()
  const [isExpanded, setIsExpanded] = useState(false)
  
  if (cart.length === 0) {
    return null // Don't show cart if empty
  }

  const totalCost = cart.reduce((total, item) => total + item.price, 0)
  const cityGroups = cart.reduce((groups, item) => {
    const city = item.location
    if (!groups[city]) {
      groups[city] = []
    }
    groups[city].push(item)
    return groups
  }, {})

  const handleCheckout = () => {
    toast.success('Redirecting to booking checkout...', {
      duration: 3000,
      icon: '🛒'
    })
    // Here you would typically navigate to a checkout page
  }

  const handleClearCart = () => {
    clearCart()
    toast.success('Cart cleared!', {
      icon: '🗑️'
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Cart Toggle Button */}
      <div 
        className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg transition-all duration-300 ${
          isExpanded ? 'rounded-t-3xl rounded-b-none' : 'hover:scale-105'
        }`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 px-6 py-4 w-full text-left"
        >
          <div className="relative">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="font-semibold">Travel Cart</div>
            <div className="text-sm opacity-90">{currency}{totalCost}</div>
          </div>
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>

      {/* Expanded Cart */}
      {isExpanded && (
        <div className="bg-white rounded-t-none rounded-b-3xl shadow-2xl w-96 max-h-[500px] flex flex-col overflow-hidden">
          {/* Cart Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Your Travel Plan</h3>
              <button
                onClick={handleClearCart}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition-all"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Cart Items by City - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {Object.entries(cityGroups).map(([city, items]) => (
              <div key={city} className="border rounded-lg p-3">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  📍 {city}
                  <span className="text-sm font-normal text-gray-500">
                    ({items.length} {items.length === 1 ? 'experience' : 'experiences'})
                  </span>
                </h4>
                
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex items-center justify-between bg-gray-50 rounded p-2">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.category} • {item.duration}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">{currency}{item.price}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{city} subtotal:</span>
                    <span className="font-bold text-gray-800">
                      {currency}{items.reduce((sum, item) => sum + item.price, 0)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Footer - Always Visible */}
          <div className="bg-gray-50 px-6 py-4 border-t flex-shrink-0">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-lg text-gray-800">Total Trip Cost:</span>
              <span className="font-bold text-2xl text-gray-600">{currency}{totalCost}</span>
            </div>
            
            <div className="text-xs text-gray-500 mb-3">
              * Estimated costs for {Object.keys(cityGroups).length} destination{Object.keys(cityGroups).length !== 1 ? 's' : ''}
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-full font-semibold transition-all duration-300 shadow-lg"
            >
              Proceed to Booking
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FloatingCart
