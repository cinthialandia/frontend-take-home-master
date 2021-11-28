import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Movie = {
  Actors: string;
  Awards: string;
  boxOffice: string;
  Director: string;
  Genre: string;
  Plot: string;
  Rated: string;
  Rating: [];
  imdbRating: string;
  Title: string;
  imdbID: string;
  Poster: string;
  Type: string;
  Year: string;
};

const MovieResult: React.FC = () => {
  const [movie, setMovie] = useState<Movie>();

  const { id } = useParams();

  const getInformation = useCallback(async (id: string) => {
    let response = await fetch(
      `http://www.omdbapi.com/?i=${id}&apikey=320f6ab2`
    );

    let movie = await response.json();
    if (movie.Response === "False") {
      return;
    }
    setMovie(movie);
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    getInformation(id);
  }, [id, getInformation]);
  return (
    <>
      <Link to={"/"}>Back to search</Link>
      <div>{movie?.Title}</div>
      <img src={movie?.Poster} alt="Poster" />
      <div>{movie?.Type}</div>
      <div>{movie?.Year}</div>
      <div>{movie?.Director}</div>
      <div>{movie?.Genre}</div>
      <div>{movie?.Plot}</div>
      <div>{movie?.Actors}</div>
      <div>{movie?.Awards}</div>
      <div>{movie?.boxOffice}</div>
      <div>{movie?.Rated}</div>
      <div>{movie?.imdbRating}</div>
    </>
  );
};

export default MovieResult;
