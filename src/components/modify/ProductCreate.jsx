import Joi from "joi-browser";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import categoryService from "../../services/categoryService";
import productService from "../../services/productService";
import validate from "../../utils/validate";

function ProductCreate({ setProductChange }) {
  const initial = {
    title: "",
    categoryId: "",
    author: "",
    price: 0,
    trailer: "",
    duration: "",
    imdb: "",
    release: "",
    storyline: "",
  };
  const schema = {
    title: Joi.string()
      .required()
      .min(5)
      .max(32),
    categoryId: Joi.string().required(),
    storyline: Joi.string().required(),
    author: Joi.string()
      .required()
      .min(5)
      .max(32),
    price: Joi.number()
      .required()
      .min(20)
      .max(1000),
    trailer: Joi.string().required(),
    duration: Joi.string().required(),
    imdb: Joi.string().required(),
    release: Joi.string().required(),
    poster: Joi.required(),
    thumbnail: Joi.required(),
  };
  const [inputs, setInputs] = useState(initial);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState({
    poster: "",
    thumbnail: "",
  });
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data: cates } = await categoryService.getAllCategories();
      setCategories(cates);
    } catch (error) {
      console.log(error.message);
    }
  };
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
      await productService.createProduct(inputs);
      toast.success("Product added successfully!");
      setInputs(initial);
      setPreview({
        poster: "",
        thumbnail: "",
      });
      setProductChange(true);
      window.location = "/products";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid inputs");
      }
      if (error.response && error.response.status === 401) {
        toast.error("Your session have ended");
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <button
        type="button"
        data-toggle="modal"
        data-target="#createProduct"
        className="btn-create"
      >
        <i className="fas fa-plus"></i>
      </button>

      <div
        className="modal fade"
        id="createProduct"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createProductLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="name">Title</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Enter product title"
                        onChange={handleChange}
                        value={inputs.title}
                      />
                      {errors && errors.title && (
                        <div className="alert" role="alert">
                          {errors.title}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="categoryId">Category</label>
                      <select
                        className="form-control"
                        name="categoryId"
                        onChange={handleChange}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Please select category
                        </option>
                        {categories.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      {errors && errors.categoryId && (
                        <div className="alert" role="alert">
                          {errors.categoryId}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="author">Author</label>
                      <input
                        type="text"
                        name="author"
                        className="form-control"
                        placeholder="Enter author name"
                        onChange={handleChange}
                        value={inputs.author}
                      />
                      {errors && errors.author && (
                        <div className="alert" role="alert">
                          {errors.author}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="price">Price</label>
                      <input
                        type="text"
                        name="price"
                        className="form-control"
                        placeholder="Enter product price"
                        onChange={handleChange}
                        value={inputs.price}
                      />
                      {errors && errors.price && (
                        <div className="alert" role="alert">
                          {errors.price}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="trailer">Trailer</label>
                      <input
                        type="text"
                        name="trailer"
                        className="form-control"
                        placeholder="Enter product trailer"
                        onChange={handleChange}
                        value={inputs.trailer}
                      />
                      {errors && errors.trailer && (
                        <div className="alert" role="alert">
                          {errors.trailer}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="duration">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        className="form-control"
                        placeholder="Enter product duration"
                        onChange={handleChange}
                        value={inputs.duration}
                      />
                      {errors && errors.duration && (
                        <div className="alert" role="alert">
                          {errors.duration}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="imdb">IMDB</label>
                      <input
                        type="text"
                        name="imdb"
                        className="form-control"
                        placeholder="Enter imdb point"
                        onChange={handleChange}
                        value={inputs.imdb}
                      />
                      {errors && errors.imdb && (
                        <div className="alert" role="alert">
                          {errors.imdb}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="release">Release</label>
                      <input
                        type="text"
                        name="release"
                        className="form-control"
                        placeholder="Enter product release year"
                        onChange={handleChange}
                        value={inputs.release}
                      />
                      {errors && errors.release && (
                        <div className="alert" role="alert">
                          {errors.release}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="storyline">Story line</label>
                      <textarea
                        className="form-control"
                        name="storyline"
                        rows="3"
                        onChange={handleChange}
                        value={inputs.storyline}
                      ></textarea>
                      {errors && errors.description && (
                        <div className="alert" role="alert">
                          {errors.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="image">Product Poster</label>
                      <input
                        type="file"
                        className="form-control-file"
                        name="poster"
                        onChange={handleUpload}
                        // value={inputs.poster}
                      />
                      {errors && errors.poster && (
                        <div className="alert" role="alert">
                          {errors.poster}
                        </div>
                      )}
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
                      <label htmlFor="thumbnail">Product Thumbnail</label>
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
                  </div>
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

export default ProductCreate;
