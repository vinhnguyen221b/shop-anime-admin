import Joi from "joi-browser";
import React, { useState } from "react";
import { toast } from "react-toastify";
import validate from "../../utils/validate";
import Editor from "../commons/Editor";
import "react-quill/dist/quill.snow.css";
import reviewService from "../../services/reviewService";

function ReviewEdit({ review, setReviewChange }) {
  const initial = {
    title: review.title,
    content: review.content,
  };
  const schema = {
    title: Joi.string()
      .required()
      .min(5),
    content: Joi.string().required(),
  };
  const [inputs, setInputs] = useState(initial);
  const [errors, setErrors] = useState();
  const handleChange = (e) => {
    const userInputs = { ...inputs };
    userInputs[e.currentTarget.name] = e.currentTarget.value;
    setInputs(userInputs);
  };
  const handleContent = (contentHtml) => {
    const newInputs = { ...inputs };
    newInputs.content = contentHtml;
    setInputs(newInputs);
  };
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const userError = validate(inputs, schema);
    setErrors(userError);
    try {
      await reviewService.editReview(id, inputs);
      toast.success("Review edited successfully!");
      setReviewChange(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid inputs");
      }
    }
  };

  return (
    <>
      <button
        type="button"
        data-toggle="modal"
        data-target={`#editReview${review._id}`}
        className="btn btn-edit my-1"
      >
        <i className="fas fa-edit"></i>
      </button>

      <div
        className="modal fade"
        id={`editReview${review._id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editReviewLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={(e) => handleSubmit(e, review._id)}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    defaultValue={inputs.title}
                    onChange={handleChange}
                  />
                  {errors && errors.title && (
                    <div className="alert" role="alert">
                      {errors.title}
                    </div>
                  )}
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

export default ReviewEdit;
