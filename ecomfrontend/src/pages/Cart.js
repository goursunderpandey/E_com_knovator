import React, { useContext, useState } from "react";
import CartItem from "../Component/CartItem";
import Form from "../Component/Form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/Appcontext";
import axios from "axios";
import Config from "../Config/Config";

const Cart = () => {
  const { cart, getCartTotalPrice, clearCart } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async (userData) => {
    setLoading(true);

    try {
      const orderData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address,
        items: cart.map((item) => ({
          productId: item.id,
          ProductName: item.name,
          quantity: item.quantity,
        })),
      };

      const response = await axios.post(
        `${Config.API}/orders/placeOrder`,
        orderData
      );

      await Swal.fire({
        title: "Order Placed Successfully!",
        text: `Your order #${response.data.orderId} has been placed successfully.`,
        icon: "success",
        confirmButtonText: "Continue Shopping",
        confirmButtonColor: "#3085d6",
      });

      clearCart();
      navigate("/");
    } catch (error) {
      await Swal.fire({
        title: "Order Failed",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 text-center py-5">
            <i className="fas fa-shopping-cart fa-5x text-muted mb-4"></i>
            <h2 className="text-muted">Your cart is empty</h2>
            <p className="text-muted">
              Add some products to your cart to continue shopping.
            </p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate("/")}
            >
              <i className="fas fa-arrow-left me-2"></i>Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-dark">Shopping Cart</h2>
            <span className="badge bg-dark fs-6">
              {cart.length} {cart.length === 1 ? "Item" : "Items"}
            </span>
          </div>

          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <div className="card bg-light">
            <div className="card-body text-end">
              <h4 className="text-success">
                Total: ${getCartTotalPrice().toFixed(2)}
              </h4>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <Form onSubmit={handlePlaceOrder} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
