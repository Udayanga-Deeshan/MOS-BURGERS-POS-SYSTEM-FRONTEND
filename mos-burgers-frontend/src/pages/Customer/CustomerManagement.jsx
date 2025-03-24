import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'


const CustomerManagement = () => {
  return (
    <div className='customer-container'>
        <div className="sidebar">
            <Sidebar/>
        </div>
      <div className="customer-content">
       <h1>Customer details</h1> 
      </div>
    </div>
  )
}

export default CustomerManagement
