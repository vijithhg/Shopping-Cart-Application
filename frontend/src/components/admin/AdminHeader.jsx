import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const AdminHeader = () => {

  const logoutHandler = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    window.location.href='/'
  }

  const cartItemsCount = useSelector(state=>state.cart.cartItemsCount)
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Shopping Cart
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/users">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/orders">
                Orders
              </Link>
            </li>
            <li>
            <Link className="nav-link" onClick={logoutHandler}>
                Logout
              </Link>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;