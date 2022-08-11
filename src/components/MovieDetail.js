import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function MovieDetail({ id, coverImg, title, genres, rating, description }) {
  return (
    <div className="movie_detail">
      <div className="movie_detail_container movie_img">
        <img src={coverImg} alt={title} />
      </div>
      <div className="movie_detail_container">
        <h2>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <p>{rating}</p>
        <div className="movie_detail_tag">
          {" "}
          <ul className="gunre_list">
            {genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
        <div className="movie_detail_summary">{description}...</div>
      </div>
    </div>
  );
}

MovieDetail.propTypes = {
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MovieDetail;
