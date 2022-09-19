import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./SideMenu.module.css"
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LoginForm from "../LoginForm/LoginForm";
import useAuth from "../../hooks/useAuth";
import UserOptions from "../UserOptions/UserOptions";
import AdminOptions from "../AdminOptions/AdminOptions";

function SideMenu({ set }) {
  const navigate = useNavigate();
  const { isAuthenticated, accessToken, permissions } = useAuth();
  const [active, setActive] = useState(true);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return ()=> document.body.style.overflowY = 'unset';
 }, []);

  const redirectToHome = () => {
    navigate("/");
    set(false);
  };
  const redirectToProducts = () => {
    navigate("/productos");
    set(false);
  };
  const redirectToContact = () => {
    navigate("/contacto");
    set(false);
  };
  const redirectToAboutUs = () => {
    navigate("/nosotros");
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
        <button className="menuButton" onClick={redirectToHome}>
          <HomeIcon/><label className="buttonLabel">Inicio</label>
        </button>
        <button className="menuButton" onClick={redirectToProducts}>
          <SearchIcon/><label className="buttonLabel">Productos</label>
        </button>
        <button className="menuButton" onClick={redirectToAboutUs}>
          <svg className={styles.mainLogo}/><label className="buttonLabel">Nosotros</label>
        </button>
        <button className="menuButton" onClick={redirectToContact}>
          <EmailIcon/><label className="buttonLabel">Contactanos</label>
        </button>
        <div className={styles.separator}/>
        {
          isAuthenticated && permissions ? (
            <AdminOptions set={set} styles={styles}/>
          ) : isAuthenticated && !permissions ? (
            <UserOptions set={set} styles={styles}/>
          ) : login && !isAuthenticated ? (
            <LoginForm />
          ) : (
            <button className="menuButton" onClick={() => setLogin(true)}>
              <PersonIcon/><label className="buttonLabel">Iniciar sesion</label>
            </button>
          )
        }
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default SideMenu;