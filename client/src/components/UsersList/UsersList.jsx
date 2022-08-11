import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersList } from "../../redux/actions";
import useAuth from "../../hooks/useAuth";
import styles from "./UsersList.module.css";

function UsersList() {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);
  const { accessToken } = useAuth();

  useEffect(() => {
    if (usersList.length || !accessToken) return;
    dispatch(getUsersList(accessToken));
  }, [dispatch, accessToken])
  

  return (
    <div className={styles.content}>
      <div className={styles.labels}>
        <div className={styles.labelName}>Nombre</div>
        <div className={styles.labelName}>Apellido</div>
        <div className={styles.labelEmail}>Correo</div> 
      </div>
      <ul className={styles.list}>
        {usersList?.map((user) => {
          return (
            <li key={user.id} className={styles.itemList}>               
              <div className={styles.listName}>{user.firstName}</div>
              <div className={styles.listName}>{user.lastName}</div>
              <div className={styles.listEmail}>{user.email}</div>               
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UsersList;