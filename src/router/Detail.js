import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import Header from "../views/partials/Header";
import Footer from "../views/partials/Footer";

function Detail() {
  const { id } = useParams();
  const [movieLoading, setMovieLoading] = useState(true);
  const [info, setInfo] = useState([]);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    setInfo(json.data.movie);
    setMovieLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(info);
  return (
    <div className="container">
      <Header />
      {movieLoading ? (
        <h1>loading....</h1>
      ) : (
        <div>
          {
            <MovieDetail
              key={info.id}
              id={info.id}
              rating={info.rating}
              coverImg={info.medium_cover_image}
              title={info.title}
              genres={info.genres}
              description={info.description_full}
            />
          }
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Detail;
