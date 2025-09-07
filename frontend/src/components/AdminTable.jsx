import React from "react";
import TableRow from "./TableRow";

const AdminTable = ({ title, headers, dataArr, actions, handleAction }) => {
  return (
    <div className="App">
      <h1>Admin {title} Management</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th> {header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataArr.map((data, index) => (
              <TableRow
                actions={actions}
                handleAction={handleAction}
                key={index}
                dataRow={data}
                statusColor={
                  data.status === "pending"
                    ? "#FFA500"
                    : data.status === "read"
                    ? `#1E90FF`
                    : data.status === "replied"
                    ? `#28A745`
                    : data.status === "archived" && `#6c757d`
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
