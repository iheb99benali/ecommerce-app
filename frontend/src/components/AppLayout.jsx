import { useLocation } from "react-router-dom";
import CartButton from "./CartButton";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  const showCartButton = path === "/" || path.startsWith("/products");

  return (
    <>
      <Navbar />
      <div>{children}</div>
      {showCartButton && <CartButton />}
      <Footer />
    </>
  );
};

export default AppLayout;
