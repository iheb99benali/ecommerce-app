import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        console.log(res.data.product);
        setProduct(res.data.product);
      } catch (err) {
        console.log(err.message);
      }
    };
    getProduct();
  }, [id]);

  return (
    product && (
      <div className="product-view-page">
        <div className="product-view-wrapper">
          <div className="product-view-image">
            <img src={product.image_urls[0]} alt={product.name} />
          </div>

          <div className="product-view-info">
            <h1 className="product-view-title">{product.name}</h1>
            <h2 className="product-view-price">{product.price}</h2>
            <div className="product-view-rating">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fa fa-star"></i>
              ))}
              <span>({product.reviews_count || 24} reviews)</span>
            </div>
            <p className="product-view-description">{product.description}</p>

            <div className="product-view-actions">
              <div className="product-view-quantity">
                <button onClick={console.log("decrement")}>-</button>
                <span>{product.quantity}</span>
                <button onClick={console.log("increment")}>+</button>
              </div>
              <button className="product-view-addcart">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductView;
