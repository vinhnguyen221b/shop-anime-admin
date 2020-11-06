import Joi from "joi-browser";
import React, { useState } from "react";
import { toast } from "react-toastify";
import productService from "../../services/productService";
import validate from "../../utils/validate";
import { apiEndPoint } from "../../config.json";
function ProductEdit({ product, setProductChange }) {
  const initial = {
    price: product.price,
    trailer: product.trailer,
    numberInstore: product.numberInstore,
    stars: product.stars ? product.stars : 5,
    poster: product.poster,
    thumbnail: product.thumbnail,
  };
  const schema = {
    price: Joi.number()
      .required()
      .min(20)
      .max(1000),
    trailer: Joi.string().required(),
    numberInstore: Joi.number().min(0),
    stars: Joi.number()
      .min(0)
      .max(5),
    poster: Joi.required(),
    thumbnail: Joi.required(),
  };
  const [inputs, setInputs] = useState(initial);
  const [errors, setErrors] = useState();
  const [preview, setPreview] = useState({
    poster: apiEndPoint + product.poster,
    thumbnail: apiEndPoint + product.thumbnail,
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
      await productService.editProduct(id, inputs);
      toast.success("Product edited successfully!");
      setProductChange(true);
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
        data-target={`#editCategory${product._id}`}
        className="btn btn-edit my-1"
      >
        <i className="fas fa-edit"></i>
      </button>

      <div
        className="modal fade"
        id={`editCategory${product._id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editCategoryLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={(e) => handleSubmit(e, product._id)}>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Enter product price"
                    defaultValue={inputs.price}
                    onChange={handleChange}
                  />
                  {errors && errors.price && (
                    <div className="alert" role="alert">
                      {errors.price}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="trailer">Trailer</label>
                  <input
                    type="text"
                    name="trailer"
                    className="form-control"
                    placeholder="Enter product trailer"
                    defaultValue={inputs.trailer}
                    onChange={handleChange}
                  />
                  {errors && errors.trailer && (
                    <div className="alert" role="alert">
                      {errors.trailer}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="numberInstore">Number in store</label>
                  <input
                    type="text"
                    name="numberInstore"
                    className="form-control"
                    placeholder="Enter product number in store"
                    defaultValue={inputs.numberInstore}
                    onChange={handleChange}
                  />
                  {errors && errors.numberInstore && (
                    <div className="alert" role="alert">
                      {errors.numberInstore}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="stars">Stars</label>
                  <input
                    type="text"
                    name="stars"
                    className="form-control"
                    placeholder="Enter product stars"
                    defaultValue={inputs.stars}
                    onChange={handleChange}
                  />
                  {errors && errors.stars && (
                    <div className="alert" role="alert">
                      {errors.stars}
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="poster">Poster</label>
                      <input
                        type="file"
                        className="form-control-file"
                        name="poster"
                        onChange={handleUpload}
                      />
                      <img
                        src={preview.poster}
                        alt=""
                        style={{
                          width: "100px",
                          borderRadius: "10px",
                          marginTop: "10px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="thumbnail">Thumbnail</label>
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
                  </div>
                </div>

                <button type="submit" className="btn btn-primary mx-1">
                  <i className="fas fa-save"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-1"
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

export default ProductEdit;
