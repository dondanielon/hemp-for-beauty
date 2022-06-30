import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./SideMenu.module.css"
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";

function SideMenu({ set }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(true);

  const goHome = () => {
    navigate("/");
    set(false);
  };
  const goProducts = () => {
    navigate("/productos");
    set(false);
  };
  const goContact = () => {
    navigate("/contacto");
    set(false);
  };

  const closeMenu = () => {
    setActive(false);
    setTimeout(setToFalse, 299);
  };

  const setToFalse = () => {
    set(false)
  };

  return  ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={closeMenu}/>
      <div className={active ? styles.menu : styles.close}>
        <div className={styles.logoContainer}/>
        <button className={styles.menuButton} onClick={goHome}>
          <HomeIcon/><label className={styles.buttonLabel}>Inicio</label>
        </button>
        <button className={styles.menuButton} onClick={goProducts}>
          <SearchIcon/><label className={styles.buttonLabel}>Productos</label>
        </button>
        <button className={styles.menuButton}>
          <InfoIcon/><label className={styles.buttonLabel}>Nosotros</label>
        </button>
        <button className={styles.menuButton} onClick={goContact}>
          <PhoneIcon/><label className={styles.buttonLabel}>Contactanos</label>
        </button>
        <div className={styles.separator}/>
        <button className={styles.menuButton}>
          <PersonIcon/><label className={styles.buttonLabel}>Iniciar sesion</label>
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default SideMenu;