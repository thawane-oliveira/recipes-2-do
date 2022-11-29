import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Login() {
  const { setPassword, setEmail, isDisabled } = useContext(AppContext);
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
        onChange={ ({ target }) => {
          setPassword(target.value);
        } }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Enter

      </button>
    </form>
  );
}

export default Login;
