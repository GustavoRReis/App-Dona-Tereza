import React from 'react';
import PropTypes from 'prop-types';

export default function NavbarSeller({ nameUser, btnDeleteAll, orderClick }) {
  return (
    <div>
      <button
        type="button"
        onClick={ orderClick }
        data-testid="customer_products__element-navbar-link-orders"
      >
        Pedidos
      </button>
      <h2 data-testid="customer_products__element-navbar-user-full-name">
        {nameUser}
      </h2>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ btnDeleteAll }
      >
        Sair
      </button>
    </div>
  );
}

NavbarSeller.propTypes = {
  nameUser: PropTypes.string.isRequired,
  btnDeleteAll: PropTypes.func.isRequired,
  orderClick: PropTypes.func.isRequired,
};
