import React from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const ExperienceCard = ({ experience, onBook }) => {
  const { user } = useAppContext()

  const handleBooking = () => {
    if (!user) {
      toast.error('Please login to book experiences')
      return
    }
    onBook && onBook(experience)
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative">
        <img 
          src={experience.image} 
          alt={experience.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-gray-700">{experience.category}</span>
        </div>
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full">
          <span className="text-sm">📍 {experience.location}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 font-playfair">
            {experience.title}
          </h3>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm text-gray-600">{experience.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {experience.description}
        </p>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Highlights:</h4>
          <div className="grid grid-cols-2 gap-1">
            {experience.highlights?.slice(0, 4).map((highlight, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                {highlight}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-left">
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-semibold text-gray-700">{experience.duration}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">From</p>
            <p className="font-bold text-2xl text-gray-800">${experience.price}</p>
          </div>
          <button
            onClick={handleBooking}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard
