import React from "react";
import ReactDOM from "react-dom";
import styles from "./SideMenu.module.css"
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";

function SideMenu({ open, set }) {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
    set(false)
  };
  const goProducts = () => {
    navigate("/productos");
    set(false)
  };
  const goAbout = () => {
    navigate("/about");
    set(false)
  };

  return  ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={(e) => set(false)}/>
      <div className={styles.menu}>
        <div className={styles.logoContainer}>
            <p>LOGO</p>
        </div>
        <button onClick={goHome} className={styles.menuButton}><HomeIcon/><label className={styles.buttonLabel}>Inicio</label></button>
        <button onClick={goProducts} className={styles.menuButton}><SearchIcon/><label className={styles.buttonLabel}>Productos</label></button>
        <button onClick={goAbout} className={styles.menuButton}><InfoIcon/><label className={styles.buttonLabel}>About</label></button>
        <button onClick={goAbout} className={styles.menuButton}><PhoneIcon/><label className={styles.buttonLabel}>Contactanos</label></button>
        <div className={styles.separator}/>
        <button className={styles.menuButton}><PersonIcon/><label className={styles.buttonLabel}>Iniciar sesion</label></button>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default SideMenu;