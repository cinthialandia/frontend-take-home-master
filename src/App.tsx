import { Link, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/home";
import MoviePage from "./pages/movie";
import logo from "../src/logo.png";

function App() {
  return (
    <div className="app">
      <div className="logo">
        <Link to="/">
          <img className="logp-container" src={logo} alt="Poster" />
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </div>
  );
}

export default App;
