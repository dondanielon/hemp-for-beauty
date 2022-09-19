import React from "react";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AssignmentIcon from "@mui/icons-material/Assignment";

function AdminOptions({ set }) {
  const navigate = useNavigate();

  const redirectToAdminUsers = () => {
    navigate("/admin-usuarios");
    set(false);
  };
  
  const redirectToAdminOrders = () => {
    navigate("/admin-pedidos");
    set(false);
  };

  const redirectToAdminProducts = () => {
    navigate("/admin-productos");
    set(false);
  };


  return (
    <>
      <button className="menuButton" onClick={redirectToAdminOrders}>
        <AttachMoneyIcon/><label className="buttonLabel">Pedidos</label>
      </button>
      <button className="menuButton" onClick={redirectToAdminProducts}>
        <AssignmentIcon/><label className="buttonLabel">Administrar productos</label>
      </button>
      <button className="menuButton" onClick={redirectToAdminUsers}>
        <GroupIcon/><label className="buttonLabel">Usuarios</label>
      </button>
      <LogoutBtn set={set}/>
    </>
  );
}

export default AdminOptions;