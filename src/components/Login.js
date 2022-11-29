import React from 'react';

function Login() {
  return (
    <form>
      <input data-testid="email-input" />
      <input data-testid="password-input" />
      <button type="button" data-testid="login-submit-btn">Enter</button>
    </form>
  );
}

export default Login;
