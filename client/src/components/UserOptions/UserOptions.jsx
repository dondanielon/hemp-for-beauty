import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import { useNavigate } from "react-router-dom";


function UserOptions({ set }) {
  const navigate = useNavigate();

  const redirectToProfile = () => {
    navigate("/perfil");
    set(false);
  };

  return (
    <>
      <button className="menuButton" onClick={redirectToProfile}>
        <PersonIcon/><label className="buttonLabel">Perfil</label>
      </button>
      <button className="menuButton">
        <LocalShippingIcon/><label className="buttonLabel">Mis pedidos</label>
      </button>
      <LogoutBtn set={set}/>
    </>
  );
}

export default UserOptions;