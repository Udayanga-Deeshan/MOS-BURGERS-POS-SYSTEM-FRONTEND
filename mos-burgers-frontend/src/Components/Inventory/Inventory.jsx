import React, { useEffect, useState } from "react";
import "./Inventory.css";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:8080/api/stock/All")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  const handleUpdate = () => {
    axios
      .put("http://localhost:8080/api/stock/update", selectedProduct)
      .then((response) => {
        fetchProducts(); 
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div className="inventory-page">
      <Sidebar />
      <div className="inventory-container">
        <Link to="/add-product" style={{ textDecoration: "none" }}>
          <button className="add-product-btn">Add Product</button>
        </Link>

        <div className="product-list">
          {products.map((product) => (
            <div key={product.itemId} className="product-card">
              <img
                src={product.imageURL}
                alt={product.itemName}
                className="product-image"
              />
              <h3>{product.itemName}</h3>
              <p>{product.description}</p>
              <h4 >Rs.{product.price.toFixed(2)}</h4>
              <div className="card-buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </button>
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          style={{ fontWeight: "bold", color: "#e6b800", background: "black" }}
        >
          Update Product Details
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="dense"
            label="Item Name"
            name="itemName"
            value={selectedProduct?.itemName || ""}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            select
            label="Category"
            name="category"
            value={selectedProduct?.category || ""}
            onChange={handleChange}
            fullWidth
            required
          >
            <MenuItem value="BURGER">BURGER</MenuItem>
            <MenuItem value="SUBMARINE">SUBMARINE</MenuItem>
            <MenuItem value="FRIES">FRIES</MenuItem>
            <MenuItem value="BEVERAGES">BEVERAGES</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Desciption"
            name="description"
            value={selectedProduct?.description || ""}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Price (Rs)"
            name="price"
            type="number"
            value={selectedProduct?.price || ""}
            onChange={handleChange}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="warning" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Inventory;
