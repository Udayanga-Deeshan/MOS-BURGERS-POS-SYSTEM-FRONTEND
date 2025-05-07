import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';
import { Users, Box, ShoppingCart } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <h1>Dashboard</h1>
        <div className="cards-grid">
          <div className="dashboard-card">
            <Users className="card-icon" />
            <h2>Customers</h2>
            <p>120</p>
          </div>
          <div className="dashboard-card">
            <Box className="card-icon" />
            <h2>Products</h2>
            <p>58</p>
          </div>
          <div className="dashboard-card">
            <ShoppingCart className="card-icon" />
            <h2>Orders</h2>
            <p>245</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
