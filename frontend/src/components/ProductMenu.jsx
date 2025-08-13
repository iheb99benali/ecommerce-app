import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchFilterSort from "./SearchFilterSort ";
import { useSearchParams } from "react-router-dom";

const ProductMenu = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "default";
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    const getProducts = async () => {
      const products = await axios.get("http://localhost:5000/api/products");
      setProductList(products.data);
    };
    getProducts();
  }, []);

  useEffect(() => {
    async function handleParams() {
      try {
        console.log("in handleParams");
        const query = searchParams.toString();
        let url = `http://localhost:5000/api/products?${query}`;
        console.log(url);

        const res = await axios.get(url);
        console.log(res);

        setProductList(res.data);
      } catch (err) {
        console.error("Error while filtering products:", err);
        console.log(err.response?.data.error);
      }
    }
    handleParams();
  }, [category, sort, searchTerm]);

  const [productList, setProductList] = useState([]);
  return (
    <div className="latest-products">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <SearchFilterSort />
            </div>
          </div>
          {productList.map(
            (product) =>
              product.is_active && (
                <ProductCard key={product.id} product={product} />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductMenu;
