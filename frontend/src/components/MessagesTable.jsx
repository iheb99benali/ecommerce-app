import TableRow from "./TableRow";

const MessagesTable = ({
  messages,
  markAsRead,
  replyToMessage,
  archiveMessage,
  deleteMessage,
  actions,
}) => {
  async function handleAction(action, id) {
    if (action === "reply") {
      markAsRead(action, id);
    } else if (action === "read") {
      replyToMessage(action, id);
    } else if (action === "archive") {
      archiveMessage(action, id);
    } else if (action === "delete") {
      deleteMessage(id);
    }
  }

  return (
    <div className="App">
      <h1>Admin Contact Management</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th style={{ width: "100px" }}>Status</th>
              <th>Date Sent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <TableRow
                actions={actions}
                handleAction={handleAction}
                key={index}
                index={index}
                message={msg}
                statusColor={
                  msg.status === "pending"
                    ? "#FFA500"
                    : msg.status === "read"
                    ? `#1E90FF`
                    : msg.status === "replied"
                    ? `#28A745`
                    : msg.status === "archived" && `#6c757d`
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessagesTable;
