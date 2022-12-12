import PropTypes from 'prop-types';
import MerryGoRound from './MerryGoRound';
import './styles/RecipeDetails.css';

function CardDetails({ title, photo, category, instructions, video, ing, buttons }) {
  return (
    <div className="card-details">
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
      {console.log(typeof buttons)}
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
