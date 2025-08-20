import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const FloatingCart = () => {
  const { cart, removeFromCart, clearCart, currency } = useAppContext()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  
  // Auto-collapse cart when scrolling on mobile
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 640 && isExpanded) {
        setIsExpanded(false)
      }
    }
    
    if (isExpanded) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [isExpanded])
  
  // Close cart when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isExpanded && !event.target.closest('.floating-cart')) {
        setIsExpanded(false)
      }
    }
    
    if (isExpanded && window.innerWidth <= 640) {
      document.addEventListener('touchstart', handleClickOutside)
      return () => document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isExpanded])
  
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
    setIsExpanded(false)
  }
  
  // Handle swipe to close on mobile
  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartY(e.touches[0].clientY)
    setCurrentY(e.touches[0].clientY)
  }
  
  const handleTouchMove = (e) => {
    if (!isDragging) return
    setCurrentY(e.touches[0].clientY)
  }
  
  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    const deltaY = currentY - startY
    // If swiped down more than 100px, close the cart
    if (deltaY > 100) {
      setIsExpanded(false)
      toast.success('Cart minimized', {
        duration: 1000,
        icon: '👇'
      })
    }
    
    setStartY(0)
    setCurrentY(0)
  }

  return (
    <div className="floating-cart fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      {/* Cart Toggle Button - Mobile Optimized */}
      <div 
        className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg transition-all duration-300 touch-manipulation ${
          isExpanded ? 'rounded-t-2xl sm:rounded-t-3xl rounded-b-none' : 'hover:scale-105 active:scale-95'
        }`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 w-full text-left min-h-[48px] touch-manipulation"
        >
          <div className="relative">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold">
                {cart.length > 9 ? '9+' : cart.length}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm sm:text-base truncate">Travel Cart</div>
            <div className="text-xs sm:text-sm opacity-90 truncate">{currency}{totalCost}</div>
          </div>
          <svg 
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>

      {/* Expanded Cart - Mobile Optimized */}
      {isExpanded && (
        <div 
          className="bg-white rounded-t-none rounded-b-2xl sm:rounded-b-3xl shadow-2xl w-[calc(100vw-2rem)] sm:w-96 max-w-sm sm:max-w-none max-h-[70vh] sm:max-h-[500px] flex flex-col overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: isDragging ? `translateY(${Math.max(0, currentY - startY)}px)` : 'translateY(0px)',
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {/* Cart Header - Mobile Optimized with swipe indicator */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-3 flex-shrink-0 relative">
            {/* Swipe indicator for mobile */}
            <div className="block sm:hidden absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/30 rounded-full"></div>
            <div className="flex items-center justify-between pt-1 sm:pt-0">
              <h3 className="font-bold text-base sm:text-lg">Your Travel Plan</h3>
              <button
                onClick={handleClearCart}
                className="bg-white/20 hover:bg-white/30 active:bg-white/40 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm transition-all touch-manipulation min-h-[32px]"
              >
                Clear All
              </button>
            </div>
            {/* Mobile swipe hint */}
            <div className="block sm:hidden text-xs text-white/70 text-center mt-1">
              💡 Swipe down to minimize
            </div>
          </div>

          {/* Cart Items by City - Scrollable & Mobile Optimized */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0">
            {Object.entries(cityGroups).map(([city, items]) => (
              <div key={city} className="border rounded-lg p-2 sm:p-3">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                  📍 {city}
                  <span className="text-xs sm:text-sm font-normal text-gray-500">
                    ({items.length} {items.length === 1 ? 'exp' : 'exps'})
                  </span>
                </h4>
                
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex items-center justify-between bg-gray-50 rounded p-2 gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-xs sm:text-sm text-gray-800 truncate">{item.title}</div>
                        <div className="text-xs text-gray-500 truncate">{item.category} • {item.duration}</div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <span className="font-bold text-gray-800 text-xs sm:text-sm">{currency}{item.price}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 active:text-red-800 p-1 touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-600 truncate">{city} subtotal:</span>
                    <span className="font-bold text-gray-800 flex-shrink-0">
                      {currency}{items.reduce((sum, item) => sum + item.price, 0)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Footer - Always Visible & Mobile Optimized */}
          <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-t flex-shrink-0">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="font-bold text-base sm:text-lg text-gray-800">Total Trip Cost:</span>
              <span className="font-bold text-lg sm:text-2xl text-gray-600">{currency}{totalCost}</span>
            </div>
            
            <div className="text-xs text-gray-500 mb-2 sm:mb-3">
              * Estimated costs for {Object.keys(cityGroups).length} destination{Object.keys(cityGroups).length !== 1 ? 's' : ''}
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 active:from-green-700 active:to-emerald-700 text-white py-3 sm:py-3 rounded-full font-semibold transition-all duration-300 shadow-lg text-sm sm:text-base touch-manipulation min-h-[48px]"
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
