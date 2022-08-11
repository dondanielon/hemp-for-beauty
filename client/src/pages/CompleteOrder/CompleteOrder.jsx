import React, { useEffect } from "react";
import OrderSteps from "../../components/OrderSteps/OrderSteps";
import styles from "./CompleteOrder.module.css";

function CompleteOrder() {
  useEffect(() => {
    document.body.style.backgroundColor = "#363636";
    return () => document.body.style.backgroundColor = "#F6F6F6";
  }, []);

  return (
    <div className="admin-page">
      <div className={styles.container}>
        <label htmlFor="title" className={styles.title}>PROCESO DE COMPRA</label>
        <OrderSteps />
      </div>
    </div>
  );
}

export default CompleteOrder;