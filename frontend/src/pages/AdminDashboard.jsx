import AdminLayout from "../components/AdminLayout";
import AppLayout from "../components/AppLayout";

const AdminDashboard = ({ children }) => {
  return (
    <AppLayout>
      <AdminLayout>
        <div className="admin-dashboard">
          <h1>Admin Dashboard</h1>
          <p>
            Welcome to the admin panel. Here you can manage products, orders,
            and messages.
          </p>
          {children}
        </div>
      </AdminLayout>
    </AppLayout>
  );
};

export default AdminDashboard;
