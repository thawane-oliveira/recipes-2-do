import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';

function Card({ index, photo, title, id }) {
  const history = useHistory();
  const local = history.location.pathname;

  const verifyId = () => {
    <RecipeDetails id={ id } />;
    if (local.includes('drinks')) return `/drinks/${id}`;
    // if (local.includes('meals')) return `/meals/${id}`;
    return `/meals/${id}`;
  };

  return (
    <Link key={ index } to={ verifyId() }>
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
};

export default Card;
