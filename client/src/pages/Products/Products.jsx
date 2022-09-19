import React from "react";
import ProductCardContainer from "../../components/ProductCardContainer/ProductCardContainer";
import styles from "./Products.module.css";

function Products() {
  return (
    <div>
      <img className={styles.image} src="https://i.ibb.co/dr6Pt40/allplants.jpg" alt="" />
      <ProductCardContainer />
    </div>
  );
};

export default Products;