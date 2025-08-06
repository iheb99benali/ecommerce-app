import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <aside
      style={{
        width: "220px",
        backgroundColor: "#222",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>Admin Panel</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0, lineHeight: "2.2" }}>
          <li>
            <Link
              to="/admin/products"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              📦 Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              🧾 Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/messages"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              📨 Messages
            </Link>
          </li>
          {/* 
            Future additions:
            - Dashboard Overview (Analytics, Charts)
            - User Management
            - Settings
          */}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSideBar;
