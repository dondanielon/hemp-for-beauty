import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Contact from './pages/Contact/Contact';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from './components/Footer/Footer';
import About from './pages/About/About';
import UserProfile from "./pages/UserProfile/UserProfile";
import UserOrders from "./pages/UserOrders/UserOrders";
import AdminUsers from "./pages/AdminUsers/AdminUsers";
import AdminOrders from "./pages/AdminOrders/AdminOrders";
import AdminProducts from "./pages/AdminProducts/AdminProducts";
import AdminMail from "./pages/AdminMail/AdminMail";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, getProducts, setCartListWithLocalStorage } from './redux/actions';
import { UserProtectedRoutes, AdminProtectedRoutes } from './ProtectedRoutes';
import CompleteOrder from './pages/CompleteOrder/CompleteOrder';

const theme = createTheme({
  palette: {
    white: { main: "#F6F6F6" },
    lightPink: { main: "#FFE2E2" },
    pink: { main: "#FFB3AB" },
    lightGrey: { main: "#AAAAAA" },
    text: { main: "#696969" },
    darkGrey: { main: "#363636" },
    darkPink: { main: "#F38E82" }
  }
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());

    const loggedUserJSON = window.localStorage.getItem("loggedHempAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(logIn(user));
    }

    const today = new Date();
    const expirationFromLocal = window.localStorage.getItem("expiration-date-cart-list");
    const listFromLocalStorageJSON = window.localStorage.getItem("hempCartList");

    if (expirationFromLocal && listFromLocalStorageJSON) {
      const list = JSON.parse(listFromLocalStorageJSON);
      const expirationDate = new Date(expirationFromLocal)

      if (today > expirationDate) {
        window.localStorage.removeItem("hempCartList");
        window.localStorage.removeItem("expiration-date-cart-list");
      } else {
        dispatch(setCartListWithLocalStorage(list));
      }
    }

  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="/" element={<Footer />}>
              <Route path="/" element={<Home />}/>
              <Route path="/productos" element={<Products />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/nosotros" element={<About />} />
              <Route element={<UserProtectedRoutes/>}>
                <Route path="/perfil" element={<UserProfile/>}/>
                <Route path="/pedidos" element={<UserOrders/>}/>
              </Route>
            </Route>
            <Route element={<AdminProtectedRoutes/>}>
              <Route path="/admin-usuarios" element={<AdminUsers/>}/>
              <Route path="/admin-pedidos" element={<AdminOrders/>}/>
              <Route path="/admin-productos" element={<AdminProducts/>}/>
              <Route path="/admin-mail" element={<AdminMail/>}/>
            </Route> 
          </Route>
          <Route path="/proceso-compra" element={<CompleteOrder/>}/>
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
