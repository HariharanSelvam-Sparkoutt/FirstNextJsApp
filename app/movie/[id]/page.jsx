// import { useRouter } from "next/router";

export default async function MovieDetails({ params }) {
  const { id } = params;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?trending/all/day`,

    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );
  const movie = await response.json();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {movie.title}
      </h1>
      <img
        className="mt-4 rounded-lg shadow-lg"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p className="mt-4 text-gray-700 dark:text-gray-400">{movie.overview}</p>
      <p className="mt-2 text-sm text-gray-500">
        Release Date: {movie.release_date}
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Rating: {movie.vote_average} / 10 ({movie.vote_count} votes)
      </p>
      <a
        href="/movie"
        className="mt-4 px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
      >
        Back to Movies
      </a>
    </div>
  );
}
