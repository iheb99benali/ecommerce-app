import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductMenu = () => {
  useEffect(() => {
    const getProducts = async () => {
      const products = await axios.get("http://localhost:5000/api/products");
      setProductList(products.data);
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
              <h2>Add search bar here</h2>
            </div>
          </div>
          {productList.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductMenu;
