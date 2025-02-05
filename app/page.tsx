"use client";

import Image from "next/image";
import Link from "next/link";
// import Home from "./home/page";
import movie from "./movie/page";
import { useRouter } from "next/router";
export default function Home() {
  // const router = useRouter();

  // const navToMovies = () => {
  //   router.push("/movie");
  // };
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Start exploring now and find your next favorite film! 🍿
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Your ultimate destination for exploring movies! Discover trending
            films, top-rated hits, and your favorite genres—all in one place.
            Whether you're searching for the latest blockbusters or hidden gems,
            our curated collection ensures you never miss a great movie
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
           <Link href={"/movie"}> <button
              // onClick={navToMovies}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Click to see List of Movies
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
            </button></Link>
           
          </div>
        </div>
      </section>
    </>
  );
}
function navToMovies() {
  throw new Error("Function not implemented.");
}
