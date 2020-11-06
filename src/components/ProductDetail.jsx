import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../services/productService";
import { apiEndPoint } from "../config.json";

function ProductDetail({ match: { params } }) {
  const [product, setProduct] = useState({});
  const getProduct = async (id) => {
    const { data } = await productService.getProductDetails(id);
    setProduct(data);
  };
  useEffect(() => {
    getProduct(params.id);
  }, []);
  return (
    <div className="container mx-auto m-2 productDetail">
      <div className="row justify-content-center">
        <div className="col-12 my-4">
          <Link to="/products" className="btn-back">
            <i className="fas fa-arrow-circle-left"></i> Back To Products List
          </Link>
        </div>
        <div className="col-12">
          <h1>{product.title}</h1>
          <p className="font-italic">
            {product.category ? product.category.name : ""}
          </p>
        </div>
        <div className="col-12">
          <p style={{ textAlign: "justify" }}>{product.storyline}</p>
        </div>
        <div className="col-4">
          <img src={apiEndPoint + product.poster} alt="" width="80%" />
        </div>
        <div className="col-8">
          <div className="table-info">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>Author</th>
                  <td>{product.author}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>${product.price} </td>
                </tr>
                <tr>
                  <th>Duration</th>
                  <td>{product.duration}</td>
                </tr>
                <tr>
                  <th>IMDB</th>
                  <td>{product.imdb}</td>
                </tr>
                <tr>
                  <th>Release</th>
                  <td>{product.release}</td>
                </tr>
                <tr>
                  <th>Store</th>
                  <td>{product.numberInstore}</td>
                </tr>
                <tr>
                  <th>Sold</th>
                  <td>{product.numberSold}</td>
                </tr>
                <tr>
                  <th>Stars</th>
                  <td>{product.stars}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-12 my-3 d-flex justify-content-center">
          <iframe
            title={product.title}
            width="640"
            height="360"
            src={product.trailer}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
