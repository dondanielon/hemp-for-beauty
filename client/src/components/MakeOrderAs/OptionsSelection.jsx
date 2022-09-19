import React from "react";
import styles from "./MakeOrderAs.module.css";
import useAuth from "../../hooks/useAuth";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from "react-redux";
import { removeClientInfo } from "../../redux/actions";

function OptionsSelection({ setSelection, selection }) {
  const { isAuthenticated } = useAuth();
  const userData = useSelector((state) => state.userData);
  const clientInfo = useSelector((state) => state.clientInfo);
  const dispatch = useDispatch();

  const handleSignedInAction = (e) => {
    e.preventDefault();
    dispatch(removeClientInfo());
    setSelection("SELECT_BUY_AS_USER");
  };

  const handlePickGuest = (e) => {
    e.preventDefault();
    setSelection("SELECT_BUY_AS_GUEST");
  }

  const handleNotSignedInAction = (e) => {
    e.preventDefault();
    dispatch(removeClientInfo());
    setSelection("SELECT_LOGIN_REGISTER");
  };

  const handleGuestSelection = (e) => {
    e.preventDefault();
    dispatch(removeClientInfo());
    setSelection("SELECT_SET_GUEST_INFO");
  }

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }

  return (
    <>
      <button className={selection === "SELECT_BUY_AS_USER" ? styles.selected : styles.selection} onClick={ isAuthenticated ? handleSignedInAction : handleNotSignedInAction}>
        <div className={styles.selectionTitle}>
          <PersonOutlineIcon />
          <label style={{"cursor": "pointer"}}>Comprar como usuario {isAuthenticated ? userData?.name : ""}</label>
        </div>
        {
          !isAuthenticated ? (
            <div className={styles.selectionInfo}>
              Comprar como usuario te permite ver la informacion de tu pedido a través de tu portal. Selecciona esta opcion para ingresar a tu cuenta o crear una nueva.
            </div>
          ) : null
        }
      </button>

      <button className={selection === "SELECT_BUY_AS_GUEST" ? styles.selected : styles.selection} onClick={isEmpty(clientInfo) ? handleGuestSelection : handlePickGuest}>
        <div className={styles.selectionTitle}>
          <MailOutlineIcon />
          <label style={{"cursor": "pointer"}}>Comprar como {isEmpty(clientInfo) ? "invitado" : clientInfo.email}</label>
        </div>
        <div className={styles.selectionInfo}>
          {
            isEmpty(clientInfo) 
              ? "Al comprar como invitado toda la informacion de tu pedido se enviara solo por correo electronico, tambien tendras que proporcionar un número de teléfono en caso que tengamos que comunicarnos contigo."
              : ""
          }
        </div>
      </button>
    </>
  );
}

export default OptionsSelection;