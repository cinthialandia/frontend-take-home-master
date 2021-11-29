import debounce from "debounce";
import { useCallback, useState } from "react";
import { MovieSearchResult } from "../types";

export const useSearchMoviesApi = () => {
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);

  const searchMovies = useCallback(
    debounce(async (q: string) => {
      let response = await fetch(
        `http://www.omdbapi.com/?s=${q}&apikey=320f6ab2`
      );

      let movies = await response.json();
      if (movies.Response === "False") {
        return;
      }
      setMovies(movies.Search);
    }, 500),
    []
  );

  return { movies, searchMovies };
};
