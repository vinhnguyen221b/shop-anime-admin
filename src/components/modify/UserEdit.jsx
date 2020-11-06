import React, { useState } from "react";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import { apiEndPoint } from "../../config.json";
function UserEdit({ user, setUserChange }) {
  const initial = {
    phone: user.phone,
    address: user.address ? user.address : "",
    avatar: user.avatar ? apiEndPoint + user.avatar : "",
  };
  const [inputs, setInputs] = useState(initial);
  const [preview, setPreview] = useState(apiEndPoint + user.avatar);
  const handleChange = (e) => {
    const userInputs = { ...inputs };
    userInputs[e.currentTarget.name] = e.currentTarget.value;
    setInputs(userInputs);
  };
  const handleUpload = (e) => {
    const userInputs = { ...inputs };
    userInputs.avatar = e.currentTarget.files[0];
    setPreview(URL.createObjectURL(e.currentTarget.files[0]));
    setInputs(userInputs);
  };
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await userService.editUser(id, inputs);
      toast.success("User edited!");
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
        className="btn btn-edit my-1"
        data-toggle="modal"
        data-target={`#editUser_${user._id}`}
      >
        <i className="fas fa-edit"></i>
      </button>

      <div
        className="modal fade"
        id={`editUser_${user._id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editUserLabel">
                {user.name}
              </h5>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => handleSubmit(e, user._id)}>
                <div className="form-group">
                  <label htmlFor="editPhone">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    defaultValue={inputs.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editAddress">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    defaultValue={inputs.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editAvatar">Avatar</label>
                  <input
                    type="file"
                    className="form-control-file"
                    name="avatar"
                    onChange={handleUpload}
                  />
                  <img
                    src={preview}
                    alt=""
                    style={{
                      width: "100px",
                      borderRadius: "10px",
                      marginTop: "10px",
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-save mx-1">
                  <i className="fas fa-save"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-close mx-1"
                  data-dismiss="modal"
                  onClick={() => setInputs(initial)}
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

export default UserEdit;
