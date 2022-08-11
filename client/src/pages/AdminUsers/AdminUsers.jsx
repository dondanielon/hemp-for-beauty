import React from "react";
import UsersList from "../../components/UsersList/UsersList";
import styles from "./AdminUsers.module.css";

function AdminUsers() {
  return (
    <div className="admin-page">
      <div className={styles.container}>
        <label className={styles.title}>LISTA DE USUARIOS REGISTRADOS</label>
        <UsersList />
      </div>
    </div>
  );
}

export default AdminUsers;