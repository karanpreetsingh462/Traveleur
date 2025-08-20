// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";
// import {useNavigate} from "react-router-dom";
// import {useAuth, useUser} from "@clerk/clerk-react";
// import {toast} from 'react-hot-toast'

// axios.defaults.baseURL= import.meta.env.VITE_BACKEND_URL;

// const AppContext = createContext();

// export const AppProvider = ({children})=>{
//     const currency= import.meta.env.VITE_CURRENCY || "$" ;
//     const navigate = useNavigate();
//     const {user} = useUser();
//     const {getToken} = useAuth();

//     const [isOwner, setIsowner]= useState(false)
//     const [showHotelReg, setShowHotelReg]= useState(false)
//     const [searchedCities, setSearchedCities] = useState([])
//     const [rooms, setRooms] = useState([])

//     const fetchRooms = async()=>{
//         try {
//             const {data}= await axios.get('/api/rooms')
//             if(data.success){
//                 setRooms(data.rooms)
//             }
//             else{
//                 toast.error(data.message)
//             }
//         } catch (error) {
//                 toast.error(error.message)
//         }
//     }

//     const fetchUser= async()=>{
//         try {
//             const {data}= await axios.get('/api/user', {headers: {Authorization: `Bearer ${await getToken()}`}})

//             if(data.success){
//                 setIsowner(data.role ==="hotelOwner");
//                 setSearchedCities(data.recentSearchedCities)
//             }
//             else{
//                 // retry fetching user details after 5 seconds
//                 setTimeout(()=>{
//                     fetchUser()
//                 },5000)
//             }

//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     useEffect(()=>{
//         if(user){
//             fetchUser();
//         }
//     }, [user])

//     useEffect(()=>{
//         fetchRooms();
//     }, [])

//     const value={   
//         currency, navigate, user, getToken, isOwner, setIsowner, axios, showHotelReg, setShowHotelReg, searchedCities, setSearchedCities, rooms, setRooms
//     }
//     return(
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     )
// }
// export const useAppContext = () => useContext(AppContext);

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {useAuth, useUser} from "@clerk/clerk-react";
import {toast} from 'react-hot-toast'

axios.defaults.baseURL= import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({children})=>{
    const currency= import.meta.env.VITE_CURRENCY || "$" ;
    const navigate = useNavigate();
    const {user} = useUser();
    const {getToken} = useAuth();

    const [isOwner, setIsowner]= useState(false)
    const [showHotelReg, setShowHotelReg]= useState(false)
    const [searchedCities, setSearchedCities] = useState([])
    const [rooms, setRooms] = useState([])
    const [cart, setCart] = useState([])

    const fetchRooms = async()=>{
        try {
            const {data}= await axios.get('/api/rooms')
            if(data.success){
                setRooms(data.rooms || [])
            }
            else{
                toast.error(data.message || 'Failed to fetch rooms')
                setRooms([])
            }
        } catch (error) {
            toast.error(error.message || 'Network error while fetching rooms')
            setRooms([])
        }
    }

    const fetchUser= async()=>{
        try {
            console.log('Fetching user data...');
            const {data}= await axios.get('/api/user', {headers: {Authorization: `Bearer ${await getToken()}`}})

            if(data.success){
                console.log('✅ User data fetched successfully:', data);
                setIsowner(data.role === "hotelOwner");
                setSearchedCities(data.recentSearchedCities || [])
            }
            else{
                console.log('Failed to fetch user data:', data.message);
                // If user creation failed, show a helpful message
                if (data.message.includes('Failed to create user record')) {
                    toast.error('Setting up your account... Please refresh the page.');
                }
            }

        } catch (error) {
            console.error('Error fetching user data:', error.message)
            // Only show error if it's a network error, not authentication issues
            if (error.response && error.response.status !== 401) {
                toast.error('Failed to fetch user data')
            }
        }
    }

    // Cart functions
    const addToCart = (experience) => {
        if (!user) {
            toast.error('Please login to add to cart');
            return false;
        }
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === experience.id);
        if (existingItem) {
            toast.error('This experience is already in your cart!');
            return false;
        }
        
        const cartItem = {
            id: experience.id,
            title: experience.title,
            description: experience.description,
            category: experience.category,
            duration: experience.duration,
            price: experience.price,
            location: experience.location,
            rating: experience.rating,
            image: experience.image,
            addedAt: new Date().toISOString()
        };
        
        setCart(prev => [...prev, cartItem]);
        toast.success(`${experience.title} added to cart!`, {
            icon: '🛒'
        });
        console.log('🛒 Added to cart:', cartItem);
        return true;
    };

    const removeFromCart = (experienceId) => {
        setCart(prev => prev.filter(item => item.id !== experienceId));
        toast.success('Item removed from cart', {
            icon: '🗑️'
        });
        console.log('🗑️ Removed from cart:', experienceId);
    };

    const clearCart = () => {
        setCart([]);
        console.log('🗑️ Cart cleared');
    };

    useEffect(()=>{
        fetchRooms();
    }, [])

    useEffect(()=> {
        if(!user) {
            // Clear cart when user logs out
            setCart([]);
        }
    }, [user])

    const value={   
        currency, navigate, user, getToken, isOwner, setIsowner, axios, showHotelReg, setShowHotelReg, searchedCities, setSearchedCities, rooms, setRooms, fetchUser,
        cart, addToCart, removeFromCart, clearCart
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => useContext(AppContext);

//     useEffect(()=>{
//         if(user){
//             fetchUser();
//         }
//     }, [user])

//     useEffect(()=>{
//         fetchRooms();
//     }, [])

//     const value={   
//         currency, navigate, user, getToken, isOwner, setIsowner, axios, showHotelReg, setShowHotelReg, searchedCities, setSearchedCities, rooms, setRooms, fetchUser
//     }
//     return(
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     )
// }
// export const useAppContext = () => useContext(AppContext);
