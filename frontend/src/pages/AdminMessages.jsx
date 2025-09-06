import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import AppLayout from "../components/AppLayout";
import MessagesTable from "../components/MessagesTable";
import axios from "axios";
import { actions } from "../assets/constant/consts";

const token = localStorage.getItem("token");
const AdminMessages = () => {
  const [messages, setMessages] = useState();
  const [replyModal, setReplyModal] = useState();

  useEffect(() => {
    const fetchMessgaes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/contact/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchMessgaes();
  }, []);
  async function updateStatus(action, id) {
    if (action === "reply") {
      setReplyModal();
    }
    try {
      const res = await axios.patch(
        "http://localhost:5000/api/admin/contact/update",
        {
          status: action,
          id: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const message_ = res.data.updatedMessage;
      console.log(message_);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.message_id === message_.message_id ? message_ : msg
        )
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteMessage(id) {
    try {
      axios.delete(`http://localhost:5000/api/admin/contact/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <AppLayout>
      <AdminLayout>
        {messages && (
          <MessagesTable
            messages={messages}
            replyToMessage={updateStatus}
            markAsRead={updateStatus}
            archiveMessage={updateStatus}
            deleteMessage={deleteMessage}
            actions={actions}
          />
        )}
      </AdminLayout>
    </AppLayout>
  );
};

export default AdminMessages;
