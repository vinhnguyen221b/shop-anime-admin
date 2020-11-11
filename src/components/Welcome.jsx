import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";

function Welcome(props) {
  const user = useContext(UserContext);
  return (
    <div className="container welcome">
      <div className="row text-center d-flex justify-content-center mt-4">
        <div className="col-12" style={{}}>
          <h1>Hi {user && user.name}, welcome back to Admin Page</h1>
          <h4>Which content do you want to manage?</h4>
        </div>
        <div className="col-8 listBtnManage">
          <Link to="/users" className="btnManage">
            Users
          </Link>
          <Link to="/categories" className="btnManage">
            Categories
          </Link>
          <Link to="/products" className="btnManage">
            Products
          </Link>
          <Link to="/reviews" className="btnManage">
            Reviews
          </Link>
        </div>
        <div className="clientPageBtn col-12 mt-4">
          <a href="https://shop-anime-client.herokuapp.com/">
            GO TO CLIENT PAGE
          </a>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
