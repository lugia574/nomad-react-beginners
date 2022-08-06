import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import MovieSlide from "../components/MovieSlide";
import Footer from "../views/partials/Footer";
import Header from "../views/partials/Header";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0); // 슬라이드 index

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

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
    let index = currentIndex + direction;
    console.log("현재 index", index);
    setCurrentIndex(index);
    console.log("setCurrentIndex 끝남", currentIndex);
    if (index < 2) {
      console.log("index < 2", currentIndex);
      index += movies.length;
      replaceSlide(index);
    } else if (index >= movies.length + 2) {
      console.log(movies.length + 2, "movies.length + 2", currentIndex);
      index -= -movies.length;
      replaceSlide(index);
    }

    console.log("다 끝난 마당에 index", currentIndex);
  }

  return (
    <div>
      <Header />
      {loading ? (
        <h1>loading....</h1>
      ) : (
        <>
          <div className="slider-area">
            <div
              className="slide slide_wrap"
              style={{
                transform: `translateX(${currentIndex * 800}px)`,
              }}
            >
              {slides.map((movie, index) => (
                <Movie
                  key={index}
                  id={movie.id}
                  coverImg={movie.medium_cover_image}
                  title={movie.title}
                  genres={movie.genres}
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
