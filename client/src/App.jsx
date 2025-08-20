import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'
import HotelReg from './pages/HotelReg'
import About from './pages/About'
import Experience from './pages/Experience'
import FloatingCart from './components/FloatingCart'
import Layout from './pages/hotelOwner/Layout'
import Dashboard from './pages/hotelOwner/Dashboard'
import AddRoom from './pages/hotelOwner/AddRoom'
import ListRoom from './pages/hotelOwner/ListRoom'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {

  const isOwnerPath=useLocation().pathname.includes("owner")
  const {showHotelReg}= useAppContext();

  return (
    <div>
    <Toaster/>
    {!isOwnerPath&&<Navbar/>}
    {showHotelReg&&<HotelReg/>}
    {false && <HotelReg/>}
    <div className='min-h-[70vh]'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/rooms' element={<AllRooms/>}/>
        <Route path='/rooms/:id' element={<RoomDetails/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/experience' element={<Experience/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/owner' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-room' element={<AddRoom/>}/>
          <Route path='list-room' element={<ListRoom/>}/>
        </Route>
      </Routes>
    </div>
    {!isOwnerPath && <FloatingCart/>}
    <Footer/>
    </div>
  )
}

export default App