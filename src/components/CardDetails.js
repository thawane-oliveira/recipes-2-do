import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MerryGoRound from './MerryGoRound';
import './styles/RecipeDetails.css';
import returnImg from '../images/return.png';

function CardDetails({ title, photo, category, instructions, video, ing, buttons }) {
  const history = useHistory();
  const returnPrevious = () => {
    const local = history.location.pathname;
    if (local.includes('drinks')) return history.push('/drinks');
    return history.push('/meals');
  };

  return (
    <div className="card-details">
      <button
        type="button"
        className="return-button"
        onClick={ returnPrevious }
      >
        <img
          src={ returnImg }
          alt="return-button"
          className="return-img"
        />
      </button>
      <h3 className="recipe-title" data-testid="recipe-title">{title}</h3>
      <h4 className="recipe-category" data-testid="recipe-category">
        {category}
      </h4>
      <img
        className="recipe-img"
        src={ photo }
        data-testid="recipe-photo"
        alt={ title }
      />
      <ul>
        {ing}
      </ul>
      <p data-testid="instructions" className="recipe-instructions">{instructions}</p>
      {buttons}
      <iframe
        data-testid="video"
        title={ title }
        className="video"
        src={ video }
      />
      <MerryGoRound />
    </div>
  );
}

CardDetails.propTypes = {
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  ing: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  buttons: PropTypes.shape({}).isRequired,
};
export default CardDetails;
