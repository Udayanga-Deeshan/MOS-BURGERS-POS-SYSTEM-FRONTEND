import React, { useEffect, useState } from "react";
import "./PlaceOrder.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";

const PlaceOrder = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [amountGiven, setAmountGiven] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/stock/All")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.itemId === product.itemId
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.itemId === product.itemId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const updateQuantity = (itemId, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.itemId === itemId
            ? { ...item, qty: Math.max(1, item.qty + change) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const balance = amountGiven ? amountGiven - totalAmount : 0;
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.itemId !== itemId));
  };
  

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category.toUpperCase() === selectedCategory.toUpperCase()
        );

  return (
    <div className="pos-page">
      <Sidebar />
      <div className="products-container">
        <h2>Available Products</h2>
        <div className="category-filters">
          {["All", "Burger", "Submarine", "Beverages"].map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.itemId} className="product-card">
              <img
                src={product.imageURL}
                alt={product.itemName}
                className="product-image"
              />
              <h3>{product.itemName}</h3>
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
              <img
                src={item.imageURL}
                alt={item.name}
                className="cart-item-image"
              />
              <span>{item.name}</span>
              <span>Rs.{(item.price * item.qty).toFixed(2)}</span>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.itemId, -1)}>
                  -
                </button>
                <span>{item.qty}</span>
                <button onClick={() => updateQuantity(item.itemId, 1)}>
                  +
                </button>
              </div>
              <span
                className="remove-item-icon"
                onClick={() => removeFromCart(item.itemId)}
              >
                &times;
              </span>
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
        <button className="place-order-btn">Place Order</button>
      </div>
    </div>
  );
};

export default PlaceOrder;
