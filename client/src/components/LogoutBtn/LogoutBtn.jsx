import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { logOut, setUserData } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogoutBtn({ set }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(logOut());
    dispatch(setUserData({}));
    window.localStorage.removeItem("loggedHempAppUser");
    navigate("/");
    set(false);
  };

  return (
    <button className="menuButton" onClick={signOut}>
      <LogoutIcon/><label className="buttonLabel">Cerrar sesión</label>
    </button>
  );
}

export default LogoutBtn;