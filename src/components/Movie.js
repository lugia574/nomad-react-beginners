import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({ id, coverImg, title, genres, description, rating }) {
  const star = [];
  const cnt = Math.floor(rating / 2);

  for (let i = 0; i < cnt; i++) {
    star.push("★");
  }

  for (let i = cnt; i < 5; i++) {
    star.push("☆");
  }
  return (
    <div className="slide_item">
      <div className="slide_container movie">
        <p className="movie_title">
          <Link to={`/movie/${id}`}>{title}</Link>
        </p>
        <div className="slide_container movie_detail">
          <div className="movie_detail_rating">
            <ul className="star_rating">
              {star.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
          <div className="movie_detail_summary">
            {description.slice(0, 350)}...
          </div>
          <div className="movie_detail_tag">
            {" "}
            <ul className="gunre_list">
              {genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="movie_thumb">
        <Link to={`/movie/${id}`}>
          <img src={coverImg} alt={title} />
        </Link>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  rating: PropTypes.number.isRequired,
};

export default Movie;
