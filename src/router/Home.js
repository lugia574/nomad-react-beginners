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
    console.log(currentIndex, "이게 뭐냐 현재 상태", direction);
    setCurrentIndex((currentIndex) => currentIndex + direction);
    console.log(currentIndex, "set 지난 다음 상태");

    if (currentIndex === 0) {
      console.log(currentIndex, "prev 넘기기");
      replaceSlide(800);
    } else if (currentIndex === (slides.length - 2) * -800) {
      console.log(currentIndex, "next 넘기기");
      replaceSlide((slides.length - 1) * -800);
    }
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
                transform: `translateX(${currentIndex}px)`,
                left: 0,
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
              onClick={() => handleSwipe(800)}
            >
              ◀
            </div>
            <div
              className="slide_next_button slide_button"
              onClick={() => handleSwipe(-800)}
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
