import React, { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./ProductCard.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions";

function ProductCard(props) {
  const dispatch = useDispatch();
  const [moreInfo, setMoreInfo] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleInfo = () => {
    moreInfo ? setMoreInfo(false) : setMoreInfo(true)
  };

  const lessQuantity = () => {
    if (quantity === 1) setQuantity(1);
    else setQuantity(quantity - 1);
  };

  const moreQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addItem = () => {
    dispatch(addToCart({
      id: props.id,
      name: props.name,
      qty: quantity,
      image: props.image,
      price: props.price
    }))
  };

  return (
    <div className={`${styles.container} ${styles.fade}`}>
      <div className={styles.main}>
        <div className={styles.mainTop}>
          <img className={`${styles.image} ${styles.scaledown}`} src={props.image} alt={props.name} />
          <div className={styles.mainInfo}>
            <label>{props.name}</label>
            <label><label style={{fontSize: "smaller", fontWeight: "500"}}>$</label>{props.price}</label>
            <label style={{fontSize: "small"}}>Contenido: {props.weight}</label>
          </div>
        </div>
        <div className={styles.mainBottom}>
          <div className={styles.addItem}>
            <div className={styles.selectQuantity}>
              <button className={styles.moreless} onClick={lessQuantity}>-</button>
              <div className={styles.quantity}>{quantity}</div>
              <button className={styles.moreless} onClick={moreQuantity}>+</button>
            </div>
            <Button className={styles.addTo} onClick={addItem} startIcon={<ShoppingCartIcon/>}>Agregar al carrito</Button>
          </div>
          <Button className={styles.showInfo} onClick={handleInfo}>{moreInfo ? "Cerrar" : "Mas informacion"}</Button>
        </div>
      </div>
      {
        moreInfo && 
        <div className={moreInfo ? styles.info : styles.hidden}>
          <List className={styles.ingredients} subheader="INGREDIENTES Y BENEFICIOS">
            {
              props.ingredients.map((ingredient) => {
                if (ingredient.description === null) {
                  return (
                    <ListItem key={randomKey()}>
                      <ListItemText primary={ingredient.name}/>
                    </ListItem>
                  );
                } else {
                  return (
                    <ListItem key={randomKey()}>
                      <ListItemText primary={ingredient.name} secondary={ingredient.description}/>
                    </ListItem>
                  );
                }
              })
            }
          </List>
          <List className={styles.specs} subheader="ESPECIFICACIONES">
            {
              props.specs.map((item) => <ListItem key={randomKey()}><ListItemText primary={`- ${item}`}/></ListItem>)
            }
          </List>
        </div>
      }
    </div>
  );
}

function randomKey() {
  const options = ["a", "b", "c", "d", "e"];
  const randomNumber = Math.floor(Math.random() * 50);
  const randomOption = Math.floor(Math.random() * 5);

  return `${randomNumber}${options[randomOption]}${randomNumber}${randomNumber}${options[randomOption]}${randomNumber}`;
}

export default ProductCard;