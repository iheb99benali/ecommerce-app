const TableButton = ({ key_, value, handleAction }) => {
  return (
    <button
      className="table-button"
      title={`${key_ === "read" ? "mark as read" : key_} `}
      onClick={() => handleAction(key_)}
    >
      {value}
    </button>
  );
};

export default TableButton;
