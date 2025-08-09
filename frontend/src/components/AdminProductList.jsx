import { useEffect, useState } from "react";
import AdminProductCard from "./AdminProductCard";
import NewProductModal from "./NewProductModal";
import axios from "axios";

const AdminProductList = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin-products"
        );
        setProductList(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  async function handleAddProduct(newProduct, e) {
    setProductList((prev) => [...prev, newProduct]);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin-products",
        newProduct
      );
      console.log("product created: ", res.data);
    } catch (err) {
      console.log(err.response?.data.error);
    }
  }

  async function handleUpdateProduct(Product, e) {
    // setProductList((prev) => [...prev, Product]);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin-products/update",
        Product
      );
      console.log("product updated: ", res.data);
    } catch (err) {
      console.log(err.response?.data.error);
    }
  }

  const [showModal, setShowModal] = useState(false);
  const [productList, setProductList] = useState([]);

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
      {productList.map((product, i) => (
        <AdminProductCard
          key={i}
          product={product}
          onChange={handleUpdateProduct}
        />
      ))}
    </div>
  );
};

export default AdminProductList;

// [
//   {
//     name: "Test Product 1",
//     description: "This is a test product.",
//     stock: 10,
//     price: 29.99,
//     images: [
//       "https://placehold.co/600x400",
//       "https://placehold.co/600x500?text=Hello+World",
//       "https://placehold.co/600x400/000000/FFF",
//       "https://placehold.co/600x400?font=roboto",
//       "https://placehold.co/600x400",
//       "https://placehold.co/600x300?text=hi",
//       "https://placehold.co/600x400/000000/000",
//       "https://placehold.co/600x400?font=oswald",
//     ],
//   },
//   {
//     name: "Test Product 2",
//     description: "Another product.",
//     price: 14.49,
//     stock: 5,
//     category: "shoes",
//     images: [
//       "https://placehold.co/600x400",
//       "https://placehold.co/600x500?text=Hello+World",
//       "https://placehold.co/600x400/000000/FFF",
//       "https://placehold.co/600x400?font=roboto",
//       "https://placehold.co/600x400",
//       "https://placehold.co/600x300?text=hi",
//       "https://placehold.co/600x400/000000/000",
//       "https://placehold.co/600x400?font=oswald",
//     ],
//   },
// ];
