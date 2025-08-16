import CartButton from "../components/CartButton";
import CartPopUp from "../components/CartPopUp";
import { useEffect, useState } from "react";
import ProductMenu from "../components/ProductMenu";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const placeholderCartItems = [
  {
    id: 1,
    name: "Chicken Burrito",
    price: 12.99,
    quantity: 2,
  },
  {
    id: 2,
    name: "Cheeseburger",
    price: 9.5,
    quantity: 1,
  },
  {
    id: 3,
    name: "Loaded Fries",
    price: 6.25,
    quantity: 3,
  },
  {
    id: 4,
    name: "Veggie Wrap",
    price: 8.75,
    quantity: 1,
  },
];
const Products = () => {
  const [productList, setProductList] = useState([]);

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
  }, [category, sort, searchTerm, searchParams]);

  // *********CART FUNCTIONALITIES********* //
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(placeholderCartItems);

  const toggleCart = () => setIsOpen(!isOpen);
  const closeCart = () => setIsOpen(false);

  const handleRemove = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setItems([]);
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    // here you can redirect or call API
  };

  return (
    <>
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
      <CartButton onToggle={toggleCart} itemCount={items.length} />
      <CartPopUp
        isOpen={isOpen}
        items={items}
        onClose={closeCart}
        onRemove={handleRemove}
        onClear={handleClear}
        onCheckout={handleCheckout}
      />
      <ProductMenu productList={productList} />
    </>
  );
};

export default Products;
