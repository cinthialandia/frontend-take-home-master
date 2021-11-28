import debounce from "debounce";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <div>hole betches!</div>
      <input type="text" value={query} onChange={handleTitleChange} />
      {totalResults.map(({ Title, imdbID, Poster, Type, Year }) => (
        <div key={imdbID}>
          <Link to={`/movie/${imdbID}`}>{Title}</Link>
          <img src={Poster} alt="Poster" />
          <div>{Type}</div>
          <div>{Year}</div>
        </div>
      ))}
    </>
  );
};

export default Home;
