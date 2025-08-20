const CartButton = ({ onToggle, itemCount, getCartItems, cartId }) => {
  return (
    <button
      className="cartbtn-floating"
      onClick={() => {
        getCartItems(cartId);
        onToggle();
      }}
    >
      🛒 {itemCount > 0 && <span className="cartbtn-count">{itemCount}</span>}
    </button>
  );
};

export default CartButton;
