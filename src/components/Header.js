import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function Header({ headerText, enableSearchButton }) {
  const history = useHistory();

  const redirectToProfile = () => {
    history.push('/profile');
  };

  return (
    <header>
      <h1 data-testid="page-title">{headerText}</h1>
      <button
        onClick={ redirectToProfile }
        type="button"
      >
        <img
          data-testid="profile-top-btn"
          src="src/images/profileIcon.svg"
          alt="profile icon"
        />
      </button>
      { enableSearchButton && (
        <img
          data-testid="search-top-btn"
          src="src/images/searchIcon.svg"
          alt="search top icon"
        />
      ) }
    </header>
  );
}

Header.propTypes = {
  enableSearchButton: PropTypes.bool.isRequired,
  headerText: PropTypes.string.isRequired,
};

export default Header;
