import React from "react";
import { Link } from "react-router-dom";

function SideBar(props) {
  return (
    <div id="sidebar-wrapper">
      <div className="sidebar-heading">Anime Store</div>
      <div className="list-group list-group-flush">
        <Link
          to="/"
          className="list-group-item list-group-item-action bg-light"
        >
          Dashboard
        </Link>
        <Link
          to="/users"
          className="list-group-item list-group-item-action bg-light"
        >
          Users
        </Link>
        <Link
          to="categories"
          className="list-group-item list-group-item-action bg-light"
        >
          Categories
        </Link>
        <Link
          to="/products"
          className="list-group-item list-group-item-action bg-light"
        >
          Products
        </Link>
        <Link
          to="/reviews"
          className="list-group-item list-group-item-action bg-light"
        >
          Reviews
        </Link>
        {/* <Link
          to="/orders"
          className="list-group-item list-group-item-action bg-light"
        >
          Orders
        </Link> */}
      </div>
    </div>
  );
}

export default SideBar;
