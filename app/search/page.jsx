"use client"; // Ensure it's a client component for Next.js

import Link from "next/link";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

  const searchMovies = async (e) => {
    e.preventDefault(); // Prevent page refresh

    if (!query.trim()) return; // Avoid empty searches

    try {
      const response = await fetch(
        `${API_URL}&query=${encodeURIComponent(query)}&include_adult=false`
      );
      const data = await response.json();

      if (data.results) {
        setMovies(data.results); // Store movie results
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold my-4">Search Movies</h1>

      <form className="max-w-md w-full mx-auto" onSubmit={searchMovies}>
        <label htmlFor="default-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm border rounded-lg"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 px-4 py-2 rounded-lg"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Display Search Results */}
      <div className="w-full mt-4">
        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="w-full bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  className="w-full h-96 object-cover rounded-t-lg"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="p-4">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {movie.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {movie.overview}
                  </p>
                  <Link href={`/movie/${movie.id}`}>
                    <button
                      onClick={() => {}}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      More Details
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">No movies found</p>
        )}
      </div>
    </div>
  );
}
