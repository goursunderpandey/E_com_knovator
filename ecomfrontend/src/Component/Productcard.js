import React, { useContext } from 'react';
import { AppContext } from '../Context/Appcontext';


const ProductCard = ({ product }) => {
  const { addToCart } = useContext(AppContext);
  console.log(product,"prodTcart");
  

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="card h-100 product-card shadow-sm">
      <img 
        src={product.image} 
        className="card-img-top product-image" 
        alt={product.name}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-dark">{product.name}</h5>
        <p className="card-text flex-grow-1 text-muted">{product.description}</p>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="h4 text-success mb-0">${product.price}</span>
          </div>
          <button 
            className="btn btn-dark w-100"
            onClick={handleAddToCart}
          >
            <i className="fas fa-plus me-2"></i>Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;