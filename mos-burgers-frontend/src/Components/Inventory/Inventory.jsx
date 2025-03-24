import React from 'react'
import './Inventory.css'
import Sidebar from '../Sidebar/Sidebar'


const Inventory = () => {
  return (
    <div className='container'>
        <div className="sidebar">
        <Sidebar/>
        </div>
        

        <div className="inventory-content">
            <h1>inventory</h1>
        </div>
      
    </div>
  )
}

export default Inventory
