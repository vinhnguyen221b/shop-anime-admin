import Joi from "joi-browser";
import React, { useState } from "react";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import validate from "../../utils/validate";

function UserCreate({ setUserChange }) {
  const initial = {
    email: "",
    password: "",
    name: "",
    phone: "",
  };
  const schema = {
    email: Joi.string()
      .required()
      .label("Email")
      .email(),
    password: Joi.string()
      .min(5)
      .max(32)
      .required()
      .label("Password"),
    name: Joi.string()
      .min(5)
      .max(32)
      .required()
      .label("Name"),
    phone: Joi.string().label("Phone"),
  };
  const [inputs, setInputs] = useState(initial);
  const [error, setError] = useState(initial);
  const handleChange = (e) => {
    const userInputs = { ...inputs };
    userInputs[e.currentTarget.name] = e.currentTarget.value;
    setInputs(userInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userErrors = validate(inputs, schema);
    setError(userErrors);
    try {
      await userService.createUser(inputs);
      toast.success("Add user successfully");
      setInputs(initial);
      setUserChange(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid inputs");
      }
      if (error.response && error.response.status === 401) {
        toast.error("Your session have ended");
      }
    }
  };

  return (
    <>
      <button
        type="button"
        data-toggle="modal"
        data-target="#createUser"
        className="btn-create"
      >
        <i className="fas fa-plus"></i>
      </button>

      <div
        className="modal fade"
        id="createUser"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter user email"
                    onChange={handleChange}
                    value={inputs.email}
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
                    name="password"
                    className="form-control"
                    placeholder="Enter user password"
                    onChange={handleChange}
                    value={inputs.password}
                  />
                  {error && error.password && (
                    <div className="alert" role="alert">
                      {error.password}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="name">User name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter user name"
                    onChange={handleChange}
                    value={inputs.name}
                  />
                  {error && error.name && (
                    <div className="alert" role="alert">
                      {error.name}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">User phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Enter user phone number"
                    onChange={handleChange}
                    value={inputs.phone}
                  />
                  {error && error.phone && (
                    <div className="alert" role="alert">
                      {error.phone}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-save mx-1">
                  <i className="fas fa-plus"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-close mx-1"
                  data-dismiss="modal"
                  //   onClick={() =>
                  //     setInputs({
                  //       phone: user.phone,
                  //       address: user.address ? user.address : "",
                  //       avatar: user.avatar ? staticUrl + user.avatar : "",
                  //     })
                  //   }
                >
                  <i className="fas fa-times"></i>
                </button>
              </form>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCreate;
