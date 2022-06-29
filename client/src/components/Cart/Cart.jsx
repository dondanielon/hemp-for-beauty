import React from "react";
import ReactDOM from "react-dom";
import styles from "./Cart.module.css";

function Cart({ set }) {
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={(e) => set(false)}/>
      <div className={styles.cart}></div>
    </>,
    document.getElementById("portal")
  );
};

export default Cart;