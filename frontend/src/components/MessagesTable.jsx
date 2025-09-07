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
            {messages.map((msg, index) => {
              //WARNING: static code
              delete msg.user_id;
              const msg_ = {
                id: msg.message_id,
                name: msg.name,
                email: msg.email,
                subject: msg.subject,
                message: msg.message,
                status: msg.status,
                date: msg.created_at,
              };

              return (
                <TableRow
                  actions={actions}
                  handleAction={handleAction}
                  key={index}
                  index={index}
                  dataRow={msg_}
                  statusColor={
                    msg_.status === "pending"
                      ? "#FFA500"
                      : msg_.status === "read"
                      ? `#1E90FF`
                      : msg_.status === "replied"
                      ? `#28A745`
                      : msg_.status === "archived" && `#6c757d`
                  }
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessagesTable;
