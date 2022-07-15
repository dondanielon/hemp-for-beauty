import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <label className={styles.title}>HEMP FOR BEAUTY</label>
        <label>
          Sabemos el cuidado que cada una merece, somos una empresa mexicana que se lleva bien con la
          madre tierra, ella es nuestra máxima proveedora de magia verde, el CBD es nuestro ingrediente
          estrella.
        </label>
        <div className={styles.social}>
          <button className={styles.socialBtn}><InstagramIcon fontSize="large"/></button>
          <button className={styles.socialBtn}><FacebookIcon fontSize="large"/></button>
        </div>
      </div>
      <div className={styles.divider}/>
      <div className={styles.menu}>
        <label className={styles.title}>MENU</label>
        <NavLink to="/productos" className={styles.option}>Productos</NavLink>
        <NavLink to="/nosotros" className={styles.option}>Nosotros</NavLink>
        <NavLink to="/contacto" className={styles.option}>Contactanos</NavLink>
        <NavLink to="/" className={styles.option}>Pagos y Envíos</NavLink>
        <NavLink to="/" className={styles.option}>Cambios y devoluciones</NavLink>
        <NavLink to="/" className={styles.option}>Políticas de Privacidad</NavLink>
      </div>
    </div>
  );
}

export default Footer;