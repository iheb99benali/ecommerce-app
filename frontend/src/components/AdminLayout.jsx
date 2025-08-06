import AdminSideBar from "./AdminSideBar";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: "80px" }}>
      <AdminSideBar />
      <main style={{ flex: 1, padding: "20px", backgroundColor: "#f5f5f5" }}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
