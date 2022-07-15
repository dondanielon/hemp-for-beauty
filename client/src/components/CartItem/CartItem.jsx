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
      {/* AQUI VA LA IMAGEN */}
      <div className={styles.info}>
        <label>{props.name}</label>
        <label>Cantidad: {props.qty}</label>
      </div>
      <button onClick={removeItem}><DeleteForeverIcon/></button>
    </div>
  );
}

export default CartItem;