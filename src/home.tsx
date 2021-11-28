import debounce from "debounce";
import { useCallback, useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./home.scss";

interface Movies {
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
  imdbID: string;
}

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const [totalResults, setTotalResults] = useState<Movies[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    console.log(query);
  };

  const moviesApi = useCallback(
    debounce(async (q: string) => {
      let response = await fetch(
        `http://www.omdbapi.com/?s=${q}&apikey=320f6ab2`
      );

      let movies = await response.json();
      if (movies.Response === "False") {
        return;
      }
      setTotalResults(movies.Search);
    }, 500),
    []
  );

  useEffect(() => {
    if (!query) {
      return;
    }
    moviesApi(query);
  }, [query, moviesApi]);

  return (
    <>
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
        {totalResults.map(({ Title, imdbID, Poster, Type, Year }) => (
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
