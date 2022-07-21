import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Cart.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";

function Cart({ set }) {
  const cartList = useSelector((state) => state.cartList);
  const [active, setActive] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartList.map((item) => total += item.price * item.qty);
    setTotal(total);
  }, [cartList])

  const closeMenu = () => {
    setActive(false);
    setTimeout(setToFalse, 299);
  };

  const setToFalse = () => {
    set(false)
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={(e) => closeMenu()}/>
      <div className={active ? styles.cart : styles.close}>
        <div className={styles.closeDiv}>
          <button className={styles.closeBtn} onClick={(e) => closeMenu()}><CloseIcon/></button>
        </div>
        <div className={styles.list}>
          {
            cartList.length 
            ? cartList.map((item) => {
              return (<CartItem 
                key={item.id}
                id={item.id}
                name={item.name}
                qty={item.qty}
                image={item.image}
                price={item.price}
              />)
            }) 
            : <p className={styles.empty}>El carrito esta vacio.</p>
          }
          {
            cartList.length 
            ? <div className={styles.total}>
                <label className={styles.amount}>Total: ${total}</label>
                <button className={styles.checkout}>Proceder al pago</button>
              </div> 
            : null
          }
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Cart;