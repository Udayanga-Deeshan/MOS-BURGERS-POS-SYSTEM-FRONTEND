import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="login-container">
      <div className="login-box">
        {isRegistering ? (
          <>
            <h2>Register Cashier</h2>
            <form>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter full name" required />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Enter email" required />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" placeholder="Enter password" required />
              </div>
              <button type="submit" className="btn-login">Register</button>
            </form>
            <p onClick={() => setIsRegistering(false)} className="toggle-form">Already have an account? Login</p>
          </>
        ) : (
          <>
            <h2>MOS Burgers</h2>
            <form>
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" required />
              </div>
              <button type="submit" className="btn-login">Login</button>
            </form>
            <p onClick={() => setIsRegistering(true)} className="toggle-form">Don't have an account? Register</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
