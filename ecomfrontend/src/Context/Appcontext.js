import React, { createContext, useReducer } from "react";

const initialState = {
  products: [],
  cart: [],
  loading: false,
  error: null,
};

const action_type = {
  SET_PRODUCTS: "SET_PRODUCTS",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
};

const appReducer = (state, action) => {
  switch (action.type) {
    case action_type.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };

    case action_type.ADD_TO_CART:
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case action_type.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case action_type.UPDATE_QUANTITY:
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: Math.max(0, action.payload.quantity) }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case action_type.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case action_type.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case action_type.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const actions = {
    setProducts: (products) =>
      dispatch({ type: action_type.SET_PRODUCTS, payload: products }),

    addToCart: (product) =>
      dispatch({ type: action_type.ADD_TO_CART, payload: product }),

    removeFromCart: (productId) =>
      dispatch({ type: action_type.REMOVE_FROM_CART, payload: productId }),

    updateQuantity: (productId, quantity) =>
      dispatch({
        type: action_type.UPDATE_QUANTITY,
        payload: { id: productId, quantity },
      }),

    clearCart: () => dispatch({ type: action_type.CLEAR_CART }),
  };

  const getCartTotalItems = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotalPrice = () => {
    return state.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const value = {
    ...state,
    ...actions,
    getCartTotalItems,
    getCartTotalPrice,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};


