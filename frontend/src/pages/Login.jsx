import React from "react";
import { Link, NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Welcome Back</h2>
        <p>Login to your account</p>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
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
  );
};

export default Login;
