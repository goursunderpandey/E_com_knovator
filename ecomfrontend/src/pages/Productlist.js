import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context/Appcontext";
import ProductGrid from "../Component/Productgrid";
import Config from "../Config/Config";
import axios from "axios";

const Productlist = () => {
  const { products, setProducts } = useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${Config.API}/products/getallproduct`
        );
        console.log(response.data.products,"getdatac");
        
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="display-5 fw-bold text-dark">Our Products</h1>
            <span className="badge bg-dark fs-6">
              {products.length} Products
            </span>
          </div>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
};

export default Productlist;
