import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
export const CartContext = createContext();

//WARNING:
const shipping = "'123 Main St, City A'";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState();
  const { user } = useContext(UserContext);

  async function onCheckout(cart, items, totalPrice) {
    const order = {
      userId: user.id,
      totalAmount: totalPrice,
      shipping: shipping,
    };
    console.log(order);
    if (!user) return;
    try {
      const res = await axios.create(
        `http://localhost:5000/api/order/create`,
        { order },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log(res.data);
      setCart({
        cart_id: res.data.cart.cart_id,
        total_items: res.data.cart.total_items,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!user) return;
    const getCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cart/${user.id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        console.log(res.data);
        setCart({
          cart_id: res.data.cart.cart_id,
          total_items: res.data.cart.total_items,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, setCart, onCheckout }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
