import ProductCard from "./ProductCard";
import SearchFilterSort from "./SearchFilterSort ";

const ProductMenu = ({ productsList }) => {
  console.log(productsList);
  return (
    <div className="latest-products">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <SearchFilterSort />
            </div>
          </div>
          {productsList.map(
            (product) =>
              product.is_active && (
                <ProductCard key={product.id} product={product} />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductMenu;
