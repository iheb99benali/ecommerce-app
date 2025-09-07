import CartButton from "../components/CartButton";
import CartPopUp from "../components/CartPopUp";
import { useContext, useEffect, useState } from "react";
import ProductMenu from "../components/ProductMenu";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import AppLayout from "../components/AppLayout";

const Products = () => {
  const token = localStorage.getItem("token");
  const { user } = useContext(UserContext);

  const [productsList, setProductsList] = useState([]);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "default";
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await axios.get("http://localhost:5000/api/products");
        setProductsList(products.data);
      } catch (err) {
        console.error("Error while filtering products:", err);
        console.log(err.response?.data.error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    async function handleParams() {
      try {
        const query = searchParams.toString();

        const res = await axios.get(
          `http://localhost:5000/api/products?${query}`
        );

        setProductsList(res.data);
      } catch (err) {
        console.error("Error while filtering products:", err);
        console.log(err.response?.data.error);
      }
    }
    handleParams();
  }, [category, sort, searchTerm, searchParams]);

  // *********CART FUNCTIONALITIES********* //

  //delayed update Quantity function

  return (
    <AppLayout>
      <div className="page-heading products-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-content">
                <h4>new arrivals</h4>
                <h2>sixteen products</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductMenu productsList={productsList} />
    </AppLayout>
  );
};

export default Products;
