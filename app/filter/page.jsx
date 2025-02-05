"use client"; // Required for Next.js App Router

import { useState, useEffect } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieFilter() {
  const [genres, setGenres] = useState([]); // Ensure it's an empty array initially
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch genres from API
  useEffect(() => {
    fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.genres || []); // Ensure genres is always an array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
        setLoading(false);
      });
  }, []);

  // Fetch movies based on selected genre
  useEffect(() => {
    if (selectedGenre) {
      setLoading(true);
      fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results || []); // Ensure movies is always an array
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
          setLoading(false);
        });
    }
  }, [selectedGenre]);

  return (
    <div className="p-4">
      {/* Show a loader while fetching data */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* Genre Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {genres.length > 0
          ? genres.map((genre) => (
              <button
                key={genre.id}
                className={`px-4 py-2 rounded-lg ${
                  selectedGenre === genre.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setSelectedGenre(genre.id)}
              >
                {genre.name}
              </button>
            ))
          : !loading && <p className="text-gray-500">No genres found.</p>}
      </div>

      {/* Movie List */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.length > 0
          ? movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 text-white p-3 rounded-lg"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto rounded-md"
                />
                <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
              </div>
            ))
          : !loading && (
              <p className="text-gray-500">No movies found for this genre.</p>
            )}
      </div>
    </div>
  );
}
