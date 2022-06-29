import React, { useState } from "react";
import styles from "./NavBar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink, Outlet } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import Cart from "../Cart/Cart";

function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  
  return (
    <>
      {openMenu && <SideMenu openMenu={openMenu} set={setOpenMenu} />}
      {openCart && <Cart openMenu={openCart} set={setOpenCart} />}
      <nav className={styles.container}>     
        <button className={styles.menuButton} onClick={(e) => setOpenMenu(true)}><MenuIcon /></button> 
        <NavLink to="/"><button className={styles.mainLogo}></button></NavLink>
        <button className={styles.shopButton} onClick={(e) => setOpenCart(true)}><ShoppingCartIcon /></button>
      </nav>
      <div className={styles.splitter}/>
      <Outlet />
    </>
    
  );
};

export default NavBar; 