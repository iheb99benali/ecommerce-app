import { Link } from "react-router-dom";
import productImg from "../assets/images/product_01.jpg";

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-4">
      <div className="product-item">
        <Link to={`/products/${product.id}`}>
          <img src={product.image_urls[0]} alt="sad" />
        </Link>
        <div className="down-content">
          <Link to={`/products/${product.id}`}>
            <h4>{product.name}</h4>
          </Link>
          <h6>{product.price}</h6>
          <p>{product.description}</p>
          <ul className="stars">
            <li>
              <i className="fa fa-star"></i>
            </li>
            <li>
              <i className="fa fa-star"></i>
            </li>
            <li>
              <i className="fa fa-star"></i>
            </li>
            <li>
              <i className="fa fa-star"></i>
            </li>
            <li>
              <i className="fa fa-star"></i>
            </li>
          </ul>
          <span>Reviews (24)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
