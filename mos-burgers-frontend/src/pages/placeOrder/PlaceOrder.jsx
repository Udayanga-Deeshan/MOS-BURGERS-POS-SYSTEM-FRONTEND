import React, { useState } from "react";
import "./PlaceOrder.css";
import Sidebar from "../../Components/Sidebar/Sidebar";

const PlaceOrder = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Cheese Burger", category: "Burger", price: 500.99, image: "/src/assets/Burgers/burger1.jpg" },
    { id: 2, name: "Chicken Burger", category: "Burger", price: 600.99, image: "/src/assets/Burgers/burger4.jpg" },
    { id: 2, name: "Chicken Burger", category: "Burger", price: 600.99, image: "/src/assets/Burgers/burger4.jpg" },
    { id: 2, name: "Chicken Burger", category: "Burger", price: 600.99, image: "/src/assets/Burgers/burger4.jpg" },
    { id: 2, name: "Chicken Burger", category: "Burger", price: 600.99, image: "/src/assets/Burgers/burger4.jpg" },
    { id: 2, name: "Chicken Burger", category: "Burger", price: 600.99, image: "/src/assets/Burgers/burger4.jpg" },
    { id: 2, name: "Chicken Burger", category: "Burger", price: 600.99, image: "/src/assets/Burgers/burger4.jpg" },
  ]);
  
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [amountGiven, setAmountGiven] = useState("");

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const balance = amountGiven ? amountGiven - totalAmount : 0;

  return (
    <div className="pos-page">
      <Sidebar />
      <div className="products-container">
        <h2>Available Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: Rs.{product.price.toFixed(2)}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-container">
        <h2>Cart</h2>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <span>{item.name}</span>
              <span>Rs.{(item.price * item.qty).toFixed(2)}</span>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
        <input
          type="number"
          placeholder="Amount Given"
          value={amountGiven}
          onChange={(e) => setAmountGiven(Number(e.target.value))}
        />
        <h3>Total: Rs.{totalAmount.toFixed(2)}</h3>
        <h3>Balance: Rs.{balance.toFixed(2)}</h3>
        <button className="place-order-button">Place Order</button>
      </div>
    </div>
  );
};

export default PlaceOrder;
