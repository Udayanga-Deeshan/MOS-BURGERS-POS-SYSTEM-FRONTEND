import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./CustomerManagement.css";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setCustomers([
      {
        id: 1,
        name: "Sasmitha",
        address:"234/2 Powerhouse",
        phone: "1234567890",
        email: "sasmitha@gmail.com",
      },
      {
        id: 2,
        name: "Jane Smith",
        address:"434/2 Ganemulla",
        phone: "9876543210",
        email: "jane@gmail.com",
      },
    ]);
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="customer-management-page">
      <Sidebar />
      <div className="customer-management-container">
        <div className="top-bar">
          <button className="btn-add-customer">+ Add Customer</button>
          <input
            type="text"
            placeholder="Search by Name"
            className="search-input"
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
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
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                </tr>
              ))}

              {filteredCustomers.length ==0 &&(
                  <tr>
                  <td colSpan="4" className="no-data">
                    No customers found
                  </td>
                </tr>
              )}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
