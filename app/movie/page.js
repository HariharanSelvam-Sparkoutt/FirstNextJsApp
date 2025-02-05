export default async function Movie() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "X-API-Key": apiKey,
      },
    }
  );
  const data = await response.json();
  const movies = data.results || [];
  console.log(data.results);

  return (
    <div className="flex justify-center flex-col items-center">
      {movies.map((movie) => (
        <div key={movie.id} className="w-full px-4 py-8">
          <section className="bg-gray dark:bg-gray-900">
            <div
              className="flex max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 bg-gray-400"
              style={{ backgroundColor: "" }}
            >
              <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                  {movie.title}
                </h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                  {movie.overview}
                </p>
                <a
                  href={`/movie/${movie.id}`}
                  className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                >
                  More Details
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
              <div>
                <img
                  className="lg:mt-0 lg:col-span-5 lg:flex w-64 h-64"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="mockup"
                />
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}
