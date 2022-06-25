import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
