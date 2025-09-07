import { useContext } from "react";
import CartItem from "./CartItem";
import { CartContext } from "../context/CartContext";
const CartPopUp = ({
  isOpen,
  items,
  onClose,
  onRemove,
  onClear,
  onCheckout,
  handleQtyChange,
  totalPrice,
}) => {
  return (
    <div className={`cartpop-container ${isOpen ? "cartpop-show" : ""}`}>
      <div className="cartpop-header">
        <h3>Your Cart</h3>
        <button onClick={onClose} className="cartpop-close">
          ✕
        </button>
      </div>

      {items.length === 0 ? (
        <p className="cartpop-empty">Your cart is empty</p>
      ) : (
        <>
          <div className="cartpop-list">
            {items.map((item) => (
              <CartItem
                key={item.cart_item_id}
                item={item}
                onQtyChange={handleQtyChange}
                onRemove={onRemove}
              />
            ))}
          </div>
          <div className="cartpop-footer">
            <p>
              Total: <strong>${totalPrice.toFixed(2)}</strong>
            </p>
            <div className="cartpop-actions">
              <button onClick={onClear} className="cartpop-clear">
                Clear
              </button>
              <button onClick={onCheckout} className="cartpop-checkout">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPopUp;
