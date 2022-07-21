import React from "react";
import styles from "./CartItem.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions";

function CartItem(props) {
  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(removeFromCart(props.id))
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={props.image} alt={props.name} />
      <div className={styles.info}>
        <label className={styles.infoName}>{props.name}</label>
        <label className={styles.infoLabel}>Precio: ${props.price}</label>
        <label className={styles.infoLabel}>Cantidad: {props.qty}</label>
      </div>
      <button className={styles.remove} onClick={removeItem}><DeleteForeverIcon/></button>
    </div>
  );
}

export default CartItem;