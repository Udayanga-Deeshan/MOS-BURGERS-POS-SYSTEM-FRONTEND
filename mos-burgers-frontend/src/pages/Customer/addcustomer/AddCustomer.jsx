import React, { useState } from "react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import "./AddCustomer.css";
import axios from "axios";

const AddCustomer = () => {
  const [customerData, setCustomerData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const response = await axios.post(
        "http://localhost:8080/api/customer/add",
        customerData
      );

      if (response.status === 200 || response.status === 201) {
        alert("Customer added successfully!");
        resetForm();
       
      } else {
        alert("Failed to add customer.");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("There was an error adding the customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCustomerData({
      name: "",
      contactNumber: "",
      email: "",
      address: "",
    });
  };

  return (
    <div className="add-customer-page">
      <Sidebar />
      <div className="add-customer-container">
        <h2>Add New Customer</h2>

        <form onSubmit={handleSubmit}>
          <div className="add-customer-input-group">
            <label>Customer Name:</label>
            <input
              type="text"
              name="name"
              value={customerData.name}
              onChange={handleInputChange}
              className="customer-data"
              required
            />
          </div>

          <div className="add-customer-input-group">
            <label>Phone:</label>
            <input
              type="text"
              name="contactNumber"
              value={customerData.contactNumber}
              onChange={handleInputChange}
              className="customer-data"
              required
            />
          </div>

          <div className="add-customer-input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={customerData.email}
              onChange={handleInputChange}
              className="customer-data"
            />
          </div>

          <div className="add-customer-input-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={customerData.address}
              onChange={handleInputChange}
              className="customer-data"
            />
          </div>

          <button
            type="submit"
            className="btn-add-customer"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Customer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
