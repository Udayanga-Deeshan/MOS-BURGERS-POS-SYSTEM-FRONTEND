import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';
import { Users, Box, ShoppingCart } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const [counts, setCounts] = useState({
        customers: 0,
        products: 0,
        orders: 0,
      });
    
      useEffect(() => {
        axios.get('http://localhost:8080/api/dashboard/counts')
          .then(res => setCounts(res.data))
          .catch(err => console.error("Failed to fetch counts", err));
      }, []);
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <h1>Dashboard</h1>
        <div className="cards-grid">
          <div className="dashboard-card">
            <Users className="card-icon" />
            <h2>Customers</h2>
            <p>{counts.customers}</p>
          </div>
          <div className="dashboard-card">
            <Box className="card-icon" />
            <h2>Products</h2>
            <p>{counts.products}</p>
          </div>
          <div className="dashboard-card">
            <ShoppingCart className="card-icon" />
            <h2>Orders</h2>
            <p>{counts.orders}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
