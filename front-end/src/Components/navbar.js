import React from "react";
import PropTypes from "prop-types";
import "./navBar.css";
import terezaLogo from '../images/logoNav.png';

export default function Navbar({
  nameUser,
  btnDeleteAll,
  orderClick,
  goProducts,
}) {
  return (
    <div className="box-navBar">
      <img src={terezaLogo} alt='logotereza'/>
      <button
        className="button-nav button-nav2"
        type="button"
        data-testid="customer_products__element-navbar-link-products"
        onClick={goProducts}
      >
        Produtos
      </button>
      <button
        className="button-nav button-nav2"
        type="button"
        onClick={orderClick}
        data-testid="customer_products__element-navbar-link-orders"
      >
        Pedidos
      </button>
      <button
        className="button-nav button-nav2"
        type="button"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {nameUser}
      </button>
      <button
        className="button-nav button-nav2"
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={btnDeleteAll}
      >
        Sair
      </button>
    </div>
  );
}

Navbar.propTypes = {
  nameUser: PropTypes.string.isRequired,
  btnDeleteAll: PropTypes.func.isRequired,
  orderClick: PropTypes.func.isRequired,
  goProducts: PropTypes.func.isRequired,
};
