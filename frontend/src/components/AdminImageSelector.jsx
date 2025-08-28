import { useState } from "react";
import { useLocation } from "react-router-dom";

const AdminImageSelector = ({
  images,
  activeImage,
  setActiveImage,
  onDelete = () => {},
  isAdmin = false, //TODO: add location
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();
  function handleHover(i, event) {
    if (event === "mouseenter") {
      setHoveredIndex(i);
    } else {
      setHoveredIndex(null);
    }
  }

  function handleDelete(img) {
    const a = onDelete(activeImage, img);
    if (a) {
      setActiveImage(a);
    }
  }
  return (
    <div className="product-images">
      <img className="main-image" src={activeImage} alt="Product" />
      <div className="thumbnail-grid">
        {images.slice(0).map((img, i) => (
          <div
            key={i}
            className="thumbnail-wrapper"
            onMouseEnter={() => handleHover(i, "mouseenter")}
            onMouseLeave={() => handleHover(i, "mouseleave")}
          >
            <img
              src={img}
              alt={`Thumbnail ${i}`}
              className={`thumbnail ${img === activeImage ? "active" : ""}`}
              onClick={() => setActiveImage(img)}
            />
            {hoveredIndex === i &&
              isAdmin &&
              location.pathname === "/admin/products" && (
                <button
                  className="delete-button"
                  onClick={() => handleDelete(img)}
                >
                  🗑️
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminImageSelector;
