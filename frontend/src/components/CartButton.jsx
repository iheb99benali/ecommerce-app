const CartButton = ({ onToggle, itemCount }) => {
  return (
    <button className="cartbtn-floating" onClick={onToggle}>
      🛒 {itemCount > 0 && <span className="cartbtn-count">{itemCount}</span>}
    </button>
  );
};

export default CartButton;
