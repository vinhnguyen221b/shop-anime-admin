import Joi from "joi-browser";
import React, { useState } from "react";
import { toast } from "react-toastify";
import categoryService from "../../services/categoryService";
import validate from "../../utils/validate";

function CategoryCreate({ setCategoryChange }) {
  const initial = {
    name: "",
    description: "",
    image: "",
    thumbnail: "",
  };
  const schema = {
    name: Joi.string()
      .required()
      .min(5)
      .max(32),
    description: Joi.string(),
    image: Joi.required(),
    thumbnail: Joi.required(),
  };
  const [inputs, setInputs] = useState(initial);
  const [errors, setErrors] = useState(initial);
  const [preview, setPreview] = useState({
    image: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    const userInputs = { ...inputs };
    userInputs[e.currentTarget.name] = e.currentTarget.value;
    setInputs(userInputs);
  };

  const handleUpload = (e) => {
    const userUpload = { ...inputs };
    userUpload[e.currentTarget.name] = e.currentTarget.files[0];
    const newPreview = {
      ...preview,
      [e.currentTarget.name]: URL.createObjectURL(e.currentTarget.files[0]),
    };
    setPreview(newPreview);
    setInputs(userUpload);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userError = validate(inputs, schema);
    setErrors(userError);
    try {
      await categoryService.createCategory(inputs);
      toast.success("Category added successfully!");
      setInputs(initial);
      setPreview({ image: "", thumbnail: "" });
      setCategoryChange(true);
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
        data-target="#createCategory"
        className="btn-create"
      >
        <i className="fas fa-plus"></i>
      </button>

      <div
        className="modal fade"
        id="createCategory"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createCategoryLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter category name"
                    onChange={handleChange}
                    value={inputs.name}
                  />
                  {errors && errors.name && (
                    <div className="alert" role="alert">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Enter category description"
                    onChange={handleChange}
                    value={inputs.description}
                  />
                  {errors && errors.description && (
                    <div className="alert" role="alert">
                      {errors.description}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="image">Category Image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    name="image"
                    onChange={handleUpload}
                    // value={inputs.image}
                  />
                  {errors && errors.image && (
                    <div className="alert" role="alert">
                      {errors.image}
                    </div>
                  )}
                  <img
                    src={preview.image}
                    alt=""
                    style={{
                      width: "100px",
                      borderRadius: "10px",
                      marginTop: "10px",
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="thumbnail">Category Thumbnail</label>
                  <input
                    type="file"
                    className="form-control-file"
                    name="thumbnail"
                    onChange={handleUpload}
                    // value={inputs.thumbnail}
                  />
                  {errors && errors.thumbnail && (
                    <div className="alert" role="alert">
                      {errors.thumbnail}
                    </div>
                  )}
                  <img
                    src={preview.thumbnail}
                    alt=""
                    style={{
                      width: "100px",
                      borderRadius: "10px",
                      marginTop: "10px",
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-save mx-1">
                  <i className="fas fa-plus"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-close mx-1"
                  data-dismiss="modal"
                >
                  <i className="fas fa-times"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryCreate;
