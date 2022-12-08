import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import './styles/Login.css';

function Login() {
  const { email, setPassword, setEmail,
    isDisabled } = useContext(AppContext);

  const history = useHistory();

  const handleSubmit = (userEmail) => {
    const newObj = {
      email: userEmail,
    };
    localStorage.setItem('user', JSON.stringify(newObj));
    history.push('/meals');
  };
  return (
    <div className="teste">

      <form className="loginContainer">
        <img src="https://imageup.me/images/recipes-app.png" alt="ícone da tela de login" className="login-img" />

        <h1 className="loginTitle"> Recipes App </h1>
        <input
          className="email"
          data-testid="email-input"
          placeholder="Email"
          onChange={ ({ target }) => {
            setEmail(target.value);
          } }
        />
        <input
          className="password"
          data-testid="password-input"
          placeholder="Password"
          type="password"
          onChange={ ({ target }) => {
            setPassword(target.value);
          } }
        />
        <button
          className={ isDisabled ? 'submit-disabled' : 'submit-button' }
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ () => handleSubmit(email) }
        >
          Enter

        </button>

        <footer className="loginFooter">
          <b> &copy; Group-2A O melhor do Brasil! </b>
        </footer>

      </form>

    </div>

  );
}

export default Login;
