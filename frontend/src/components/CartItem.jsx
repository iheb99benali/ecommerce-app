import { useRef, useState } from "react";

const CartItem = ({ item: item_, onRemove, onQtyChange }) => {
  const QtyRef = useRef();

  const [item, setItem] = useState(item_);
  const [quantity, setQuantity] = useState(item_.quantity);
  const [itemTotal, setItemTotal] = useState(
    Number(item_.total_price_per_item).toFixed(2)
  );
  //   const handleDelete = (id) => {};
  function HandleQtyChange(e) {
    setQuantity(Number(e.target.value));
  }
  function decreaseQuantity() {
    setQuantity((prev) => {
      const newQty = prev > 1 ? prev - 1 : prev;
      setItemTotal(newQty * item.unit_price);
      onQtyChange(item_.cart_item_id, newQty);
      setItem((prev) => ({ ...prev, quantity: newQty }));
      QtyRef.current.value = quantity;
      return newQty;
    });
  }
  function increaseQuantity() {
    setQuantity((prev) => {
      const newQty = prev < 10 ? prev + 1 : prev; //TODO: change to stock amount
      setItemTotal(newQty * item.unit_price);

      onQtyChange(item_.cart_item_id, newQty);
      setItem((prev) => ({ ...prev, quantity: newQty }));
      QtyRef.current.value = quantity;
      return newQty;
    });

    QtyRef.current.value = quantity;
  }

  return (
    <div className="cartpop-item">
      <img
        src={item.first_image}
        alt={item.product_name}
        className="cartpop-img"
      />
      <div className="cartpop-details">
        <p>
          {item.product_name}
          <span> &nbsp;&nbsp; ${Number(item.unit_price).toFixed(2)}</span>
        </p>
        <p>total: ${itemTotal}</p>
        <div className="cartpop-quantity">
          <button className="cartqty-btn" onClick={decreaseQuantity}>
            -
          </button>
          <input
            className="cartqty-input"
            placeholder={`Qty: ${item.quantity}`}
            value={quantity}
            onChange={HandleQtyChange}
            ref={QtyRef}
          />
          <button className="cartqty-btn" onMouseDownCapture={increaseQuantity}>
            +
          </button>
        </div>
      </div>
      <button
        className="cartpop-remove"
        onClick={() => onRemove(item.cart_item_id)}
      >
        🗑
      </button>
    </div>
  );
};

export default CartItem;
