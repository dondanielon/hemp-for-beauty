import React, { useState, useEffect } from "react";
import styles from "./CartItem.module.css";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch } from "react-redux";
import { removeSpecificToCart, addSpecificToCart } from "../../redux/actions";

function CartItem(props) {
  const dispatch = useDispatch();
  const [stockLimit, setStockLimit] = useState(false);

  useEffect(() => {
    if (props.qty >= props.stock) setStockLimit(true);
    else setStockLimit(false);
  }, [props])

  return (
    <div className={styles.container}>
      <img className={styles.image} src={props.image} alt={props.name} />
      <div className={styles.info}>
        <label className={styles.infoName}>{props.name}</label>
        <label className={styles.infoLabel}>Precio: ${props.price}</label>
        <label className={styles.infoLabel}>Cantidad: {props.qty}</label>
      </div>
      <div className={styles.btns}>
        <button className={styles.remove} onClick={() => dispatch(removeSpecificToCart(props.id, 1))}><RemoveCircleIcon/></button>
        <button className={stockLimit ? styles.disabled : styles.add} onClick={() => dispatch(addSpecificToCart(props.id, 1))} disabled={stockLimit}><AddCircleIcon/></button>
      </div>
    </div>
  );
}

export default CartItem;