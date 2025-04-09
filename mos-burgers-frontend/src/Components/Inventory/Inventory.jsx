import React, { useEffect, useState } from "react";
import "./Inventory.css";
import Sidebar from '../Sidebar/Sidebar'
import { Link } from "react-router-dom";
import axios from "axios";


const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/api/stock/All")
    .then((response)=>{
      setProducts(response.data)
    })
    .catch((error)=>{
      console.error("Error fetching products:", error);
    })
  },[])

  return (
    <div className="inventory-page">
        <Sidebar/>
      <div className="inventory-container">
        <Link to="/add-product" style={{textDecoration:"none"}}>
        <button className="add-product-btn">Add Product</button>
        </Link>
        
        <div className="product-list">
          {products.map((product) => (
            <div key={product.itemId} className="product-card">
              <img src={product.imageURL} alt={product.itemName} className="product-image" />
              <h3>{product.itemName}</h3>
              <p>Category: {product.category}</p>
              <p>Price: Rs.{product.price.toFixed(2)}</p>
              <div className="card-buttons">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
