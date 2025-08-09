import { useState } from "react";

const AdminProductCard = ({ product, onChange }) => {
  const categoriesList = ["list"];
  const [product_, setProduct] = useState(product);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activeImage, setActiveImage] = useState(product.image_urls[0]);
  function toggleCollapse() {
    setCollapsed((prev) => !prev);
  }
  function handleHover(i, event) {
    if (event === "mouseenter") {
      setHoveredIndex(i);
    } else {
      setHoveredIndex(null);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAddImageUrls(e) {
    if (e.key === "Enter") {
      const urls = e.target.value
        .split(/[\n,]+/)
        .map((url) => url.trim())
        .filter(Boolean);

      setProduct((prev) => ({
        ...prev,
        image_urls: urls.length > 0 && [...prev.image_urls, ...urls],
      }));
      e.target.value = "";
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      product.name &&
      product.description &&
      product.stock >= 0 &&
      product.price > 0
    ) {
      onChange(product);
    } else {
      alert("Please fill in all fields correctly.");
    }
  }

  //TODO: - Fix Check switch Functionality
  // - Fix categories dropdown style
  // - Add image Delete functionality
  // - Finish Submit functionality
  return (
    <>
      {!collapsed ? (
        <div className={`product-card `}>
          <img className="image-collapsed" src={activeImage} alt="Product" />
          <div className="product-header" onClick={toggleCollapse}>
            <div>
              <h3>{product_.name}</h3>
              <p>{product_.description}</p>
            </div>
            <button className="collapse-toggle">{!collapsed && "⬇"}</button>
          </div>
        </div>
      ) : (
        <div className="product-card">
          <div className="product-images">
            <img className="main-image" src={activeImage} alt="Product" />
            <div className="thumbnail-grid">
              {product.image_urls.slice(1).map((img, i) => (
                <div
                  className="thumbnail-wrapper"
                  onMouseEnter={() => handleHover(i, "mouseenter")}
                  onMouseLeave={() => handleHover(i, "mouseleave")}
                >
                  <img
                    key={i}
                    src={img}
                    alt={`Thumbnail ${i}`}
                    className={`thumbnail ${
                      img === activeImage ? "active" : ""
                    }`}
                    onClick={() => setActiveImage(img)}
                  />
                  {hoveredIndex === i && (
                    <button className="delete-button">🗑️</button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <form className="product-details" onSubmit={handleSubmit}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1 }}>
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Product Name"
                  defaultValue={product_.name}
                />
              </div>
              <button className="collapse-toggle" onClick={toggleCollapse}>
                {collapsed && "⬆"}
              </button>
            </div>

            <div>
              <label>Description</label>
              <textarea
                placeholder="Description"
                name="description"
                onChange={handleChange}
                defaultValue={product_.description}
              ></textarea>
            </div>

            {/* Stock, Price, and Category in same row */}
            <div className="row-3-inputs">
              <div>
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  onChange={handleChange}
                  placeholder="Stock"
                  defaultValue={product_.stock}
                />
              </div>

              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  step="0.01"
                  placeholder="Price"
                  defaultValue={product_.price}
                />
              </div>

              <div>
                <label>Category</label>
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
              </div>
            </div>

            <div className="image-url-row">
              <div style={{ flex: 1 }}>
                <label>Image URLs</label>
                <textarea
                  name="image_urls"
                  onChange={handleAddImageUrls}
                  placeholder="Add image URLs here (one per line or comma-separated)"
                ></textarea>
              </div>
              <button type="button" className="add-image-btn">
                Add Image URLs
              </button>
            </div>

            <div className="action-row">
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={product_.is_active === 1 ? false : true}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        is_active: product_.is_active ? 1 : 0,
                      }))
                    }
                  />
                  <span className="slider round"></span>
                </label>
                <span style={{ marginLeft: "8px" }}>
                  {product_.is_active === 0 ? "Active" : "inactive"}
                </span>
              </div>
              <div className="admin-button">
                <button type="button">Delete Product</button>
                <button type="submit">Apply Edits</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default AdminProductCard;
