import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem.jsx";
import styles from "./ProductListConfirmation.module.css";

function ProductListConfirmation({ setStep, productsTotal, setProductsTotal }) {
  const cartList = useSelector((state) => state.cartList);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    let total = 0;
    cartList.map((item) => total += item.price * item.qty);
    setProductsTotal(total);
  }, [cartList]);

  return (
    <div className={styles.container}>
      <label className={styles.title}>Confirma tu lista de productos para continuar con tu compra</label>

      <div className={styles.products}>
        {
          cartList.length && products.length && cartList.map((product) => {
            const stockAvaliable = products.find((item) => item.id === product.id)

            return (
              <CartItem 
                key={product.id}
                id={product.id}
                name={product.name}
                qty={product.qty}
                image={product.image}
                price={product.price}
                stock={stockAvaliable.stock}
              />
            );
          })
        }
      </div>

      <div className={styles.options}>

        <div className={styles.labels}>
          <label className={styles.total}>Total de productos: $ {productsTotal} MX</label>
          <label className={styles.info}>El precio de envio se agregara ya que hayas seleccionado una direccion de envio</label>
        </div>

        <div className={styles.btnContainer}>
          <button className="exit-payment">Salir</button>
          <button className="continue-payment" onClick={() => setStep(2)}>Continuar</button>
        </div>

      </div>

    </div>
  );
}

export default ProductListConfirmation;