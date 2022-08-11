import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { setUserData } from "../redux/actions";

const ADMIN_ROLE = process.env.REACT_APP_ADMIN_ROLE;
const USER_ROLE = process.env.REACT_APP_USER_ROLE;

function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userData = useSelector((state) => state.userData);
  const [decoded, setDecoded] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccesToken] = useState(null);
  const [permissions, setPermissions] = useState(false);

  useEffect(() => {
    if (user?.token) {
      const tokenDecoded = jwt_decode(user.token);
      setDecoded(tokenDecoded);
      setAccesToken(user.token);

    } else {
      setAccesToken(null);
      setDecoded({});
    }
  }, [user]);

  useEffect(() => {
    if (decoded?.email && decoded?.name && decoded?.role) {
      setIsAuthenticated(true);
      if (!userData.hasOwnProperty("name")) dispatch(setUserData({ name: decoded.name, email: decoded.email }));
    }
    else {
      setIsAuthenticated(false);
    }

    if (decoded.role === ADMIN_ROLE) setPermissions(true);
    if (decoded.role === USER_ROLE) setPermissions(false);
  }, [decoded]);

  return { isAuthenticated, accessToken, permissions };
}

export default useAuth;