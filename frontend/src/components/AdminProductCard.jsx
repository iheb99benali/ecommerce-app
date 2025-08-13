import { useState, useRef } from "react";
import { categoriesList } from "../assets/constant/consts";
import CustomSelect from "./CustomSelect";
const AdminProductCard = ({ product, onUpdate, onDelete }) => {
  const [product_, setProduct] = useState(product);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [imageUrls, setImageUrls] = useState(product.image_urls);
  const [activeImage, setActiveImage] = useState(product.image_urls[0]);

  const imageUrlsRef = useRef(null);

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

  function handleCategoryChange(option) {
    setProduct((prev) => ({
      ...prev,
      category: option,
    }));
  }

  function handleAddImageUrls(e) {
    const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i; // allow only http/https
    const value = imageUrlsRef.current.value;

    const urls = value
      .split(/[\n,]+/)
      .map((url) => url.trim())
      .filter((url) => urlRegex.test(url));

    if (!urls.length) {
      alert("No valid image URLs found! Please enter http/https links.");
      return;
    }
    setImageUrls((prev) => [...prev, ...urls]);
    setProduct((prev) => ({
      ...prev,
      image_urls: [...prev.image_urls, ...urls],
    }));
    imageUrlsRef.current.value = "";
  }

  function handleDeleteImage(urlToDelete) {
    if (imageUrls.length <= 1) {
      alert("Cannot delete the last remaining image.");
      return;
    }

    // Remove the url from imageUrls and product_.image_urls
    setImageUrls((prev) => prev.filter((url) => url !== urlToDelete));
    setProduct((prev) => ({
      ...prev,
      image_urls: prev.image_urls.filter((url) => url !== urlToDelete),
    }));

    // If the deleted image is currently active, switch to another image
    if (activeImage === urlToDelete) {
      const remainingImages = imageUrls.filter((url) => url !== urlToDelete);
      setActiveImage(remainingImages[0] || "");
    }

    // Append the deleted URL to the textarea (preserving any existing content)
    if (imageUrlsRef.current) {
      const currentValue = imageUrlsRef.current.value.trim();
      imageUrlsRef.current.value = currentValue
        ? currentValue + "\n" + urlToDelete
        : urlToDelete;
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
      onUpdate(product_);
    } else {
      alert("Please fill in all fields correctly.");
    }
  }

  function handleDiscard() {
    setProduct(product);
  }

  function handleDeleteProduct() {
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDelete(product.id);
    }
  }

  return (
    <>
      {!collapsed ? (
        <div className={`product-card `}>
          <img className="image-collapsed" src={activeImage} alt="Product" />
          <div className="product-header" onClick={toggleCollapse}>
            <div>
              <h3>
                {product_.name}{" "}
                <span>&nbsp;&nbsp;&nbsp;&nbsp;${product_.price}</span>
              </h3>

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
              {product_.image_urls.slice(0).map((img, i) => (
                <div
                  key={i}
                  className="thumbnail-wrapper"
                  onMouseEnter={() => handleHover(i, "mouseenter")}
                  onMouseLeave={() => handleHover(i, "mouseleave")}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${i}`}
                    className={`thumbnail ${
                      img === activeImage ? "active" : ""
                    }`}
                    onClick={() => setActiveImage(img)}
                  />
                  {hoveredIndex === i && (
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteImage(img)}
                    >
                      🗑️
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <form className="product-details" onSubmit={handleSubmit}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <label>Product Name</label>
                  <button className="collapse-toggle" onClick={toggleCollapse}>
                    {collapsed && "⬆"}
                  </button>
                </div>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Product Name"
                  defaultValue={product_.name}
                />
              </div>
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
                <CustomSelect
                  options={categoriesList}
                  onChange={handleCategoryChange}
                  placeholder={`${product_.category}`}
                />
              </div>
            </div>

            <div className="image-url-row">
              <div style={{ flex: 1 }}>
                <label>Image URLs</label>
                <textarea
                  name="image_urls"
                  ref={imageUrlsRef}
                  placeholder="Add image URLs here (one per line or comma-separated)"
                ></textarea>
              </div>
              <button
                onClick={handleAddImageUrls}
                type="button"
                className="add-image-btn"
              >
                Add <br /> Image URLs
              </button>
            </div>

            <div className="action-row">
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={product_.is_active}
                    onChange={(e) => {
                      setProduct((prev) => ({
                        ...prev,
                        is_active: e.target.checked,
                      }));
                    }}
                  />
                  <span className="slider round"></span>
                </label>
                <span style={{ marginLeft: "8px" }}>
                  {product_.is_active ? "Active" : "inactive"}
                </span>
              </div>
              <div className="admin-button">
                <button type="button" onClick={handleDeleteProduct}>
                  Delete Product
                </button>

                <button
                  type="button"
                  disabled={product === product_ ? true : false}
                  style={
                    product === product_
                      ? { background: "grey", cursor: "default" }
                      : { background: "blue" }
                  }
                  onClick={handleDiscard}
                >
                  Discard Changes
                </button>

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
