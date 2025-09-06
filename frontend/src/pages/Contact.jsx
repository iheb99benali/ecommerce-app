import axios from "axios";
import AboutClients from "../components/AboutClients";
import AppLayout from "../components/AppLayout";
import ContactForm from "../components/ContactForm";
import ContactHeading from "../components/ContactHeading";
import ContactMap from "../components/ContactMap";

const Contact = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  async function sendMessage(message) {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact/create",
        message
      );
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <AppLayout>
      <ContactHeading />
      <ContactMap />
      <ContactForm userId={JSON.parse(user)?.id} sendMessage={sendMessage} />
      <AboutClients />
    </AppLayout>
  );
};

export default Contact;
