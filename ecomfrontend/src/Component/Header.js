import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/Appcontext";

const Header = () => {
  const { getCartTotalItems } = useContext(AppContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          E-Commerce Store
        </Link>

        <div className="navbar-nav ms-auto">
          <Link
            className="nav-link position-relative text-white fw-bold"
            to="/cart"
          >
            <i className="fas fa-shopping-cart fa-lg "></i> Cart
            {getCartTotalItems() > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getCartTotalItems()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
