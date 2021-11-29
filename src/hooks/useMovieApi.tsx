import { useCallback, useState } from "react";
import { Movie } from "../types";

export const useMovieApi = () => {
  const [movie, setMovie] = useState<Movie>();

  const getMovie = useCallback(async (id: string) => {
    let response = await fetch(
      `http://www.omdbapi.com/?i=${id}&apikey=320f6ab2`
    );

    let movie = await response.json();
    if (movie.Response === "False") {
      return;
    }
    setMovie(movie);
  }, []);

  return { movie, getMovie };
};
