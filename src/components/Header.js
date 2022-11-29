import PropTypes from 'prop-types';

function Header({ headerText, enableSearchButton }) {
  return (
    <header>
      <h1 data-testid="page-title">{headerText}</h1>
      <img
        data-testid="profile-top-btn"
        src="src/images/profileIcon.svg"
        alt="profile icon"
      />
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
