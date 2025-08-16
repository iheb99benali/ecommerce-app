import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components & pages imports
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminMessages from "./pages/AdminMessages";

// Importing template files
import "./assets/css/flex-slider.css";
import "./assets/css/owl.css";
import "./assets/css/templatemo-sixteen.css";
import "./assets/css/fontawesome.css";

import "jquery";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
// Template files end
// personal src files
import "./assets/css/custom-select.css";
import "./assets/css/admin-card.css";
import "./assets/css/search-bar.css";
import "./assets/css/cart-pop-up.css";

import "./assets/images/search.png";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
