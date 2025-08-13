import { useState } from "react";
import { categoriesList } from "../assets/constant/consts";
const NewProductModal = ({ onClose, onSave }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    stock: 0,
    price: 0.0,
    image_urls: [],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUrls(e) {
    const urls = e.target.value
      .split(/[\n,]+/)
      .map((url) => url.trim())
      .filter(Boolean);

    setProduct((prev) => ({ ...prev, image_urls: urls }));
  }

  // TODO: - Fix categories force selection
  function handleSubmit(e) {
    e.preventDefault();
    if (
      product.name &&
      product.description &&
      product.stock >= 0 &&
      product.price > 0 &&
      product.image_urls.length > 0
    ) {
      onSave(product);
      onClose();
    } else {
      alert("Please fill in all fields correctly.");
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>Create New Product</h2>
        <input name="name" placeholder="Product Name" onChange={handleChange} />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          onChange={handleChange}
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          onChange={handleChange}
        />
        <select
          name="categories"
          onChange={handleChange}
          value={product.categories}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categoriesList.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <textarea
          name="image_urls"
          placeholder="Paste image URLs here (one per line or comma-separated)"
          onChange={handleImageUrls}
          value={product.image_urls}
        />

        <div className="modal-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default NewProductModal;
