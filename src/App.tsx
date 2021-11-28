import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./home";
import MovieResult from "./movie-result";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieResult />} />
      </Routes>
    </>
  );
}

export default App;
