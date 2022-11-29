import PropTypes from 'prop-types';
import React, { useEffect, useState, useMemo } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const minLength = 6;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regex) && password.length > minLength) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  const infos = useMemo(() => ({
    password,
    setPassword,
    email,
    setEmail,
    isDisabled,
  }), [email, isDisabled, password]);

  return (
    <AppContext.Provider value={ infos }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default AppProvider;
