import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
const founder = {
    name: "Karanpreet Singh",
    role: "Founder & CEO",
    image: assets.founderImage,
    description: "Passionate entrepreneur and tech innovator who founded Traveleur to revolutionize the way people discover and book their perfect accommodations. With a vision to make travel accessible and enjoyable for everyone, Karanpreet combines technology expertise with a deep understanding of hospitality to create exceptional booking experiences."
  };

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Partner Hotels" },
    { number: "50+", label: "Destinations" },
    { number: "24/7", label: "Customer Support" }
  ];

  const values = [
    {
      title: "Excellence in Service",
      description: "We strive to provide unparalleled service quality in every interaction, ensuring our customers receive the best possible experience.",
      icon: "⭐"
    },
    {
      title: "Trust & Transparency",
      description: "Building lasting relationships through honest pricing, clear communication, and reliable service delivery.",
      icon: "🤝"
    },
    {
      title: "Innovation",
      description: "Continuously evolving our platform with cutting-edge technology to make travel booking simple and enjoyable.",
      icon: "💡"
    },
    {
      title: "Global Reach",
      description: "Connecting travelers with exceptional accommodations across the globe, making the world more accessible.",
      icon: "🌍"
    }
  ];

  return (
    <div className="pt-28 md:pt-35">
      {/* Hero Section */}
      <div className="px-4 md:px-16 lg:px-24 xl:px-32 mb-16">
        <div className="text-center">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6">
            About <span className="text-blue-600">Traveleur</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're passionate about connecting travelers with exceptional accommodations worldwide. 
            Our mission is to make every journey memorable through seamless booking experiences and 
            carefully curated hotel partnerships.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="px-4 md:px-16 lg:px-24 xl:px-32 mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2024, Traveleur was born from a simple idea: travel should be about the experience, 
                not the hassle of finding the perfect place to stay. What started as a passionate vision by 
                founder Karanpreet Singh has quickly grown into a trusted platform dedicated to serving travelers worldwide.
              </p>
              <p>
                We believe that the right accommodation can transform a trip from good to unforgettable. 
                That's why we work tirelessly to partner with hotels that share our commitment to quality, 
                comfort, and exceptional guest experiences.
              </p>
              <p>
                Today, we continue to innovate and expand, always keeping our travelers' needs at the heart 
                of everything we do. From boutique hotels to luxury resorts, we're here to help you find 
                your perfect stay.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src={assets.heroImageAbout} 
              alt="Our Story - Luxury Hotel Experience" 
              className="rounded-xl shadow-lg w-full h-80 object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-full h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl shadow-lg items-center justify-center">
              <span className="text-4xl">🏨</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-50 py-16 mb-20">
        <div className="px-4 md:px-16 lg:px-24 xl:px-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="px-4 md:px-16 lg:px-24 xl:px-32 mb-20">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl mb-4">Our Values</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            These core principles guide everything we do and help us deliver exceptional experiences 
            to our customers and partners.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="font-semibold text-xl mb-3 text-gray-800">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Founder Section */}
      <div className="px-4 md:px-16 lg:px-24 xl:px-32 mb-20">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl mb-4">Meet Our Founder</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The visionary leader behind Traveleur, dedicated to revolutionizing the travel booking experience.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="text-center bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img 
              src={founder.image} 
              alt={founder.name}
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-blue-100"
            />
            <h3 className="font-semibold text-2xl mb-2 text-gray-800">{founder.name}</h3>
            <p className="text-blue-600 font-medium mb-4 text-lg">{founder.role}</p>
            <p className="text-gray-600 leading-relaxed">{founder.description}</p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mb-20">
        <div className="px-4 md:px-16 lg:px-24 xl:px-32 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl mb-6">Our Mission</h2>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto opacity-90">
            To democratize travel by providing everyone access to exceptional accommodations worldwide, 
            while supporting local hotel partners and creating unforgettable experiences that bring people 
            together and foster global understanding.
          </p>
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="px-4 md:px-16 lg:px-24 xl:px-32 mb-20">
        <div className="text-center bg-gray-50 rounded-2xl p-12">
          <h2 className="font-playfair text-3xl md:text-4xl mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're planning a weekend getaway or a month-long adventure, we're here to help you 
            find the perfect accommodation for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
              onClick={() => window.location.href = '/rooms'}
            >
              Browse Hotels
            </button>
            <button 
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors duration-300"
              onClick={() => window.location.href = 'mailto:ninjatech565@gmail.com'}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About