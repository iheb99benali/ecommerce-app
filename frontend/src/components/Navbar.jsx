import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token"); //TODO: handle token with context or redux
  const user = JSON.parse(localStorage.getItem("user")); //TODO: handle token with context or redux
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  }

  return (
    <header className="">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="index.html">
            <h2>
              Sixteen <em>Clothing</em>
            </h2>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {token && user.is_admin && (
                <li className="nav-item">
                  <NavLink to="/admin" className="nav-link">
                    Admin
                  </NavLink>
                </li>
              )}
              <li className="nav-item ">
                <NavLink to="/" className="nav-link">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/products" className="nav-link">
                  Our Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">
                  Contact Us
                </NavLink>
              </li>
              <li className="nav-item">
                {token && user.is_admin ? (
                  <NavLink to="/" onClick={handleLogout} className="nav-link">
                    logout
                  </NavLink>
                ) : (
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                )}
              </li>
              <li className="nav-item">
                {token && (
                  <NavLink to="/profile" className="nav-link disabled">
                    <span style={{ color: "#f33f3f" }}>Welcome </span>
                    {user.email.split("@")[0]}
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
