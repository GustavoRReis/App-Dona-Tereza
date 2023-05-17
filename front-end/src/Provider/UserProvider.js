import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MainContext from '../Context/MainContext';

function UserProvider({ children }) {
  const [produtosProvider, setProdutosProvider] = useState([]);
  const [user, setUser] = useState([]);
  const contextValue = useMemo(() => ({
    user,
    setUser,
    produtosProvider,
    setProdutosProvider,
  }), [user, produtosProvider]);

  return (
    <MainContext.Provider value={ contextValue }>
      {children}
    </MainContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
