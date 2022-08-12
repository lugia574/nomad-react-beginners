import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function MovieDetail({ id, coverImg, title, genres, rating, description }) {
  return (
    <div className="movie_info">
      <div className="movie_info_container movie_img">
        <img src={coverImg} alt={title} />
      </div>
      <div className="movie_info_container">
        <div className="movie_title">
          <Link to={`/movie/${id}`}>{title}</Link>
        </div>
        <div className="movie_subInfo">
          <div className="movie_info_tag">
            {" "}
            <ul className="gunre_list">
              {genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
          <div className="movie_rating">
            <p>{rating}</p>
          </div>
        </div>
        <div className="movie_info_summary">{description}</div>
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
