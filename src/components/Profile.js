import { useHistory } from 'react-router-dom';
// import { useContext } from 'react';
// import AppContext from '../context/AppContext';
import Header from './Header';

function Profile() {
  const history = useHistory();

  const email = JSON.parse(localStorage.getItem('user'));

  const toDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const toFavRecipes = () => {
    history.push('/favorite-recipes');
  };

  const toLogout = () => {
    // delete localStorage.user;
    // localStorage.removeItem('user');
    // consultado sobre como remever todas as dependências do localStorage em: https://stackoverflow.com/questions/7667958/clearing-localstorage-in-javascript, pois o removeItem deixava um array vazio
    localStorage.clear();
    history.push('/');
  };

  return (
    <main>

      <Header headerText="Profile" enableSearchButton={ false } />

      <p data-testid="profile-email">{email.email}</p>

      <button
        data-testid="profile-done-btn"
        onClick={ toDoneRecipes }
        type="button"
      >
        Done Recipes
      </button>

      <button
        data-testid="profile-favorite-btn"
        onClick={ toFavRecipes }
        type="button"
      >
        Favorite Recipes
      </button>

      <button
        data-testid="profile-logout-btn"
        onClick={ toLogout }
        type="button"
      >
        Logout
      </button>

    </main>
  );
}

export default Profile;
