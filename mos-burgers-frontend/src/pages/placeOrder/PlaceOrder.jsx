import React, { useEffect, useState } from "react";
import "./PlaceOrder.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PlaceOrder = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [amountGiven, setAmountGiven] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");

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

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.itemId !== itemId));
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const balance = amountGiven ? amountGiven - totalAmount : 0;

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category.toUpperCase() === selectedCategory.toUpperCase()
        );



  const generateBillPDF = (orderData) => {
    const doc = new jsPDF();
    const date = new Date().toLocaleString();
  
    
    doc.setFontSize(18);
    doc.text("MOS Burgers - Invoice", 70, 20);
  
    
    doc.setFontSize(12);
    doc.text(`Customer Name: ${orderData.customerName}`, 14, 35);
    doc.text(`Date: ${date}`, 14, 43);
  
    
    const tableStartY = 50;
    doc.text("#", 14, tableStartY);
    doc.text("Item", 24, tableStartY);
    doc.text("Qty", 100, tableStartY);
    doc.text("Unit Price", 120, tableStartY);
    doc.text("Total", 160, tableStartY);
  
    
    let rowHeight = 8;
    let currentY = tableStartY + rowHeight;
  
    orderData.orderDetails.forEach((item, index) => {
      doc.text(`${index + 1}`, 14, currentY);
      doc.text(item.foodItem.itemName, 24, currentY);
      doc.text(`${item.qty}`, 100, currentY);
      doc.text(`Rs.${item.foodItem.price.toFixed(2)}`, 120, currentY);
      doc.text(`Rs.${item.total.toFixed(2)}`, 160, currentY);
      currentY += rowHeight;
    });
  
    
    doc.setFontSize(12);
    const finalY = currentY + 10;
  
    const pageWidth = doc.internal.pageSize.getWidth();
    const rightAlignX = pageWidth - 14; 
  
    doc.text(`Total: Rs.${orderData.totalAmount.toFixed(2)}`, rightAlignX, finalY, { align: 'right' });
    doc.text(`Paid: Rs.${orderData.receivedAmount.toFixed(2)}`, rightAlignX, finalY + 8, { align: 'right' });
    doc.text(`Balance: Rs.${(orderData.receivedAmount - orderData.totalAmount).toFixed(2)}`, rightAlignX, finalY + 16, { align: 'right' });
    doc.save("invoice.pdf");
  };
  
  const handlePlaceOrder = async () => {
    if (!customerName || cart.length === 0 || amountGiven < totalAmount) {
      setError("Please fill all fields correctly and ensure payment is enough.");
      return;
    }

    const orderPayload = {
      customerName,
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      receivedAmount: parseFloat(amountGiven),
      orderDetails: cart.map((item) => ({
        foodItem: {
          itemId: item.itemId,
          itemName: item.itemName,
          category: item.category,
          price: item.price,
          imageURL: item.imageURL,
        },
        qty: item.qty,
        total: parseFloat((item.qty * item.price).toFixed(2)),
      })),
    };

    try {
      await axios.post("http://localhost:8080/api/order/place-order", orderPayload);
      generateBillPDF(orderPayload);
      setOrderPlaced(true);
      setError("");

      // Reset form
      setCart([]);
      setCustomerName("");
      setPhone("");
      setAmountGiven("");
      setTimeout(() => setOrderPlaced(false), 4000);
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Failed to place the order. Try again.");
    }
  };

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
          onChange={(e) => {
            setCustomerName(e.target.value);
            setError("");
          }}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError("");
          }}
        />
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.itemId} className="cart-item">
              <img
                src={item.imageURL}
                alt={item.itemName}
                className="cart-item-image"
              />
              <span>{item.itemName}</span>
              <span>Rs.{(item.price * item.qty).toFixed(2)}</span>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.itemId, -1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQuantity(item.itemId, 1)}>+</button>
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
          onChange={(e) => {
            setAmountGiven(Number(e.target.value));
            setError("");
          }}
        />
        <h3>Total: Rs.{totalAmount.toFixed(2)}</h3>
        <h3>Balance: Rs.{balance.toFixed(2)}</h3>
        {error && <p className="error-message">{error}</p>}
        {orderPlaced && <p className="success-message">Order placed & bill downloaded successfully!</p>}
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
