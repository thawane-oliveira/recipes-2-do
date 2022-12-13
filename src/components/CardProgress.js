import PropTypes from 'prop-types';
import './styles/RecipeInProgress.css';

function CardProgress({
  title, photo, category, instructions, ing, shareBtn, favBtn, finishBtn }) {
  return (
    <div className="progress-container">
      <h3 className="progress-title" data-testid="recipe-title">{title}</h3>
      <h4 data-testid="recipe-category" className="progress-category">
        {category}
      </h4>
      <img
        className="progress-img"
        src={ photo }
        data-testid="recipe-photo"
        alt={ title }
      />
      <div className="progress-ingredient">
        {ing}
      </div>
      <p className="progress-instructions" data-testid="instructions">{instructions}</p>
      <div className="progress-btn-container">
        {shareBtn}
        {favBtn}
      </div>
      {finishBtn}

    </div>
  );
}

CardProgress.propTypes = {
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  instructions: PropTypes.string.isRequired,
  ing: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  shareBtn: PropTypes.shape({}).isRequired,
  favBtn: PropTypes.shape({}).isRequired,
  finishBtn: PropTypes.shape({}).isRequired,
};

CardProgress.defaultProps = {
  category: '',
};
export default CardProgress;
