import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../Components/navbar';
import './OrderDetails.css';

export default function OrderDetails({ history }) {
  const [saleData, setSaleData] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const [isSeller, setIsSeller] = useState('');
  const [estadoBotaoEntregue, setEstadoBotaoEntregue] = useState(true);

  const { id } = useParams();

  const idVendedor = 'customer_order_details__element-order-details-label-seller-name';
  const idData = 'customer_order_details__element-order-details-label-order-date';
  const EMTRANSITO = 'Em Trânsito';
  const PREPARANDO = 'Preparando';
  const ENTREGUE = 'Entregue';
  const PENDENTE = 'Pendente';

  const statusCorrenteEntregue = (dataFiltered) => {
    if (
      dataFiltered[0].sale.status === PENDENTE
      || dataFiltered[0].sale.status === PREPARANDO
      || dataFiltered[0].sale.status === ENTREGUE
    ) {
      setEstadoBotaoEntregue(true);
    } else if (dataFiltered[0].sale.status === EMTRANSITO) {
      setEstadoBotaoEntregue(false);
    }
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const seller = JSON.parse(localStorage.getItem('seller'));
  useEffect(() => {
    setIsSeller(seller);
    const getOrdersDetails = async () => {
      const { data } = await axios.get('http://localhost:3001/sales/product');
      const dataFiltered = data.filter((e) => e.sale.id === Number(id));
      setSaleData(dataFiltered);
      setDataOrder([dataFiltered[0]]);
      statusCorrenteEntregue(dataFiltered);
    };
    getOrdersDetails();
  }, [estadoBotaoEntregue]);

  const btnDeleteAll = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    history.push('/login');
  };

  const orderClick = (e) => {
    e.preventDefault();
    history.push('/customer/orders');
  };
  const clickEntregue = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/seller/orders/${id}`, {
      status: ENTREGUE,
    });
    setEstadoBotaoEntregue(true);
  };

   const products = (e) => {
     e.preventDefault();
     console.log("products");
     history.push("/customer/products");
   };

  return (
    <div>
      <Navbar
        nameUser={ user.name }
        btnDeleteAll={ btnDeleteAll }
        orderClick={ orderClick }
         goProducts={ products }
      />

      {saleData === null ? (
        <p> carregando...</p>
      ) : (
        <div className="box-details">
          {dataOrder.map((e, index) => (
            <div className="cards-details" key={ e.sale.id }>
              <div className="details-compra">
                <p>Nº Pedido</p>
                <p data-testid="customer_order_details__element-order-details-label-order-id">
                  {e.sale.id}
                </p>
              </div>
              <div className="details-compra">
                <p>Vendedor</p>
                <p data-testid={ idVendedor }>{isSeller}</p>
              </div>
              <div className="details-compra">
                <p>Endereço</p>
                <p data-testid="customer_order_details__element-order-details-label-order-id">
                  {e.sale.deliveryAddress}
                </p>
              </div>
              <div className="details-compra">
                <p>Data</p>
                <p data-testid={ idData }>
                  {new Date(e.sale.saleDate).toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                  })}
                </p>
              </div>

              <div className="details-compra">
                <p>Status</p>
                <p
                  data-testid={ `customer_order_details__element-order-details-label-delivery-status
        ${index}` }
                >
                  {e.sale.status}
                </p>
              </div>
              <div className="details-compra">
                <button
                  className="button-entregue"
                  type="button"
                  data-testid="customer_order_details__button-delivery-check"
                  disabled
                  disabled={ estadoBotaoEntregue }
                  onClick={ clickEntregue }
                >
                  Marcar como entregue
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        <div className="box-list-Details">
          <ul className="details-ul1">
            <li className="td-checkout2 li-item2"> Item </li>
            <li className="td-checkout2 li-item2"> Descrição </li>
            <li className="td-checkout2 li-item2"> Quantidade </li>
            <li className="td-checkout2 li-item2"> Valor Unitário </li>
            <li className="td-checkout2 li-item2"> Sub-total</li>
          </ul>
        </div>

        <div className="box-list2">
          {saleData.map((element, index) => (
            <ul className="box-ul2" key={ index }>
              <li
                className="td-checkout li-item"
                data-testid={ `customer_order_details__element-order-table-item-number-${index}` }
              >
                {index + 1}
              </li>
              <li
                className="td-checkout li-name"
                data-testid={ `customer_order_details__element-order-table-name-${index}` }
              >
                {element.product.name}
              </li>
              <li
                className="td-checkout li-quantidade"
                data-testid={ `customer_order_details__element-order-table-quantity-${index}` }
              >
                {element.quantity}
              </li>
              <li
                className="td-checkout li-valorU"
                data-testid={ `customer_order_details__element-order-table-unit-price-${index}` }
              >
                {`R$ ${element.product.price.replace(/\./, ',')}`}
              </li>
              <li
                className="td-checkout li-valorT"
                data-testid={ `customer_order_details__element-order-table-sub-total-${index}` }
              >
                {`R$ ${(element.product.price * element.quantity)
                  .toFixed(2)
                  .replace(/\./, ',')}`}
              </li>
            </ul>
          ))}
        </div>
        {dataOrder.map((teste) => (
          <div key={ teste.sale.totalPrice } className="total-details">
            <div className="total-details2">
              <p>Total do Pedido</p>
              <p data-testid="customer_order_details__element-order-total-price">
                {`R$ ${teste.sale.totalPrice.replace(/\./, ',')}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;
