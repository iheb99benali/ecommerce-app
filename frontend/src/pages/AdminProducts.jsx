import AdminLayout from "../components/AdminLayout";
import AdminProductList from "../components/AdminProductList";
import AppLayout from "../components/AppLayout";

const AdminProducts = () => {
  return (
    <AppLayout>
      <AdminLayout>
        <AdminProductList />
      </AdminLayout>
    </AppLayout>
  );
};

export default AdminProducts;
