import React from "react";
import "./Home.css";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="land-page-body">
        <header className="land-page-header">
          <div className="land-page-logo">MOS BURGERS</div>
          <nav>
            <ul className="land-page-nav-links">
              <li>
                <p onClick={() => navigate("/home")}>Home</p>
              </li>

              <li>
                <p onClick={() => navigate("/customers")}>Manage Customers</p>
              </li>
              <li>
                <p onClick={() => navigate("/stock")}>Inventory</p>
              </li>
              
              

              <li>
                <p onClick={() => navigate("/placeOrder")}>Order Now</p>
              </li>
            </ul>
          </nav>
          <button
            className="land-page-btn-cashier"
            onClick={() => {
              navigate("/");
            }}
          >
            Logout
          </button>
        </header>

        <section className="land-page-hero">
          <div className="land-page-hero-content">
            <h1 className="land-page-hero-text">BIG TASTE. ZERO COMPROMISE</h1>
            <p className="land-page-hero-subtext">
              Taste the difference. Fresh, handcrafted, and made just for you.
            </p>

            



          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
