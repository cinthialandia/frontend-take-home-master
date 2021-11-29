import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovieApi } from "../hooks/useMovieApi";
import { MovieDescription } from "../components/movie-description";

const MoviePage: React.FC = () => {
  const { movie, getMovie } = useMovieApi();

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    getMovie(id);
  }, [id, getMovie]);
  return <>{!movie ? "loading" : <MovieDescription movie={movie} />}</>;
};

export default MoviePage;
