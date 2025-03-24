import React from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './Components/Home/Home'
import Inventory from './Components/Inventory/Inventory';

function App() {
  

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/stock" element={<Inventory/>}/>
        </Routes>

        
      </BrowserRouter>
    </div>
  )
}

export default App
