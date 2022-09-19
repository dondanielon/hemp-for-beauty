import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Cart.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import { removeClientInfo } from "../../redux/actions";

function Cart({ set }) {
  const navigate = useNavigate();
  const cartList = useSelector((state) => state.cartList);
  const products = useSelector((state) => state.products);
  const [active, setActive] = useState(true);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "unset");
  }, []);

  useEffect(() => {
    let total = 0;
    cartList.map((item) => (total += item.price * item.qty));
    setTotal(total);
  }, [cartList]);

  const closeMenu = () => {
    setActive(false);
    setTimeout(setToFalse, 299);
  };

  const setToFalse = () => {
    set(false);
  };

  const accessBuyProcess = () => {
    dispatch(removeClientInfo());
    navigate("/proceso-compra");
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={(e) => closeMenu()} />
      <div className={active ? styles.cart : styles.close}>
        <div className={styles.closeDiv}>
          <button className={styles.closeBtn} onClick={(e) => closeMenu()}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.list}>
          {cartList.length ? (
            cartList.map((product) => {
              const stockAvaliable = products.find(
                (item) => item.id === product.id
              ).stock;

              return (
                <CartItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  qty={product.qty}
                  image={product.image}
                  price={product.price}
                  stock={stockAvaliable}
                />
              );
            })
          ) : (
            <p className={styles.empty}>El carrito esta vacio.</p>
          )}
          {cartList.length ? (
            <div className={styles.total}>
              <label className={styles.amount}>Total: ${total}</label>
              <button className={styles.checkout} onClick={accessBuyProcess}>
                Proceder al pago
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Cart;
