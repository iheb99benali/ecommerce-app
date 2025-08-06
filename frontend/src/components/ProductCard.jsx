import productImg from "../assets/images/product_01.jpg";

const ProductCard = () => {
  return (
    <div className="col-md-4">
      <div className="product-item">
        <a href="#">
          <img src={productImg} alt="sad" />
        </a>
        <div className="down-content">
          <a href="#">
            <h4>Tittle goes here</h4>
          </a>
          <h6>$25.75</h6>
          <p>
            Lorem ipsume dolor sit amet, adipisicing elite. Itaque, corporis
            nulla aspernatur.
          </p>
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
