import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';

function Card({ index, photo, title, id, headerText }) {
  const verifyId = () => {
    if (headerText === 'Meals') {
      <RecipeDetails id={ id } />;
      return `/meals/${id}`;
    }
    if (headerText === 'Drinks') {
      <RecipeDetails id={ id } />;
      return `/drinks/${id}`;
    }
  };

  return (
    <Link key={ index } to={ () => verifyId() }>
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
    </Link>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
};

export default Card;
