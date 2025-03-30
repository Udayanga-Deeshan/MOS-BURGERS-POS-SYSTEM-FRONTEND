import React, { useState } from "react";
import "./Inventory.css";
import Sidebar from '../Sidebar/Sidebar'


const Inventory = () => {
  const [products, setProducts] = useState([
    { itemId: 1, itemName: "Cheese Burger", category: "Burger", price: 5.99, itemDiscount: 0.5, imageURL: "/src/assets/Burgers/burger1.jpg" },
    { itemId: 2, itemName: "Chicken Burger", category: "Burger", price: 6.99, itemDiscount: 1.0, imageURL: "/src/assets/Burgers/burger4.jpg" },
    { itemId: 2, itemName: "Chicken Burger", category: "Burger", price: 6.99, itemDiscount: 1.0, imageURL: "/src/assets/Burgers/burger4.jpg" },
    { itemId: 2, itemName: "Chicken Burger", category: "Burger", price: 6.99, itemDiscount: 1.0, imageURL: "/src/assets/Burgers/burger4.jpg" },
    { itemId: 2, itemName: "Chicken Burger", category: "Burger", price: 6.99, itemDiscount: 1.0, imageURL: "/src/assets/Fries/Fries1.jpg" },
    { itemId: 2, itemName: "Chicken Burger", category: "Burger", price: 6.99, itemDiscount: 1.0, imageURL: "/src/assets/Fries/Fries1.jpg" },
    { itemId: 2, itemName: "Chicken Burger", category: "Burger", price: 6.99, itemDiscount: 1.0, imageURL: "/src/assets/Fries/Fries1.jpg" },
    { itemId: 2, itemName: "Chicken Burger", category: "Burger", price: 6.99, itemDiscount: 1.0, imageURL: "/src/assets/Burgers/burger5.jpg" },
    { itemId: 2, itemName: "Chicken Burger", category: "Burger", price: 6.99, itemDiscount: 1.0, imageURL: "/src/assets/Burgers/burger5.jpg" },
    { itemId: 2, itemName: "Chicken Burger", category: "Burger", price: 6.99, itemDiscount: 1.0, imageURL: "/src/assets/Burgers/burger5.jpg" },
  ]);

  return (
    <div className="inventory-page">
        <Sidebar/>
      <div className="inventory-container">
        <button className="add-product-btn">Add Product</button>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.itemId} className="product-card">
              <img src={product.imageURL} alt={product.itemName} className="product-image" />
              <h3>{product.itemName}</h3>
              <p>Category: {product.category}</p>
              <p>Price: Rs.{product.price.toFixed(2)}</p>
              <p>Discount: Rs.{product.itemDiscount.toFixed(2)}</p>
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
