import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./CustomerManagement.css";
import { Link } from "react-router-dom";
import axios from "axios";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedCustomer, setUpdatedCustomer] = useState({
    id: "",
    name: "",
    address: "",
    contactNumber: "",
    email: "",
  });


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/customer/all");
        setCustomers(response.data);  
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const handleEditClick = (customer) => {
    setUpdatedCustomer({
      id: customer.id,
      name: customer.name,
      address: customer.address,
      contactNumber: customer.contactNumber,
      email: customer.email,
    });
    setSelectedCustomer(customer);
    setShowModal(true); 
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8080/api/customer/update", updatedCustomer);
      const updatedCustomers = customers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      );
      setCustomers(updatedCustomers); 
      alert("customer Updated Success")
      setShowModal(false); 
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  
  const closeModal = () => {
    setShowModal(false);
    setSelectedCustomer(null); 
  };

  return (
    <div className="customer-management-page">
      <Sidebar />
      <div className="customer-management-container">
        <div className="top-bar">
          <Link to={"/customer/add-customer"} style={{ textDecoration: "none" }}>
            <button className="btn-add-customer">+ Add Customer</button>
          </Link>

          <input
            type="text"
            placeholder="Search by Name"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="customer-table-container">
          <table className="customer-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.contactNumber}</td>
                  <td>{customer.email}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => handleEditClick(customer)}
                      >
                        Edit
                      </button>
                      <button className="btn-delete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="6" className="no-data">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        
        {showModal && (
          <div
            className="modal fade show custom-modal-top"
            id="editCustomerModal"
            tabIndex="-1"
            aria-labelledby="editCustomerModalLabel"
            aria-hidden="false"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editCustomerModalLabel">
                    Edit Customer
                  </h5>
                  
                  <span
                className="close-modal-icon"
                 onClick={closeModal}
              >
                &times;
              </span>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={updatedCustomer.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={updatedCustomer.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="contactNumber" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="contactNumber"
                        name="contactNumber"
                        value={updatedCustomer.contactNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={updatedCustomer.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="modal-footer">
                      <button type="submit" >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;








