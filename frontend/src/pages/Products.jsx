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
  const { cart } = useContext(CartContext);

  const [productsList, setProductsList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "default";
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await axios.get("http://localhost:5000/api/products");
        console.log(products.data);
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

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleClear = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    // here you can redirect or call API
  };

  async function getCartItems(cart_id) {
    if (!cart) return;

    const res = await axios.get(
      `http://localhost:5000/api/cart/items/${cart_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setCartItems(res.data.cart);
  }

  //cart item delete
  async function handleCartItemDelete(itemId) {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/items/delete/${itemId}?cart_id=${cart.cart_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(res.data.cart);
    } catch (err) {
      console.log(err.message);
    }
  }
  //delayed update Quantity function
  let updateTimer;
  function handleQtyChange(itemId, qty) {
    clearTimeout(updateTimer);
    updateTimer = setTimeout(async () => {
      try {
        const res = await axios.patch(
          `http://localhost:5000/api/cart/items/update/${itemId}`,
          { quantity: qty, cart_id: cart.cart_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCartItems(res.data.cart);
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  }
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
      <CartButton
        cartId={cart?.cart_id}
        onToggle={toggleCart}
        itemCount={cart?.total_items}
        getCartItems={getCartItems}
      />
      <CartPopUp
        isOpen={isOpen}
        items={cartItems}
        onClose={toggleCart}
        onRemove={handleCartItemDelete}
        onClear={handleClear}
        onCheckout={handleCheckout}
        handleQtyChange={handleQtyChange}
      />
      <ProductMenu productsList={productsList} />
    </AppLayout>
  );
};

export default Products;
