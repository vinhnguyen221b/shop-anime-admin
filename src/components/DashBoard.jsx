import React from "react";
import Welcome from "./Welcome";
import Categories from "./Categories";
import Products from "./Products";
import Users from "./Users";
import SideBar from "./commons/SideBar";
import NavBar from "./commons/NavBar";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Review from "./Review";
import ReviewDetail from "./ReviewDetail";
import Order from "./Order";

// import UserContext from "../context/userContext";
function DashBoard(props) {
  return (
    <div id="wrapper" className="wrapper d-flex">
      <SideBar />
      <div id="page-content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/categories" component={Categories} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/products" component={Products} />
          <Route path="/reviews/:id" component={ReviewDetail} />
          <Route path="/reviews" component={Review} />
          <Route path="/orders" component={Order} />
          <Route path="/welcome" component={Welcome} />
          <Redirect from="/" to="/welcome" />
        </Switch>
      </div>
    </div>
  );
}

export default DashBoard;
