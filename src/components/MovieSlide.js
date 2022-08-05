import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function MovieSlide({ id, coverImg }) {
  return (
    <div>
      <Link to={`/movie/${id}`}>
        <img src={coverImg} alt={id} />
      </Link>
    </div>
  );
}

MovieSlide.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
};

export default MovieSlide;
