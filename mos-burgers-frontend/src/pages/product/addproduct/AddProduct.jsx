import React, { useState } from "react";
import axios from "axios"; 
import "./AddProduct.css";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import imageCompression from "browser-image-compression";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const[description,setDescription] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const options = {
        maxSizeMB: 1, 
        maxWidthOrHeight: 800, 
        useWebWorker: true,
      };
  
      try {
        const compressedFile = await imageCompression(file, options);
        setImage(compressedFile);
      } catch (error) {
        console.error("Image compression failed:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!productName || !category || !price || !image) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      
      const formData = new FormData();
      formData.append("file", image); 

      
      const imageUploadResponse = await axios.post("http://localhost:8080/api/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      
      if (imageUploadResponse.status !== 200) {
        throw new Error("Image upload failed");
      }

      
      const imageUrl = imageUploadResponse.data; 
      console.log(imageUrl);


      
      const productData = {
        itemName: productName,
        category: category.toUpperCase(),
        price: parseFloat(price),
        imageURL: imageUrl,
        description:description
      };

      
      const productResponse = await axios.post("http://localhost:8080/api/stock/add", productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (productResponse.status === 200 || productResponse.status === 201) {
        alert("Product added successfully!");
        setProductName("");
        setCategory("");
        setPrice("");
        setDescription("");
        setImage(null);
      } else {
        throw new Error("Failed to save product data to MySQL.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <Sidebar />
      <div className="add-product-container">
        <h2>Add a New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="add-product-input-group">
              <label>Item Name:</label>
              <input
                type="text"
                required
                className="product-data"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="add-product-input-group">
              <label>Category:</label>
              <select
                className="product-data-cmb"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Burger">Burger</option>
                <option value="Submarine">Submarine</option>
                <option value="Fries">Fries</option>
                <option value="Beverages">Beverage</option>
              </select>
            </div>
          </div>

          <div className="input-row">

          <div className="add-product-price">
              <label>Description:</label>
              <input
                type="text"
                required
                className="product-data"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="add-product-price">
              <label>Price:</label>
              <input
                type="number"
                step="0.01"
                required
                className="product-data"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

           
          </div>

          <label>Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="product-image-data"
          />

          {image && (
            <div className="image-preview">
              <h4>Image Preview:</h4>
              <img
                src={URL.createObjectURL(image)}
                alt="Product Preview"
                className="preview-image"
              />
            </div>
          )}

          <button type="submit" className="btn-add-product" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
