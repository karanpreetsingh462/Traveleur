import React, { useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Experience = () => {
  const { user, navigate, addToCart, cart } = useAppContext()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Adventure', 'Cultural', 'Relaxation', 'Food & Wine', 'Nature']

  const experiences = [
    {
      id: 1,
      title: "Mountain Trekking Adventure",
      description: "Explore breathtaking mountain trails with experienced guides. Perfect for adventure enthusiasts.",
      category: "Adventure",
      duration: "3 Days",
      price: 299,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=300&fit=crop",
      location: "Himachal Pradesh",
      highlights: ["Professional guides", "Equipment provided", "3 meals included", "Certificate of completion"]
    },
    {
      id: 2,
      title: "Heritage City Walking Tour",
      description: "Discover the rich cultural heritage and hidden gems of ancient cities with local storytellers.",
      category: "Cultural",
      duration: "4 Hours",
      price: 89,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=500&h=300&fit=crop",
      location: "Rajasthan",
      highlights: ["Local guide", "Historical insights", "Traditional snacks", "Photography stops"]
    },
    {
      id: 3,
      title: "Luxury Spa Retreat",
      description: "Rejuvenate your mind and body with premium spa treatments in serene natural settings.",
      category: "Relaxation",
      duration: "Full Day",
      price: 199,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=300&fit=crop",
      location: "Kerala",
      highlights: ["Ayurvedic treatments", "Organic meals", "Meditation sessions", "Natural therapies"]
    },
    {
      id: 4,
      title: "Culinary Journey",
      description: "Taste authentic local cuisines and learn traditional cooking techniques from master chefs.",
      category: "Food & Wine",
      duration: "6 Hours",
      price: 149,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop",
      location: "Punjab",
      highlights: ["Cooking classes", "Market tours", "Wine tasting", "Recipe booklet"]
    },
    {
      id: 5,
      title: "Wildlife Safari",
      description: "Experience thrilling wildlife encounters in their natural habitat with expert naturalists.",
      category: "Nature",
      duration: "2 Days",
      price: 259,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&h=300&fit=crop",
      location: "Madhya Pradesh",
      highlights: ["Game drives", "Nature walks", "Bird watching", "Photography workshop"]
    },
    {
      id: 6,
      title: "River Rafting Expedition",
      description: "Navigate through exciting rapids and enjoy the thrill of white water rafting.",
      category: "Adventure",
      duration: "5 Hours",
      price: 119,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&h=300&fit=crop",
      location: "Uttarakhand",
      highlights: ["Safety equipment", "Professional instructors", "Lunch included", "Action photos"]
    },
    {
      id: 7,
      title: "Yoga & Meditation Retreat",
      description: "Find inner peace with guided yoga sessions and meditation practices in tranquil environments.",
      category: "Relaxation",
      duration: "3 Days",
      price: 179,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      location: "Rishikesh",
      highlights: ["Certified instructors", "Vegetarian meals", "Spiritual guidance", "Wellness kit"]
    },
    {
      id: 8,
      title: "Desert Camel Safari",
      description: "Journey through golden sand dunes on camelback and experience desert life under the stars.",
      category: "Cultural",
      duration: "2 Days",
      price: 189,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&h=300&fit=crop",
      location: "Rajasthan",
      highlights: ["Camel rides", "Desert camping", "Folk performances", "Traditional meals"]
    }
  ]

  const filteredExperiences = selectedCategory === 'All' 
    ? experiences 
    : experiences.filter(exp => exp.category === selectedCategory)

  const handleAddToCart = (experience) => {
    if (!user) {
      toast.error('Please login to add experiences to cart')
      return
    }
    
    const success = addToCart(experience)
    // The addToCart function already handles success/error messages
    return success
  }

  const isInCart = (experienceId) => {
    return cart.some(item => item.id === experienceId)
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-playfair">
            Unforgettable Experiences
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
            Create lasting memories with curated experiences that showcase the best of each destination
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-6 md:px-16 lg:px-24">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 md:px-16 lg:px-24 pb-16">
        <div className="text-center mb-12">
          <Title 
            title="Discover Amazing Experiences" 
            subTitle={`Showing ${filteredExperiences.length} ${selectedCategory === 'All' ? 'experiences' : selectedCategory.toLowerCase() + ' experiences'}`}
          />
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((experience) => (
            <div 
              key={experience.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
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
                    {experience.highlights.map((highlight, index) => (
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
                  {isInCart(experience.id) ? (
                    <button
                      disabled
                      className="bg-gray-400 text-white px-6 py-3 rounded-full font-medium shadow-lg flex items-center gap-2 cursor-not-allowed opacity-70"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Added to Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(experience)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                      </svg>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">No experiences found in this category.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 py-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4 font-playfair">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of travelers who have discovered amazing experiences with us
          </p>
          {user ? (
            <button 
              onClick={() => navigate('/rooms')}
              className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Hotels & Stays
            </button>
          ) : (
            <button 
              onClick={() => toast('Please login to start booking')}
              className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Today
            </button>
          )}
        </div>
      </section>
    </div>
  )
}

export default Experience
