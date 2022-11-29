import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

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
    <form>
      <input
        data-testid="email-input"
        placeholder="Email"
        onChange={ ({ target }) => {
          setEmail(target.value);
        } }
      />
      <input
        data-testid="password-input"
        placeholder="Password"
        type="password"
        onChange={ ({ target }) => {
          setPassword(target.value);
        } }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ () => handleSubmit(email) }
      >
        Enter

      </button>
    </form>
  );
}

export default Login;
