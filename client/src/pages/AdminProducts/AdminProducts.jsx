import React from "react";
import ManageProducts from "../../components/ManageProducts/ManageProducts";
import styles from "./AdminProducts.module.css";

function AdminProducts() {
  return (
    <div className="admin-page">
      <div className={styles.container}>
        <label className={styles.title}>ADMINISTRAR PRODUCTOS</label>
        <ManageProducts />
        <div className={styles.separator}/>
      </div>
    </div>
  );
}

export default AdminProducts;