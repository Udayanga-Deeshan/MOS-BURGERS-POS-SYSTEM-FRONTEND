import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  ClipboardList,
  Users,
  LogOut,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">MOS Burgers</h2>
      <ul className="menu">
        <li>
          <Link to="/">
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/place-order">
            <ShoppingCart size={20} />
            <span>Orders</span>
          </Link>
        </li>
        <li>
          <Link to="/stock">
            <ClipboardList size={20} />
            <span>Inventory</span>
          </Link>
        </li>
        <li>
          <Link to="/customers">
            <Users size={20} />
            <span>Customers</span>
          </Link>
        </li>
        <li>
          <li>
            <Link to="/logout">
              <LogOut size={20} />
              <span>Logout</span>
            </Link>
          </li>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
