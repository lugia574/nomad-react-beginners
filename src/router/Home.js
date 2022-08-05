import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import MovieSlide from "../components/MovieSlide";
import Footer from "../views/partials/Footer";
import Header from "../views/partials/Header";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
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
  return (
    <div>
      <Header />
      {loading ? (
        <h1>loading....</h1>
      ) : (
        <>
          <div className="movieList">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                genres={movie.genres}
              />
            ))}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Home;

// <div className="movieSlide">
// <div className="prev">
//   <i className="fa fa-angle-right"></i>
// </div>
// <div className="next">
//   <i className="fa fa-angle-left"></i>
// </div>
// {movies.map((movie, index) => (
//   <MovieSlide
//     key={index}
//     id={movie.id}
//     coverImg={movie.large_cover_image}
//   />
// ))}
// </div>
