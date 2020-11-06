import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import categoryService from "../services/categoryService";
import CategoryCreate from "./modify/CategoryCreate";
import CategoryEdit from "./modify/CategoryEdit";
import paginate from "../utils/paginate";
import Pagination from "./commons/Pagination";
import { apiEndPoint } from "../config.json";

function Categories(props) {
  const [categories, setCategories] = useState([]);
  const [categoryChange, setCategoryChange] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [query, setQuery] = useState("");

  const getCategories = async () => {
    try {
      const { data: cates } = await categoryService.getAllCategories();
      setCategories(cates);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const { data } = await categoryService.searchCategory(query);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  const handleDelete = async (id) => {
    try {
      await categoryService.deleteCategory(id);
      toast.success("Delete category successfully!");
      setCategoryChange(true);
    } catch (error) {
      console.log(error.message);
      // toast.error(error.response.data);
    }
  };
  useEffect(() => {
    getCategories();
    setCategoryChange(false);
  }, [categoryChange]);
  return (
    <div className="container">
      <div className="row content">
        <div className="col-12 d-flex justify-content-between title">
          <h3>Categories</h3>
          <CategoryCreate setCategoryChange={setCategoryChange} />
        </div>
        <div className="col-12 amount">
          <p>
            There {categories.length > 1 ? "are " : "is "}
            <span style={{ fontWeight: "bold" }}>{categories.length}</span>{" "}
            {categories.length > 1 ? "categories " : "category "}
            in DB
          </p>
        </div>
        <div className="col-12 search">
          <input
            type="text"
            className="searchInput"
            placeholder="Enter category name"
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <button onClick={handleSearch} className="btn-search">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="col-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Thumbnail</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {!categories ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No category in DB
                  </td>
                </tr>
              ) : (
                paginate(categories, 4, pageIndex).map((cate, i) => (
                  <tr key={cate._id}>
                    <td>{(pageIndex - 1) * 4 + i + 1}</td>
                    <td>{cate.name}</td>
                    <td>{cate.description}</td>
                    <td>
                      <img
                        className="cateBanner"
                        src={`${apiEndPoint + cate.image}`}
                        alt=""
                      />
                    </td>
                    <td>
                      <img
                        className="cateImage"
                        src={`${apiEndPoint + cate.thumbnail}`}
                        alt=""
                      />
                    </td>
                    <td>
                      <CategoryEdit
                        category={cate}
                        setCategoryChange={setCategoryChange}
                      />
                      <button
                        className="btn btn-delete mx-1 my-1"
                        onClick={() => handleDelete(cate._id)}
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
            amount={categories.length}
            pageIndex={pageIndex}
            pageSize={4}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Categories;
