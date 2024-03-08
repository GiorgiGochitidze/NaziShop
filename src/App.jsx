import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Navbar from './Navbar'

// https://nazishop.onrender.com/

function App() {

  return (
    <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
    </>
  )
}

export default App
