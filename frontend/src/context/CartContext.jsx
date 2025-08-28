import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { data } from "jquery";
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState();
  const { user } = useContext(UserContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && !user) return;
    const getCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cart/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
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
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
