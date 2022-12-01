import PropTypes from 'prop-types';

function Card({ index, photo, title }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h3
        data-testid={ `${index}-card-name` }
      >
        {title}
      </h3>
      <img
        src={ photo }
        data-testid={ `${index}-card-img` }
        alt={ title }
      />
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Card;
