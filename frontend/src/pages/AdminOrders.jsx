import AdminLayout from "../components/AdminLayout";
import AppLayout from "../components/AppLayout";
import TableButton from "../components/TableButton";
import { orderActions } from "../assets/constant/consts";
import AdminTable from "../components/AdminTable";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const AdminOrders = () => {
  const headers = ["OrderID", "	Customer", "	Date", "	Status", "	Total", "	Actions"];

  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState();

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      console.log(user);
      try {
        const res = await axios.get("http://localhost:5000/api/admin/orders", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log(res.data);
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchOrders();
  }, [user]);

  function handleAction() {}

  return (
    <AppLayout>
      <AdminLayout>
        {orders && (
          <AdminTable
            title={"Orders"}
            headers={headers}
            dataArr={orders}
            actions={orderActions}
            handleAction={handleAction}
          />
        )}
        {/* <div className="admin-orders-container">
          <div className="admin-orders-header">
            <h2>Orders</h2>
            <div className="search-box">
              <input type="text" placeholder="Search..." />
              <span className="ao-search-icon">🔍</span>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1001</td>
                <td>John Doe</td>
                <td>04/21/2024</td>
                <td className="status pending">Pending</td>
                <td>$80.99</td>
                <td className="admin-orders-actions">
                  {Object.entries(orderActions).map(([key_, value], i) => (
                    <TableButton
                      key={i}
                      key_={key_}
                      value={value}
                      handleAction={handleAction}
                    />
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div classNameName="admin-orders">orders</div> */}
      </AdminLayout>
    </AppLayout>
  );
};

export default AdminOrders;
