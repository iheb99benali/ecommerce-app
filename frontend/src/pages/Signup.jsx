import { React, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

const Signup = () => {
  const navigate = useNavigate();

  const [error, setErrorMessage] = useState();
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    is_admin: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users", userData);

      const res = await axios.post("http://localhost:5000/api/users/login", {
        email: userData.email,
        password: userData.password,
      });

      const user = res.data.user;
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      await axios.post(
        "http://localhost:5000/api/cart/create",
        { user_id: user.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/");
    } catch (err) {
      if (err.response?.data.error === "EMAIL_IN_USE") {
        setErrorMessage("EMAIL_IN_USE");
      }
      console.log(err);
    }
  }

  return (
    <AppLayout>
      <div className="auth-container">
        <div className="auth-form">
          <h2>Welcome</h2>
          <p>Make a new account</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="surname"
              placeholder="surname"
              value={userData.surname}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Sign-up</button>
            <p className="switch-link">
              have an account? <Link to="/login">Login</Link>
            </p>
          </form>
          {error === "EMAIL_IN_USE" && (
            <div>
              Email already in use. Try
              <span>
                <Link to="/login">login</Link>
              </span>
              .
            </div>
          )}
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

export default Signup;
