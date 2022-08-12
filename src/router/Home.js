import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import Movie from "../components/Movie";
import Footer from "../views/partials/Footer";
import Header from "../views/partials/Header";

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0); // 슬라이드 index

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=7&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  // useInterval(() => {
  //   setCurrentIndex((currentIndex) => currentIndex + -1);
  // }, 20000);

  let slides = setSlides();

  function setSlides() {
    let addedFront = [];
    let addedLast = [];

    addedLast.push(movies[0]);
    addedFront.unshift(movies[movies.length - 1]);

    return [...addedFront, ...movies, ...addedLast];
  }

  const transitionTime = 500;
  const transitionStyle = `transform ${transitionTime}ms ease 0s`;

  function replaceSlide(index) {
    setTimeout(() => {
      setCurrentIndex(index);
    }, transitionTime);
  }

  function handleSwipe(direction) {
    let firstIndex = 1;
    let index = currentIndex + direction;

    setCurrentIndex(index);

    if (index === firstIndex) {
      index += -movies.length;
      replaceSlide(index);
    } else if (index <= -movies.length) {
      index = 0;
      replaceSlide(index);
    }
  }

  return (
    <div className="container">
      <Header />
      {loading ? (
        <h1>loading....</h1>
      ) : (
        <>
          <div className="slider-area">
            <div
              className="slide slide_wrap"
              style={{
                transform: `translateX(${currentIndex * 114}rem)`,
              }}
            >
              {slides.map((movie, index) => (
                <Movie
                  key={index}
                  id={movie.id}
                  coverImg={movie.large_cover_image}
                  title={movie.title}
                  description={movie.description_full}
                  genres={movie.genres}
                  rating={movie.rating}
                />
              ))}
            </div>
            <div
              className="slide_prev_button slide_button"
              onClick={() => handleSwipe(1)}
            >
              ◀
            </div>
            <div
              className="slide_next_button slide_button"
              onClick={() => handleSwipe(-1)}
            >
              ▶
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Home;
