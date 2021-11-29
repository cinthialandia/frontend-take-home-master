import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./home.scss";
import { useSearchMoviesApi } from "./hooks/useSearchMoviesApi";

const Home: React.FC = () => {
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
        {movies.map(({ Title, imdbID, Poster, Year }) => (
          <Card key={imdbID} className="card">
            <Card.Img className="card-img" variant="top" src={Poster} />
            <Card.Body className="card-body">
              <Card.Title className="card-title">
                <Link className="card-link" to={`/movie/${imdbID}`}>
                  {Title}
                </Link>
                <Card.Text>{Year}</Card.Text>
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
