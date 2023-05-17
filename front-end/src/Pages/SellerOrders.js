import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navbar from '../Components/navbar';

export default function SellerOrders({ history }) {
  const [sellerData, setSellerData] = useState([]);
  useEffect(() => {
    const getOrdersDetails = async () => {
      const { data } = await axios.get(
        'http://localhost:3001/seller/orders',
      );
      setSellerData(data);
    };
    getOrdersDetails();
  }, []);

  const btnDeleteAll = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <div>
      <Navbar btnDeleteAll={ btnDeleteAll } nameUser="Fulana Pereira" />
      <div className="box-orders">
        {sellerData.map((e, index) => (
          <div className="cards-orders" key={ index }>
            <Link
              className="card-detail"
              /*  to={getId(e.id)} */
              to={ `/seller/orders/${e.id}` }
            >
              <div className="pedido-order">
                <p>Id do Pedido</p>
                <p data-testid={ `seller_orders__element-order-id-${e.id}` }>
                  {e.id}
                </p>
              </div>
              <div className="status">
                <p
                  data-testid={ `seller_orders__element-delivery-status-${e.id}` }
                >
                  {e.status}
                </p>
              </div>

              <div className="data-price">
                <p data-testid={ `seller_orders__element-order-date-${e.id}` }>
                  {new Date(e.saleDate).toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                  })}
                </p>
                <p data-testid={ `seller_orders__element-card-address-${e.id}` }>
                  {e.deliveryAddress}
                </p>
                <p data-testid={ `seller_orders__element-card-price-${e.id}` }>
                  {`R$ ${e.totalPrice.replace(/\./, ',')}`}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

SellerOrders.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;
