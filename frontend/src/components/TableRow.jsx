import React from "react";
import TableButton from "./TableButton";

const TableRow = ({ actions, statusColor, message, index, handleAction }) => {
  return (
    <tr key={message.message_id} className="row-data">
      <td>{index + 1}</td>
      <td>{message.name}</td>
      <td>{message.email}</td>
      <td>{message.subject}</td>
      <td className="message">{message.message}</td>
      <td style={{ color: `${statusColor}` }}>{message.status}</td>
      <td>{message.dateSent}</td>
      <td>
        {Object.entries(actions).map(([key_, value], i) => (
          <TableButton
            key={i}
            key_={key_}
            value={value}
            handleAction={() => handleAction(key_, message.message_id)}
          />
        ))}
      </td>
    </tr>
  );
};

export default TableRow;
