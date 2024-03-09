import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Navbar from './Navbar'
import LogIn from './Components/LogIn'
import React, { useEffect } from 'react';
import Footer from './Components/Footer'


// https://nazishop.onrender.com/

function App() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }) // Add empty dependency array to ensure useEffect runs only once

  return (
    <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/LogIn' element={<LogIn />} />
          <Route path='/home/:userName' element={<Home />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
