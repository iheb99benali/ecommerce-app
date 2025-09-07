import { useContext, useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import AppLayout from "../components/AppLayout";
import axios from "axios";
import ReplyModalProvider from "../context/ReplyModalContext";
import { ReplyModalContext } from "../context/ReplyModalContext";
import AdminMessagesContent from "../components/AdminMessagesContent";
import ReplyModal from "../components/ReplyModal";

const token = localStorage.getItem("token");
const AdminMessages = () => {
  const [messages, setMessages] = useState();
  const { isOpen } = useContext(ReplyModalContext);
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
        {isOpen && <ReplyModal />}
        {messages && (
          <AdminMessagesContent
            deleteMessage={deleteMessage}
            updateStatus={updateStatus}
            messages={messages}
          />
        )}
      </AdminLayout>
    </AppLayout>
  );
};

export default AdminMessages;
