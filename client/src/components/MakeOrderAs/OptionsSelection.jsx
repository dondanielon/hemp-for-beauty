import React from "react";
import styles from "./MakeOrderAs.module.css";
import useAuth from "../../hooks/useAuth";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useSelector } from "react-redux";

function OptionsSelection({ setSelection, stepCompleted, setStepCompleted }) {
  const { isAuthenticated } = useAuth();
  const userData = useSelector((state) => state.userData);

  const handleSignedInAction = (e) => {
    e.preventDefault();
    setStepCompleted(true);
  };

  const handleNotSignedInAction = (e) => {
    e.preventDefault();
    setSelection("user-not-logged");
  };

  const handleGuestSelection = (e) => {
    e.preventDefault();
    setStepCompleted(false);
    setSelection("guest");
  }

  return (
    <>
      <button className={stepCompleted ? styles.selected : styles.selection} onClick={ isAuthenticated ? handleSignedInAction : handleNotSignedInAction}>
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

      <button className={styles.selection} onClick={handleGuestSelection}>
        <div className={styles.selectionTitle}>
          <MailOutlineIcon />
          <label style={{"cursor": "pointer"}}>Comprar como invitado</label>
        </div>
        <div className={styles.selectionInfo}>
          Al comprar como invitado toda la informacion de tu pedido se enviara solo por correo electronico, tambien tendras que proporcionar un número de teléfono en caso que tengamos
          que comunicarnos contigo.
        </div>
      </button>
    </>
  );
}

export default OptionsSelection;