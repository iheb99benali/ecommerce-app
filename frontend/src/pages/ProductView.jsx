import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AdminImageSelector from "../components/AdminImageSelector";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

const ProductView = () => {
  const token = localStorage.getItem("token");

  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  const { id: prodId } = useParams();

  const qtyRef = useRef();

  const [product, setProduct] = useState();
  const [images, setImages] = useState(product?.image_urls || []);
  const [activeImage, setActiveImage] = useState(product?.image_urls[0] || "");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/${prodId}`
        );
        const product = res.data.product;
        setProduct(product);
        setImages(product.image_urls);
        setActiveImage(product.image_urls[0]);
      } catch (err) {
        console.log(err.message);
      }
    };
    getProduct();
  }, [prodId]);

  function handleDecrement() {
    let qty = Number(qtyRef.current.innerHTML);
    qtyRef.current.innerHTML = qty > 1 ? qty - 1 : 1;
    qty = qty < 10 ? qty - 1 : 1;
    setQuantity(qty);
  }

  function handleIncrement() {
    let qty = Number(qtyRef.current.innerHTML);
    qtyRef.current.innerHTML = qty < 10 ? qty + 1 : 10;
    qty = qty < 10 ? qty + 1 : 10;
    setQuantity(qty);
  }

  let addTimer;
  function AddToCart(qty = 1) {
    clearTimeout(addTimer);
    addTimer = setTimeout(async () => {
      try {
        console.log(user.id, prodId, qty);
        const res = await axios.post(
          "http://localhost:5000/api/cart/items/create",
          {
            user_id: user.id,
            cart_id: cart.cart_id,
            product_id: prodId,
            quantity: qty,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }, 3000);
  }
  return (
    product && (
      <div className="product-view-page">
        <div className="product-view-wrapper">
          <div className="product-view-image">
            <AdminImageSelector
              activeImage={activeImage}
              images={images}
              setActiveImage={setActiveImage}
            />
          </div>

          <div className="product-view-info">
            <h1 className="product-view-title">{product.name}</h1>
            <h2 className="product-view-price">{product.price}</h2>
            {/*  */}
            <div className="product-view-rating">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fa fa-star"></i>
              ))}
              <span>({product.reviews_count || 24} reviews)</span>
            </div>
            {/*  */}
            <p className="product-view-description">{product.description}</p>

            <div className="product-view-actions">
              <div className="product-view-quantity">
                <button onClick={handleDecrement}>-</button>
                <span ref={qtyRef}>{quantity}</span>
                <button onClick={handleIncrement}>+</button>
              </div>
              <button
                className="product-view-addcart"
                onClick={() => AddToCart(quantity)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductView;
