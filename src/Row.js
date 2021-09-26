import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const baseurl = "http://image.tmdb.org/t/p/w500";

function Row({ title, fetchUrl, isLargeRow}) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    //you can't use async function inside use effect so you to make an internal function and call it
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // axios.get(fetchUrl) -> https://api.themoviedb.org/3{fetchUrl}
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); // the variable taken outside of useffect must be added here

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie?.name || movie?.original_title || movie?.original_name || ""
      )
        .then((url) => {if(url){
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));}
        })
    }
  };
  return (<>
    <div className="row">
      {/* title */}
      <h2>{title}</h2>
      {/* container -> posters */}
      <div className="row_posters">
        {movies.map((movie) => (
          <>
            <p style={!loaded ? { display: "block" } : { display: "none" }}>
              <SkeletonTheme color="#202020" highlightColor="#444">
                <p>
                  <Skeleton
                    className={`${!isLargeRow?"abc":"abcBig"}`}
                    width="100px"
                    height="100px"
                    count={1}
                  />
                </p>
              </SkeletonTheme>
            </p>
            <img
              style={loaded ? { display: "inline-block" } : { display: "none" }}
              key={movie.id}
              onLoad={() => setLoaded(true)}
              onClick={() => handleClick(movie)}
              className={`row_poster ${
                movie.backdrop_path == null && "row_bdp"
              } ${isLargeRow && "row_posterLarge"}`}
              src={`${baseurl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          </>
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div></>
  );
}

export default Row;
