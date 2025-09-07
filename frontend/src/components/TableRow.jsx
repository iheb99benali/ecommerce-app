import React, { useContext } from "react";
import TableButton from "./TableButton";
import { ReplyModalContext } from "../context/ReplyModalContext";

const TableRow = ({ actions, statusColor, dataRow, handleAction }) => {
  const date = new Date(dataRow.date);
  console.log(dataRow);
  const { setIsOpen, setMessage } = useContext(ReplyModalContext);
  function handleModal() {
    setIsOpen(true);
    setMessage(dataRow);
  }
  return (
    <tr key={dataRow.id} className="row-data">
      {Object.entries(dataRow).map(([key_, value], i) => (
        <td style={key_ === "status" ? { color: `${statusColor}` } : null}>
          {key_ === "date" ? date.toLocaleDateString() : value}
        </td>
      ))}

      <td>
        {Object.entries(actions).map(([key_, value], i) => (
          <TableButton
            key={i}
            key_={key_}
            value={value}
            handleAction={() => {
              if (key_ === "reply") {
                handleModal();
                return;
              }
              handleAction(key_, dataRow.id);
            }}
          />
        ))}
      </td>
    </tr>
  );
};

export default TableRow;
