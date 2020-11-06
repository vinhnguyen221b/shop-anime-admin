import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import categoryService from "../services/categoryService";
import reviewService from "../services/reviewService";
import paginate from "../utils/paginate";
import Pagination from "./commons/Pagination";
import ReviewCreate from "./modify/ReviewCreate";
import ReviewEdit from "./modify/ReviewEdit";
import { apiEndPoint } from "../config.json";
function Review(props) {
  const [reviews, setReviews] = useState([]);
  const [reviewChange, setReviewChange] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");

  const filterData = (products) => {
    if (filter !== "") {
      return products.filter((prod) => prod.category._id === filter);
    }
    return products;
  };
  const getCategories = async () => {
    try {
      const { data: cates } = await categoryService.getAllCategories();
      setCategories(cates);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getReviews = async () => {
    try {
      const { data } = await reviewService.getAllReviews();
      setReviews(filterData(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const { data } = await reviewService.searchReview(query);
      setReviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  const handleDelete = async (id) => {
    try {
      await reviewService.deleteReview(id);
      toast.success("Delete product successfully!");
      setReviewChange(true);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data);
    }
  };
  useEffect(() => {
    getCategories();
    getReviews();
    setReviewChange(false);
  }, [reviewChange, filter]);
  return (
    <div className="container">
      <div className="row content">
        <div className="col-12 d-flex justify-content-between title">
          <h3>Reviews</h3>
          <ReviewCreate setReviewChange={setReviewChange} />
        </div>
        <div className="col-12 amount">
          <p>
            There {reviews.length > 1 ? "are " : "is "}
            <span style={{ fontWeight: "bold" }}>{reviews.length}</span>{" "}
            {reviews.length > 1 ? "reviews " : "review "}
            in DB
          </p>
        </div>
        <div className="col-12 search">
          <input
            type="text"
            className="searchInput"
            placeholder="Enter review title"
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <button onClick={handleSearch} className="btn-search">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="filter col-12">
          <select
            className="filterCate"
            name="filterCate"
            onChange={(e) => setFilter(e.currentTarget.value)}
            defaultValue=""
          >
            <option value="">All category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Categoty</th>
                <th>Thumbnail</th>
                <th>Detail</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {!reviews ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No reviews in DB
                  </td>
                </tr>
              ) : (
                paginate(reviews, 4, pageIndex).map((review, i) => (
                  <tr key={review._id}>
                    <td>{(pageIndex - 1) * 4 + i + 1}</td>
                    <td>{review.title}</td>
                    <td>{review.user && review.user.name}</td>
                    <td>{review.category && review.category.name}</td>
                    <td>
                      <img
                        className="cateImage"
                        src={`${apiEndPoint + review.thumbnail}`}
                        alt=""
                      />
                    </td>
                    <td>
                      <Link
                        className="btn btn-content-review"
                        to={`/reviews/${review._id}`}
                      >
                        Content Details
                      </Link>
                    </td>
                    <td>
                      <ReviewEdit
                        review={review}
                        setReviewChange={setReviewChange}
                      />
                      <button
                        className="btn btn-delete mx-1 my-1"
                        onClick={() => handleDelete(review._id)}
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <Pagination
            amount={reviews.length}
            pageIndex={pageIndex}
            pageSize={4}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Review;
