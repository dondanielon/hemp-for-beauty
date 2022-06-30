import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Cart.module.css";
import CloseIcon from "@mui/icons-material/Close";

function Cart({ set }) {
  const [active, setActive] = useState(true);

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
        <div></div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Cart;