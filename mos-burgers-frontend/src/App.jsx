import React from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './Components/Home/Home'
import Inventory from './Components/Inventory/Inventory';
import CustomerManagement from './pages/Customer/CustomerManagement';

function App() {
  

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/stock" element={<Inventory/>}/>
        <Route path="/customers" element={<CustomerManagement/>}/>
        </Routes>

        
      </BrowserRouter>
    </div>
  )
}

export default App
