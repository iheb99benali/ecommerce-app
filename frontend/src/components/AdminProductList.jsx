import { useEffect, useState } from "react";
import AdminProductCard from "./AdminProductCard";
import NewProductModal from "./NewProductModal";
import axios from "axios";

const token = localStorage.getItem("token"); //TODO: handle token with context or redux

const AdminProductList = () => {
  const [showModal, setShowModal] = useState(false);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/products",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProductList(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  async function handleAddProduct(newProduct, e) {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/products/create",
        newProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProductList((prev) => [...prev, { ...newProduct, id: res.data.id }]);

      console.log("product created: ", res.data.prodData);
    } catch (err) {
      console.log(err.response?.data.error);
    }
  }

  async function handleUpdateProduct(Product, e) {
    // setProductList((prev) => [...prev, Product]);
    console.log("Updating product:", Product);
    try {
      const res = await axios.put(
        "http://localhost:5000/api/admin/products/update",
        Product,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Product updated:", res.data);
    } catch (err) {
      console.log(err.response?.data.error);
    }
  }

  async function handleDeleteProduct(id) {
    console.log("Deleting product with ID:", typeof id);
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/admin/products/Delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProductList((prev) => prev.filter((product) => product.id !== id));
      console.log("Product deleted:", res.data);
    } catch (err) {
      console.error("Error deleting product:", err);
      console.log(err.response?.data.error);
    }
  }
  return (
    <div className="product-list">
      <div style={{ marginBottom: "20px" }}>
        <button className="ModalButton" onClick={() => setShowModal(true)}>
          ➕ Create Product
        </button>
      </div>
      {showModal && (
        <NewProductModal
          onClose={() => setShowModal(false)}
          onSave={handleAddProduct}
        />
      )}

      {/* //TODO: add searchbar, filter and sort */}
      {productList.map((product, i) => (
        <AdminProductCard
          key={product.id}
          product={product}
          onDelete={handleDeleteProduct}
          onUpdate={handleUpdateProduct}
        />
      ))}
    </div>
  );
};

export default AdminProductList;
