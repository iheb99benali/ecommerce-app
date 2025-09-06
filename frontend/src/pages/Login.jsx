import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AppLayout from "../components/AppLayout";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        loginData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      if (error.status === 404 || error.status === 401) {
        alert(error.response?.data.error);
      } else {
        alert(error.response?.data.error);
      }
    }
  };

  return (
    <AppLayout>
      <div className="auth-container">
        <div className="auth-form">
          <h2>Welcome Back</h2>
          <p>Login to your account</p>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
            <p className="switch-link">
              Don’t have an account?
              <NavLink to="/signup">Sign up</NavLink>
            </p>
          </form>
        </div>

        <div className="auth-image">
          <div className="auth-overlay">
            <h1>
              <span className="white">Sixteen</span>{" "}
              <span className="red">Clothing</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id
              dolor nec metus cursus placerat.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;
