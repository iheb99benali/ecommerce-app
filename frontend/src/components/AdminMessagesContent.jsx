import React, { useContext } from "react";
import { ReplyModalContext } from "../context/ReplyModalContext";
import MessagesTable from "./MessagesTable";
import ReplyModal from "./ReplyModal";
import { messagesActions } from "../assets/constant/consts";
import AdminTable from "./AdminTable";

const AdminMessagesContent = ({ messages, deleteMessage, updateStatus }) => {
  const { isOpen } = useContext(ReplyModalContext);
  const headers = [
    "#",
    "Name",
    "Email",
    "Subject",
    "Message",
    "Status",
    "Date Sent",
    "Action",
  ];

  // async function handleAction(action, id) {
  //   if (action === "reply") {
  //     updateStatus(action, id);
  //   } else if (action === "read") {
  //     updateStatus(action, id);
  //   } else if (action === "archive") {
  //     updateStatus(action, id);
  //   } else if (action === "delete") {
  //     deleteMessage(id);
  //   }
  // }
  return (
    <>
      {isOpen && <ReplyModal />}
      {messages && (
        <MessagesTable
          messages={messages}
          replyToMessage={updateStatus}
          markAsRead={updateStatus}
          archiveMessage={updateStatus}
          deleteMessage={deleteMessage}
          actions={messagesActions}
        />
      )}
      {/* <AdminTable
        headers={headers}
        dataArra={messages}
        actions={messagesActions}
        handleAction={handleAction}
      /> */}
    </>
  );
};

export default AdminMessagesContent;
