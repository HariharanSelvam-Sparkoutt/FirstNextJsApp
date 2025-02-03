export default async function Movie() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "X-API-Key": apiKey, // Replace with the actual header name required by the API
      },
    }
  );
  const data = await response.json();
  const movies = data.results || [];
  console.log(data.results);

  return (
    <div className="flex justify-center flex-col items-center">
      {movies.map((movie) => (
        <div key={movie.id}>
          <div className="max-w-sm m-3  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-center">
              <a href="#">
                <img
                  className="rounded-t-lg w-48 h-34 flex items-center rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="image"
                />
              </a>
            </div>

            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {movie.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {movie.overview}
              </p>
              <a
                href={`/movie/${movie.id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                More
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
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
