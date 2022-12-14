import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './styles/RecipeInProgress.css';
import returnImg from '../images/return.png';

function CardProgress({
  title, photo, category, instructions, ing, shareBtn, favBtn, finishBtn }) {
  const history = useHistory();
  const returnPrevious = () => {
    const local = history.location.pathname;
    const splitedId = local.split('/')[2];
    if (local.includes('drinks')) return history.push(`/drinks/${splitedId}`);
    return history.push(`/meals/${splitedId}`);
  };
  return (
    <div className="progress-container">
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
