import { useState, useRef } from "react";
import { categoriesList } from "../assets/constant/consts";
import CustomSelect from "./CustomSelect";
import AdminImageSelector from "./AdminImageSelector";
const AdminProductCard = ({ product: product_, onUpdate, onDelete, user }) => {
  const [product, setProduct] = useState(product_);
  const [collapsed, setCollapsed] = useState(false);
  const [imageUrls, setImageUrls] = useState(product_.image_urls);
  const [activeImage, setActiveImage] = useState(imageUrls[0]);

  const imageUrlsRef = useRef(null);

  function toggleCollapse() {
    setCollapsed((prev) => !prev);
  }

  function handleChange(e) {
    console.log(user.is_admin);
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

  function handleDeleteImage(activeImage, urlToDelete) {
    if (imageUrls.length <= 1) {
      alert("Cannot delete the last remaining image.");
      return;
    }

    setImageUrls((prev) => prev.filter((url) => url !== urlToDelete));
    setProduct((prev) => ({
      ...prev,
      image_urls: prev.image_urls.filter((url) => url !== urlToDelete),
    }));

    if (activeImage === urlToDelete) {
      const remainingImages = imageUrls.filter((url) => url !== urlToDelete);
      setActiveImage(remainingImages[0]);
    }

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
      product_.name &&
      product_.description &&
      product_.stock >= 0 &&
      product_.price > 0
    ) {
      onUpdate(product);
    } else {
      alert("Please fill in all fields correctly.");
    }
  }

  function handleDiscard() {
    setProduct((prev) => ({ ...prev, ...product_ }));
  }

  function handleDeleteProduct() {
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDelete(product_.id);
    }
  }

  return (
    <>
      {!collapsed ? (
        <div className={`product-card `}>
          <img
            className="image-collapsed"
            src={product.image_urls[0]}
            alt="Product"
          />
          <div className="product-header" onClick={toggleCollapse}>
            <div>
              <h3>
                {product.name}{" "}
                <span>&nbsp;&nbsp;&nbsp;&nbsp;${product.price}</span>
              </h3>

              <p>{product.description}</p>
            </div>

            <button className="collapse-toggle">{!collapsed && "⬇"}</button>
          </div>
        </div>
      ) : (
        <div className="product-card">
          <AdminImageSelector
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            onDelete={handleDeleteImage}
            images={imageUrls}
            isAdmin={user.is_admin}
          />
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
                  defaultValue={product.name}
                />
              </div>
            </div>

            <div>
              <label>Description</label>
              <textarea
                placeholder="Description"
                name="description"
                onChange={handleChange}
                defaultValue={product.description}
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
                  defaultValue={product.stock}
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
                  defaultValue={product.price}
                />
              </div>

              <div>
                <label>Category</label>
                <CustomSelect
                  options={categoriesList}
                  onChange={handleCategoryChange}
                  placeholder={`${product.category}`}
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
                    checked={product.is_active}
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
                  {product.is_active ? "Active" : "inactive"}
                </span>
              </div>
              <div className="admin-button">
                <button type="button" onClick={handleDeleteProduct}>
                  Delete Product
                </button>

                <button
                  type="button"
                  disabled={product_ === product ? true : false}
                  style={
                    product_ === product
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
