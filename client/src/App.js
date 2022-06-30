import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<Home />}/>
          <Route path="/productos" element={<Products />} />
          <Route path="/contacto" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
