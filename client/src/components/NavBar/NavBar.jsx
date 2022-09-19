import React, { useState, useEffect } from "react";
import styles from "./NavBar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { NavLink, Outlet } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";

function NavBar() {
  const cartList = useSelector((state) => state.cartList);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [items, setItems] = useState(0);

  useEffect(() => {
    let count = 0;
    cartList.map((option) => count += option.qty)
    setItems(count)
  }, [cartList]);
  
  return (
    <>
      {openMenu && <SideMenu openMenu={openMenu} set={setOpenMenu} />}
      {openCart && <Cart openMenu={openCart} set={setOpenCart} />}
      <nav className={styles.container}>     
        <button className={styles.menuButton} onClick={(e) => setOpenMenu(true)}>
          <MenuIcon />
        </button> 
        <NavLink to="/"><button className={styles.mainLogo}></button></NavLink>
        <button className={styles.shopButton} onClick={(e) => setOpenCart(true)}>
          <Badge  badgeContent={items} color="pink"  anchorOrigin={{ vertical: 'top',horizontal: 'left' }}>
            <ShoppingCartIcon />
          </Badge>
        </button>
      </nav>
      <div className={styles.splitter}/>
      <Outlet />
    </>
    
  );
};

export default NavBar; 