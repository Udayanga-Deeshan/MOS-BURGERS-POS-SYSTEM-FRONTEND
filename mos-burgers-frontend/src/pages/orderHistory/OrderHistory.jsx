import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderHistory.css';
import Sidebar from '../../Components/Sidebar/Sidebar';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/order/all');
      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <div className="order-history-container">
      <Sidebar />
      <div className="order-history-content">
        <h2>Order History</h2>
        <div className="order-cards">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>Order ID: {order.id}</h3>
              <p><strong>Customer:</strong> {order.customerName}</p>
              <p><strong>Total:</strong> Rs. {order.totalAmount.toFixed(2)}</p>
              <p><strong>Date:</strong> {formatDate(order.orderDate)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
