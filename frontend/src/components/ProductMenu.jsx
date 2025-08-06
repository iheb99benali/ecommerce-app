import React from "react";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";

const ProductMenu = () => {
  const { currPath } = useParams();
  console.log(currPath);
  return (
    <div className="latest-products">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>Latest Products</h2>
              <a href="products">
                view all products <i className="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default ProductMenu;
