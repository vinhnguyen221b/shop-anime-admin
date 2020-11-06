import React, { useEffect, useState } from "react";
import reviewService from "../services/reviewService";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

function ReviewDetail({ match: { params } }) {
  const [review, setReview] = useState({});
  const getReview = async (id) => {
    const { data } = await reviewService.getReviewDetail(id);
    setReview(data);
  };
  useEffect(() => {
    getReview(params.id);
  }, []);
  return (
    <div className="container mx-auto m-2">
      <div className="row justify-content-center">
        <div className="col-12 my-2">
          <Link to="/reviews" className="btn-back">
            <i className="fas fa-arrow-circle-left"></i> To Reviews List
          </Link>
        </div>
        <div className="col-8 text-center">
          <h1 style={{ color: "white" }}>{review.title}</h1>
          <p style={{ color: "white", fontStyle: "italic" }}>
            {review.user && review.user.name}
          </p>
        </div>
        <div className="col-8 reviewDetail">
          {review.content && parse(review.content)}
        </div>
      </div>
    </div>
  );
}

export default ReviewDetail;
