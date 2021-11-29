import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { MovieCard } from "../components/movie-card";

import "./home.scss";
import { useSearchMoviesApi } from "../hooks/useSearchMoviesApi";

const HomePage: React.FC = () => {
  const [query, setQuery] = useState("");
  const { movies, searchMovies } = useSearchMoviesApi();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    searchMovies(query);
  }, [query, searchMovies]);

  return (
    <>
      <h1 className="principle-title">Movie Junkie</h1>
      <div className="search">
        <Form.Control
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleTitleChange}
          className="search-input"
        ></Form.Control>
      </div>
      <div className="cards">
        {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
