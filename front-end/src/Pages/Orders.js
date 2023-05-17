import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../Components/navbar';
import './Orders.css';

export default function Orders({ history }) {
  const [totalOrders, setTotalOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    const getOrders = async () => {
      const { data } = await axios.get(`http://localhost:3001/customer/orders/${user.id}`);
      setTotalOrders(data);
    };
    getOrders();
  }, []);

  const btnDeleteAll = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    history.push('/login');
  };

  const products = (e) => {
    e.preventDefault();
    console.log('products');
    history.push('/customer/products');
  };

  return (
    <div>
      <Navbar
        nameUser={ user.name }
        btnDeleteAll={ btnDeleteAll }
        /* orderClick={orders} */
        goProducts={ products }
      />
      <div className="box-orders">
        {totalOrders.map((order, index) => (
          <div className="cards-orders" key={ index }>
            <Link
              className="card-detail"
              to={ `/customer/orders/${order.id}` }
              // to={ `/customer/orders/${order.id}` }
              name={ order.id }
              data-testid={ `customer_orders__element-order-id-${order.id}` }
            >
              <div className="pedido-order">
                <p>Id do Pedido</p>
                <p>{order.id}</p>
              </div>
              <div className="status">
                <p
                  data-testid={ `customer_orders__element-delivery-status-${order.id}` }
                >
                  {order.status}
                </p>
              </div>

              <div className="data-price">
                <p
                  data-testid={ `customer_orders__element-order-date-${order.id}` }
                >
                  {new Date(order.saleDate).toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                  })}
                </p>
                <p
                  data-testid={ `customer_orders__element-card-price-${order.id}` }
                >
                  {`R$ ${order.totalPrice.replace(/\./, ',')}`}
                </p>
              </div>
              {/* <button name={ order.id } type="button" onClick={ detailsOrder }>
              Detalhes
            </button> */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

Orders.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;
