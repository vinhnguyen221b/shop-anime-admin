import Joi from "joi-browser";
import React, { useState } from "react";
import { toast } from "react-toastify";
import categoryService from "../../services/categoryService";
import validate from "../../utils/validate";
import { apiEndPoint } from "../../config.json";
function CategoryEdit({ category, setCategoryChange }) {
  const initial = {
    name: category.name,
    description: category.description,
    image: category.image,
    thumbnail: category.thumbnail,
  };
  const schema = {
    name: Joi.string()
      .required()
      .min(5)
      .max(32),
    description: Joi.string(),
    image: Joi.string(),
    thumbnail: Joi.string(),
  };
  const [inputs, setInputs] = useState(initial);
  const [errors, setErrors] = useState();
  const [preview, setPreview] = useState({
    image: apiEndPoint + category.image,
    thumbnail: apiEndPoint + category.thumbnail,
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
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const userError = validate(inputs, schema);
    setErrors(userError);
    try {
      await categoryService.editCategory(id, inputs);
      toast.success("Category edited successfully!");
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
        data-target={`#editCategory${category._id}`}
        className="btn btn-edit my-1"
      >
        <i className="fas fa-edit"></i>
      </button>

      <div
        className="modal fade"
        id={`editCategory${category._id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editCategoryLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={(e) => handleSubmit(e, category._id)}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter category name"
                    defaultValue={inputs.name}
                    onChange={handleChange}
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
                    defaultValue={inputs.description}
                    onChange={handleChange}
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
                  />
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
                  />
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
                  <i className="fas fa-save"></i>
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

export default CategoryEdit;
