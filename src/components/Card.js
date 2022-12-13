import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import './styles/Recipes.css';

function Card({ index, photo, title, id }) {
  const history = useHistory();
  const local = history.location.pathname;

  const verifyId = () => {
    <RecipeDetails id={ id } />;
    if (local.includes('drinks')) return `/drinks/${id}`;
    return `/meals/${id}`;
  };

  return (
    <Link key={ index } to={ verifyId() }>
      <div
        className="recipe-card"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          className="card-img"
          src={ photo }
          data-testid={ `${index}-card-img` }
          alt={ title }
        />
        <h3
          className="card-title"
          data-testid={ `${index}-card-name` }
        >
          {title}
        </h3>
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
