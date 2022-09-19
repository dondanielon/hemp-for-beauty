import React, { useState } from "react";
import styles from "./AdminOrders.module.css";
import useAuth from "../../hooks/useAuth";

function AdminOrders() {
  const { isAuthenticated, accessToken } = useAuth();
  const [orderMail, setOrderMail] = useState("");
  const [orderState, setOrderState] = useState("");
  const [orderDate, setOrderDate] = useState("");

  return (
    <div className="admin-page">
      <div className={styles.container}>
        <label className={styles.title}>ORDENES</label>
        <div className={styles.options}>
          <div>
            <label className={styles.tag}>Email: </label>
            <input
              className={styles.input}
              type="text"
              value={orderMail}
              name="mail"
              onChange={(e) => setOrderMail(e.target.value)}
            />
          </div>
          <div className={styles.filters}>
            <label className={styles.tag}>Estado:</label>
            <select
              name="estado"
              id="state"
              className={styles.input}
              value={orderState}
              onChange={(e) => setOrderState(e.target.value)}
              style={{ width: "8rem" }}
            >
              <option value="">Todos</option>
              <option value="succeeded">Pagado</option>
              <option value="failed">Pago rechazado</option>
              <option value="processing">Procesando</option>
              <option value="sending">Enviado</option>
            </select>

            <label className={styles.tag}>Fecha:</label>
            <input
              type="date"
              className={styles.input}
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              style={{ width: "6.5rem" }}
            />
          </div>
          <button className={styles.btn}>Buscar</button>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
