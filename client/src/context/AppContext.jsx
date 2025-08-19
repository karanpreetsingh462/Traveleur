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

    useEffect(()=>{
        if(user){
            fetchUser();
        }
    }, [user])

    useEffect(()=>{
        fetchRooms();
    }, [])

    const value={   
        currency, navigate, user, getToken, isOwner, setIsowner, axios, showHotelReg, setShowHotelReg, searchedCities, setSearchedCities, rooms, setRooms
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => useContext(AppContext);
