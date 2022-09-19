import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
import styles from "./ManageProducts.module.css"
import useAuth from "../../hooks/useAuth";
import { addStock, removeStock } from "../../services";
import { Oval } from "react-loader-spinner";

function ManageProducts() {
  const { accessToken } = useAuth();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [productId, setProductId] = useState("");
  const [productStock, setProductStock] = useState("");
  const [quantity, setQuantity] = useState("");
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (products.length) return;
    dispatch(getProducts());
  }, [products]);

  useEffect(() => {
    if (productId && productStock && quantity > 0) setAddButtonDisabled(false);
    else setAddButtonDisabled(true);
  }, [productId, productStock, quantity]);

  const handleAddSelectionChange = (e) => {
    const values = e.target.value.split(" ");
    setProductId(values[0]);
    setProductStock(values[1]);
  };

  const handleAddQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const addRequest = async () => {
    try {
      setLoader(true);
      await addStock(parseInt(productId), parseInt(quantity), accessToken);
      setLoader(false);
      dispatch(getProducts());
      setProductId("");
      setQuantity("");
      setProductStock("");
      setMessage("producto actualizado");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const removeRequest = async () => {
    try {
      setLoader(true);
      await removeStock(parseInt(productId), parseInt(quantity), accessToken);
      setLoader(false);
      dispatch(getProducts());
      setProductId("");
      setQuantity("");
      setProductStock("");
      setMessage("producto actualizado");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return ( 
    <div className={loader ? styles.loaderContainer : styles.options}>
      {
        loader ? (
          <Oval color="#f38e82" secondaryColor="#FFB3AB" height={60} width={60} />
        ) : (
          <>
            <label className={styles.subtitle}>Agregar o remover stock:</label>
            <div className={styles.stockManager}>
              <div className={styles.stockManagerOption}>
                <label className={styles.optionTitle}>Producto</label>
                <select name="product-selection" value={`${productId} ${productStock}`} className={styles.optionsSelect} onChange={handleAddSelectionChange}>
                  <option value="" hidden>Seleccionar producto</option>
                  {
                    products?.map((item) => {
                      return (
                        <option 
                          key={item.id} value={`${item.id} ${item.stock}`}>{item.name}</option>
                      );
                    })
                  }
                </select>
              </div>
              <div className={styles.stockManagerOption}>
                <label className={styles.optionTitle}>Stock</label>
                <label>{productStock}</label>
              </div>
              <div className={styles.stockManagerOption}>
                <label className={styles.optionTitle}>Cantidad</label>
                <input 
                  type="number"  
                  className={styles.quantity} 
                  value={quantity} 
                  onChange={handleAddQuantity}
                />
              </div>
              <div className={styles.buttons}>
                <label className={styles.message}>{message}</label>
                <button 
                  className={addButtonDisabled ? styles.disabledBtn : styles.add} 
                  disabled={addButtonDisabled} 
                  onClick={addRequest}
                >
                  Agregar
                </button>
                <button 
                  className={addButtonDisabled ? styles.disabledBtn : styles.remove} 
                  disabled={addButtonDisabled}
                  onClick={removeRequest}
                >
                  Remover
                </button>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
}

export default ManageProducts;