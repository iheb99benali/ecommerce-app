import { useState } from "react";

const AdminProductCard = ({ product }) => {
  const [activeImage, setActiveImage] = useState(product.image_urls[0]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

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
  return (
    <>
      {!collapsed ? (
        <div className={`product-card `}>
          <img className="image-collapsed" src={activeImage} alt="Product" />
          <div className="product-header" onClick={toggleCollapse}>
            <div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
            <button className="collapse-toggle">{collapsed ? "⬇" : "⬆"}</button>
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
          <div className="product-details">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <input
                type="text"
                placeholder="Product Name"
                defaultValue={product.name}
              />
              <button className="collapse-toggle" onClick={toggleCollapse}>
                {collapsed ? "⬇" : "⬆"}
              </button>
            </div>
            <textarea
              placeholder="Description"
              defaultValue={product.description}
            ></textarea>
            <input
              type="number"
              placeholder="Stock"
              defaultValue={product.stock}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              defaultValue={product.price}
            />

            <div className="button-group">
              <div className="button">
                <button>Edit</button>
                <button>Import Images</button>
              </div>

              <div className="button">
                <button>Apply Edits</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AdminProductCard;
