import { useCallback, useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FcFilmReel } from "react-icons/fc";
import { BsDot } from "react-icons/bs";
import { FaTheaterMasks } from "react-icons/fa";
import { AiFillTrophy } from "react-icons/ai";

import "./movie-result.scss";

type Movie = {
  Actors: string;
  Awards: string;
  Director: string;
  Genre: string;
  Plot: string;
  Rated: string;
  imdbRating: string;
  Title: string;
  imdbID: string;
  Poster: string;
  Year: string;
};

const MovieResult: React.FC = () => {
  const [movie, setMovie] = useState<Movie>();

  const actorsSplit = movie?.Actors.split(",");
  console.log(actorsSplit);

  console.log(movie?.Actors);

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
      <div className="movie-title-and-year">
        <h1>{movie?.Title}</h1>
        <h4>{movie?.Year}</h4>
      </div>
      <div className="metadata">
        <Badge bg="secondary">{movie?.Rated}</Badge>
        <Badge bg="secondary">{movie?.imdbRating}</Badge>
      </div>

      <div className="movie-img">
        <img src={movie?.Poster} alt="Poster" />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="description-movie">
          <div className="actors">
            {actorsSplit?.map((actor) => (
              <div>
                <Badge bg="secondary">{actor}</Badge>
              </div>
            ))}
          </div>
          <div className="plot">{movie?.Plot}</div>

          <div>
            <FcFilmReel /> Director <BsDot />
            {`${movie?.Director}`}
          </div>
          <div>
            <FaTheaterMasks /> Genre <BsDot />
            {`${movie?.Genre}`}
          </div>

          <div>
            <AiFillTrophy /> Awards <BsDot />
            {`${movie?.Awards}`}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieResult;
