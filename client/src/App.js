import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Contact from './pages/Contact/Contact';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    white: {
      main: "#F6F6F6"
    },
    lightPink: {
      main: "#FFE2E2"
    },
    pink: {
      main: "#FFB3AB"
    },
    lightGrey: {
      main: "#AAAAAA"
    },
    text: {
      main: "#696969"
    },
    darkGrey: {
      main: "#363636"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="/" element={<Home />}/>
            <Route path="/productos" element={<Products />} />
            <Route path="/contacto" element={<Contact />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
