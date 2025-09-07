import { useLocation } from "react-router-dom";
import CartButton from "./CartButton";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { useContext, useState } from "react";
import CartPopUp from "./CartPopUp";
import { CartContext } from "../context/CartContext";

const AppLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0
  );
  const location = useLocation();
  const { cart } = useContext(CartContext);

  const token = localStorage.getItem("token");
  const path = location.pathname;

  const { onCheckout } = useContext(CartContext);
  const showCartButton = path === "/" || path.startsWith("/products");
  const showFooter = !path.startsWith("/admin");

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };
  const handleClear = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    onCheckout(cart, cartItems, totalPrice);
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
      <Navbar />
      <div>{children}</div>
      {showCartButton && (
        <CartButton
          cartId={cart?.cart_id}
          onToggle={toggleCart}
          itemCount={cart?.total_items}
          getCartItems={getCartItems}
        />
      )}
      <CartPopUp
        isOpen={isOpen}
        items={cartItems}
        onClose={toggleCart}
        onRemove={handleCartItemDelete}
        onClear={handleClear}
        onCheckout={handleCheckout}
        handleQtyChange={handleQtyChange}
        totalPrice={totalPrice}
      />
      {showFooter && <Footer />}
    </>
  );
};

export default AppLayout;
