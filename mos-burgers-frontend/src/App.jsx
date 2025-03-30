import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Home/Home";
import Inventory from "./Components/Inventory/Inventory";
import CustomerManagement from "./pages/Customer/CustomerManagement";
import Login from "./pages/Login/Login";
import AddProduct from "./pages/product/addproduct/AddProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/stock" element={<Inventory />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/add-product" element={<AddProduct/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
