import React from "react";
import AdminSideBar from "../components/AdminSideBar";
import AdminLayout from "../components/AdminLayout";

const AdminDashboard = ({ children }) => {
  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <p>
          Welcome to the admin panel. Here you can manage products, orders, and
          messages.
        </p>
        {children}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
