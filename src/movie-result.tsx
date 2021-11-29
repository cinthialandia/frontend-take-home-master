import { useEffect } from "react";
import { Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FcFilmReel } from "react-icons/fc";
import { BsDot } from "react-icons/bs";
import { FaTheaterMasks } from "react-icons/fa";
import { AiFillTrophy } from "react-icons/ai";

import "./movie-result.scss";
import { useMovieApi } from "./hooks/useMovieApi";

const MovieResult: React.FC = () => {
  const { movie, getMovie } = useMovieApi();

  const actorsSplit = movie?.Actors.split(",");
  console.log(actorsSplit);

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    getMovie(id);
  }, [id, getMovie]);
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
