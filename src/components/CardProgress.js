import PropTypes from 'prop-types';
import './styles/style.css';

function CardProgress({
  title, photo, category, instructions, ing, shareBtn, favBtn, finishBtn }) {
  return (
    <>
      <h3 data-testid="recipe-title">{title}</h3>
      <h4 data-testid="recipe-category">
        {category}
      </h4>
      <img
        src={ photo }
        data-testid="recipe-photo"
        alt={ title }
      />
      <div>
        {ing}
      </div>
      <p data-testid="instructions">{instructions}</p>
      {shareBtn}
      {favBtn}
      {finishBtn}

    </>
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
