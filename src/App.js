import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";
import { searchMovies } from './actions/movieActions';

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const { movies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(searchMovies("Inception"));
  }, [dispatch]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchClick = () => dispatch(searchMovies(searchTerm));

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={handleSearchClick}
        />
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
