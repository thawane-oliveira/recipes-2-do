import PropTypes from 'prop-types';
import MerryGoRound from './MerryGoRound';

function CardDetails({ title, photo, category, instructions, video, ing }) {
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
      <ul>
        {ing}
      </ul>
      <p data-testid="instructions">{instructions}</p>
      <iframe
        data-testid="video"
        title={ title }
        width="420"
        height="315"
        src={ video }
      />

      <MerryGoRound />
    </>
  );
}

CardDetails.propTypes = {
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  video: PropTypes.arrayOf(PropTypes.string).isRequired,
  ing: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
export default CardDetails;
