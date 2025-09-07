const TableButton = ({ key_, value, handleAction }) => {
  if (key_ === "read") {
    key_ = "mark as read";
  } else if (key_ === "receipt") {
    key_ = "view receipt";
  } else if (key_ === "read") {
    key_ = "mark as read";
  }

  return (
    <button
      className="table-button"
      title={`${key_} `}
      onClick={() => handleAction(key_)}
    >
      {value}
    </button>
  );
};

export default TableButton;
