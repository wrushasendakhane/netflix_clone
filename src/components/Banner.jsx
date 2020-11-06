import React, { useEffect, useState } from "react";
import axios from "../requests/axios";
import requests from "../requests/requests";
import "./Banner.css";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function truncate(str, num) {
  return str?.length > num ? str.slice(0, num) + "..." : str;
}

function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );
    };
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${IMAGE_BASE_URL}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <div className="banner__button">Play</div>
          <div className="banner__button">My List</div>
        </div>
        <div className="banner__description">
          {truncate(movie?.overview, 150)}
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}
export default Banner;
