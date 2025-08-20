import CartButton from "../components/CartButton";
import CartPopUp from "../components/CartPopUp";
import { useContext, useEffect, useState } from "react";
import ProductMenu from "../components/ProductMenu";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

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
  const token = localStorage.getItem("token");
  const { user } = useContext(UserContext);

  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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
        const query = searchParams.toString();
        let url = `http://localhost:5000/api/products?${query}`;

        const res = await axios.get(url);

        setProductList(res.data);
      } catch (err) {
        console.error("Error while filtering products:", err);
        console.log(err.response?.data.error);
      }
    }
    handleParams();
  }, [category, sort, searchTerm, searchParams]);

  // *********CART FUNCTIONALITIES********* //
  useEffect(() => {
    if (!user) return;
    const getCart = async () => {
      const res = await axios.get(`http://localhost:5000/api/cart/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.cart);
    };

    getCart();
  }, [user, token]);

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
      <CartButton
        cartId={cart?.cart_id}
        onToggle={toggleCart}
        itemCount={cartItems.length}
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
      <ProductMenu productList={productList} />
    </>
  );
};

export default Products;
