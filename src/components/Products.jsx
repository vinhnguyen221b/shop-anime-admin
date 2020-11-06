import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import categoryService from "../services/categoryService";
import productService from "../services/productService";
import paginate from "../utils/paginate";
import Pagination from "./commons/Pagination";
import ProductCreate from "./modify/ProductCreate";
import ProductEdit from "./modify/ProductEdit";
import { apiEndPoint } from "../config.json";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [productChange, setProductChange] = useState(false);
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
  const getProducts = async () => {
    try {
      const { data } = await productService.getAllProducts();
      setProducts(filterData(data));
    } catch (error) {
      console.log(error.message);
    }
  };

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
      const { data } = await productService.searchProduct(query);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id);
      toast.success("Delete product successfully!");
      setProductChange(true);
    } catch (error) {
      console.log(error.message);
      // toast.error(error.response.data);
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
    setProductChange(false);
  }, [productChange, filter]);
  return (
    <div className="container">
      <div className="row content">
        <div className="col-12 d-flex justify-content-between title">
          <h3>Products</h3>
          <ProductCreate setProductChange={setProductChange} />
        </div>
        <div className="col-12 amount">
          <p>
            There {products.length > 1 ? "are " : "is "}
            <span style={{ fontWeight: "bold" }}>{products.length}</span>{" "}
            {products.length > 1 ? "products " : "product "}
            in DB
          </p>
        </div>
        <div className="col-12 search">
          <input
            type="text"
            className="searchInput"
            placeholder="Enter product title"
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
          <p style={{ fontSize: "12px", fontStyle: "italic", color: "white" }}>
            * Click on the title to view product detail
          </p>
        </div>
        <div className="col-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Number In Store</th>
                <th>Number Sold</th>
                <th>Thumbnail</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {!products ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No product in DB
                  </td>
                </tr>
              ) : (
                paginate(products, 4, pageIndex).map((product, i) => (
                  <tr key={product._id}>
                    <td>{(pageIndex - 1) * 4 + i + 1}</td>
                    <td className="productTitle">
                      <Link to={`/products/${product._id}`}>
                        {product.title}
                      </Link>
                    </td>
                    {/* <td>safsdf</td> */}
                    <td>{product.category.name}</td>
                    <td>${product.price}</td>
                    <td>{product.numberInstore}</td>
                    <td>{product.numberSold}</td>
                    <td>
                      <img
                        className="prodImage"
                        src={`${apiEndPoint + product.thumbnail}`}
                        alt=""
                      />
                    </td>
                    <td>
                      <ProductEdit
                        product={product}
                        setProductChange={setProductChange}
                      />
                      <button
                        className="btn btn-delete mx-1 my-1"
                        onClick={() => handleDelete(product._id)}
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
            amount={products.length}
            pageIndex={pageIndex}
            pageSize={4}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
