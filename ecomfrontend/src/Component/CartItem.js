import React, { useContext } from "react";
import { AppContext } from "../Context/Appcontext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(AppContext);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-2">
            <img
              src={item.image}
              alt={item.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-4">
            <h5 className="card-title">{item.name}</h5>
            <p className="text-muted small">{item.description}</p>
          </div>
          <div className="col-md-2">
            <span className="h5 text-success">${item.price}</span>
          </div>
          <div className="col-md-2">
            <div className="input-group">
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange(item.quantity - 1)}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                min="1"
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange(item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="col-md-2">
            <button className="btn btn-danger btn-sm" onClick={handleRemove}>
              <i className="fas fa-trash"></i> Remove
            </button>
            <div className="mt-2">
              <strong>
                Subtotal: ${(item.price * item.quantity).toFixed(2)}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
