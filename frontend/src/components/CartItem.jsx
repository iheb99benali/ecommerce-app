import { useRef, useState } from "react";

const CartItem = ({ item, onRemove }) => {
  const QtyRef = useRef();

  const [quantity, setQuantity] = useState(item.quantity);

  //   const handleIncrement = (id) => {};
  //   const handleDecrement = (id) => {};
  //   const handleDelete = (id) => {};
  //   const handleEdit = (id) => {};
  function HandleQtyChange(e) {
    setQuantity(Number(e.target.value));
  }
  function decreaseQuantity() {
    setQuantity((prev) => {
      return prev > 1 ? prev - 1 : prev;
    });
    QtyRef.current.value = quantity;
  }
  function increaseQuantity() {
    setQuantity((prev) => {
      return prev < 10 ? prev + 1 : prev; //TODO: change to stock amount
    });
    QtyRef.current.value = quantity;
  }

  return (
    <div className="cartpop-item">
      <img src={item.image} alt={item.name} className="cartpop-img" />
      <div className="cartpop-details">
        <p>{item.name}</p>
        <p>${item.price.toFixed(2)}</p>
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
      <button className="cartpop-remove" onClick={() => onRemove(item.id)}>
        🗑
      </button>
    </div>
  );
};

export default CartItem;
