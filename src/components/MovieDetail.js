import PropTypes from "prop-types";

function MovieDetail({ id, coverImg, title, genres, rating, description }) {
  const star = [];
  const cnt = Math.floor(rating / 2);

  for (let i = 0; i < cnt; i++) {
    star.push("★");
  }

  for (let i = cnt; i < 5; i++) {
    star.push("☆");
  }

  return (
    <div className="movie_info">
      <div className="movie_info_container movie_img">
        <img src={coverImg} alt={title} />
      </div>
      <div className="movie_info_container">
        <div className="movie_title">{title}</div>
        <div className="movie_rating">
          {
            <ul className="star_rating">
              {star.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          }
          <p>{rating}</p>
        </div>
        <div className="movie_info_summary">{description}</div>

        <div className="movie_info_tag">
          {" "}
          <ul className="gunre_list">
            {genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
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
