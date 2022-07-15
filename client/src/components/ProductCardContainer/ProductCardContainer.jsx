import React, { useEffect, useState } from "react";
import styles from "./ProductCardContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
import ProductCard from "../ProductCard/ProductCard";

function ProductCardContainer() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  },[dispatch]);

  return (
    <div className={styles.container}>
      {products?.map((product) => (
        <ProductCard 
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
          price={product.price}
          specs={product.specs}
          stock={product.stock}
          weight={product.weight}
          ingredients={product.Ingredients}
        />
      ))}
    </div>
  );
}

export default ProductCardContainer;