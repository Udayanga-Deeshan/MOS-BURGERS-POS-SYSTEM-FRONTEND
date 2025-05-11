import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Home/Home";
import Inventory from "./Components/Inventory/Inventory";
import CustomerManagement from "./pages/Customer/CustomerManagement";
import Login from "./pages/Login/Login";
import AddProduct from "./pages/product/addproduct/AddProduct";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import AddCustomer from "./pages/Customer/addcustomer/AddCustomer";
import Dashboard from "./Components/dashboard/Dashboard";
import OrderHistory from "./pages/orderHistory/OrderHistory";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/home" element={<Login />} />
          <Route path="/stock" element={<Inventory />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/add-product" element={<AddProduct/>}/>
          <Route path="/place-order" element={<PlaceOrder/>}/>
          <Route path="order-history" element={<OrderHistory/>}/>
          <Route path="/customer/add-customer" element={<AddCustomer/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
