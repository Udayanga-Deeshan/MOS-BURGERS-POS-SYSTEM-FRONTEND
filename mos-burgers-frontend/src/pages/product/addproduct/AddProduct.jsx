import React, { useState } from "react";
import "./AddProduct.css";
import Sidebar from "../../../Components/Sidebar/Sidebar";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="add-product-page">
      <Sidebar />
      <div className="add-product-container">
        <h2>Add a New Product</h2>
        <form>
          <div className="input-row">
            <div className="add-product-input-group">
              <label>Item Name:</label>
              <input type="text" required className="product-data" />
            </div>
            <div className="add-product-input-group">
              <label>Category:</label>
              <select
              className="product-data"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Burger">Burger</option>
                <option value="Fries">Fries</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>
          </div>

          <div className="input-row">
            <div className="add-product-input-group">
              <label>Price:</label>
              <input type="number" step="0.01" required className="product-data" />
            </div>
            <div className="add-product-input-group">
              <label>Discount:</label>
              <input type="number" step="0.01" className="product-data" />
            </div>
          </div>

          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required className="product-data"/>

          {image && (
            <div className="image-preview">
              <h4>Image Preview:</h4>
              <img src={image} alt="Product Preview" className="preview-image" />
            </div>
          )}

          <button type="submit" className="btn-add-product">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
