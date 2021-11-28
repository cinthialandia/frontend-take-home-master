import { Link, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./home";
import MovieResult from "./movie-result";
import logo from "../src/logo.png";

function App() {
  return (
    <div className="app">
      <div className="logo">
        <Link to="/">
          <img className="loguito" src={logo} alt="Poster" />
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieResult />} />
      </Routes>
    </div>
  );
}

export default App;
