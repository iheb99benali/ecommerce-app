import { useEffect, useState } from "react";
import AdminProductCard from "./AdminProductCard";
import NewProductModal from "./NewProductModal";
import axios from "axios";
import SearchFilterSort from "./SearchFilterSort ";
import { useSearchParams } from "react-router-dom";

const token = localStorage.getItem("token"); //TODO: handle token with context or redux
const user = JSON.parse(localStorage.getItem("user"));

const AdminProductList = () => {
  const [showModal, setShowModal] = useState(false);
  const [productList, setProductList] = useState([]);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "default";
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/products",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProductList(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    async function handleParams() {
      try {
        console.log("in handleParams");
        const query = searchParams.toString();
        let url = `http://localhost:5000/api/admin/products?${query}`;
        console.log(url);

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);

        setProductList(res.data);
      } catch (err) {
        console.error("Error while filtering products:", err);
        console.log(err.response?.data.error);
      }
    }
    handleParams();
  }, [category, sort, searchTerm, searchParams]);

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
    //TODO: move fetching and unnecessary components to adminProducts page
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

      {/* TODO: search,filter, sort for admin */}
      <div className="section-heading">
        <SearchFilterSort />
      </div>
      {productList.map((product) => (
        <AdminProductCard
          user={user}
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
