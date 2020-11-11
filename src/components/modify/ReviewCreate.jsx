import Joi from "joi-browser";
import React, { useState } from "react";
import { toast } from "react-toastify";
import categoryService from "../../services/categoryService";
import reviewService from "../../services/reviewService";
import validate from "../../utils/validate";
import Editor from "../commons/Editor";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";

function ReviewCreate({ setReviewChange }) {
  const initial = {
    title: "",
    content: "",
    thumbnail: "",
    categoryId: "",
  };
  const schema = {
    title: Joi.string()
      .required()
      .min(5),

    content: Joi.string().required(),
    categoryId: Joi.string().required(),
    thumbnail: Joi.optional(),
  };
  const [inputs, setInputs] = useState(initial);
  const [errors, setErrors] = useState(initial);
  const [preview, setPreview] = useState("");
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

  const handleContent = (contentHtml) => {
    const newInputs = { ...inputs };
    newInputs.content = contentHtml;
    setInputs(newInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userError = validate(inputs, schema);
    setErrors(userError);
    try {
      await reviewService.createReview(inputs);
      toast.success("Review added successfully!");
      setPreview("");
      setReviewChange(true);
      window.location = "/reviews";
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
        data-target="#createReview"
        className="btn-create"
      >
        <i className="fas fa-plus"></i>
      </button>

      <div
        className="modal fade"
        id="createReview"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createReviewLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter review title"
                    onChange={handleChange}
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
                  <label htmlFor="thumbnail">Thumbnail</label>
                  <input
                    type="file"
                    className="form-control-file"
                    name="thumbnail"
                    onChange={handleUpload}
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
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <div className="rich-editor">
                    <Editor
                      placeholder={"Please enter content"}
                      contentHtml={inputs.content}
                      setContentHtml={handleContent}
                    />
                  </div>
                  {errors && errors.content && (
                    <div className="alert" role="alert">
                      {errors.content}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary mx-1">
                  <i className="fas fa-plus"></i>
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

export default ReviewCreate;
