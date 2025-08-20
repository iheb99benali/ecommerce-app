import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeLatestMenu = () => {
  //TODO: move to page
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products/latest");
      setProductList(res.data.products);
    };
    getProducts();
  }, []);

  const [productList, setProductList] = useState([]);
  return (
    <div className="latest-products">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>Latest Products</h2>
              <Link to="products">
                view all products <i className="fa fa-angle-right"></i>
              </Link>
            </div>
          </div>
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeLatestMenu;
