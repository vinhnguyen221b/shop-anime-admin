import validate from "../utils/validate";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import auth from "../services/authService";
import Joi from "joi-browser";

function Login(props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const handleChange = (e) => {
    const userInputs = { ...inputs };
    userInputs[e.currentTarget.name] = e.currentTarget.value;
    setInputs(userInputs);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const schema = {
      email: Joi.string()
        .required()
        .label("Email")
        .email(),
      password: Joi.string()
        .min(3)
        .required()
        .label("Password"),
    };
    const userErrors = validate(inputs, schema);
    setError(userErrors);
    const result = await auth.login(inputs);
    if (typeof result !== "string") return toast.error(result.message);
    window.location = "/";
  };
  return (
    <div className="container loginForm">
      <div className="row justify-content-center">
        <div className="col-12 text-center loginTitle">LOGIN ADMIN</div>
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter admin email"
                onChange={handleChange}
              />
              {error && error.email && (
                <div className="alert" role="alert">
                  {error.email}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter admin Password"
                onChange={handleChange}
              />
              {error && error.password && (
                <div className="alert" role="alert">
                  {error.password}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-login">
              Login
            </button>
            <p style={{ marginTop: "2rem", color: "white" }}>
              <span style={{ color: "rgb(255, 209, 43)", fontWeight: "bold" }}>
                Hint&nbsp;&nbsp;
              </span>
              Email: admin@gmail.com - Password: admin
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
