import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../Components/navbar';

export default function SellerDetails({ history }) {
  const [saleData, setSaleData] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const [isSeller, setIsSeller] = useState('');
  const [estadoBotaoPreparar, setEstadoBotaoPreparar] = useState(true);
  const [estadoBotaoEntrega, setEstadoBotaoEntrega] = useState(true);

  const idVendedor = 'seller_order_details__element-order-details-label-seller-name';
  const idData = 'seller_order_details__element-order-details-label-order-date';
  const EMTRANSITO = 'Em Trânsito';
  const PREPARANDO = 'Preparando';
  const ENTREGUE = 'Entregue';
  const PENDENTE = 'Pendente';
  const { id } = useParams();

  const statusCorrentePreparar = (dataFiltered) => {
    if (dataFiltered[0].sale.status === PREPARANDO
    || dataFiltered[0].sale.status === EMTRANSITO
    || dataFiltered[0].sale.status === ENTREGUE) {
      setEstadoBotaoPreparar(true);
    } else if (dataFiltered[0].sale.status === PENDENTE) {
      setEstadoBotaoPreparar(false);
    }
  };

  const statusCorrenteEntrega = (dataFiltered) => {
    if (dataFiltered[0].sale.status === PENDENTE
    || dataFiltered[0].sale.status === EMTRANSITO
    || dataFiltered[0].sale.status === ENTREGUE) {
      setEstadoBotaoEntrega(true);
    } else if (dataFiltered[0].sale.status === PREPARANDO) {
      setEstadoBotaoEntrega(false);
    }
  };

  useEffect(() => {
    const seller = JSON.parse(localStorage.getItem('seller'));
    setIsSeller(seller);
    const getOrdersDetails = async () => {
      const { data } = await axios.get('http://localhost:3001/sales/product');
      setSaleData(data);

      const dataFiltered = data.filter((e) => e.sale.id === Number(id));
      setSaleData(dataFiltered);
      setDataOrder([dataFiltered[0]]);
      statusCorrentePreparar(dataFiltered);
      statusCorrenteEntrega(dataFiltered);
    };
    getOrdersDetails();
  }, [estadoBotaoPreparar, estadoBotaoEntrega]);

  const btnDeleteAll = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    history.push('/login');
  };
  const orderClick = (e) => {
    e.preventDefault();
    history.push('/seller/orders');
  };

  const prepararPedido = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/seller/orders/${id}`, { status: PREPARANDO });
    setEstadoBotaoPreparar(true);
  };
  const entregaPedido = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/seller/orders/${id}`, { status: EMTRANSITO });
    setEstadoBotaoEntrega(true);
  };

  return (
    <div>
      <Navbar
        nameUser="Fulana Pereira"
        btnDeleteAll={ btnDeleteAll }
        orderClick={ orderClick }
        /* goProducts={ products } */
      />

      {saleData === null ? (
        <p> carregando...</p>
      ) : (
        <div className="box-details">
          {dataOrder.map((e, index) => (
            <div className="cards-details" key={ e.sale.id }>
              <div className="details-compra">
                <p>Nº Pedido</p>
                <p data-testid="seller_order_details__element-order-details-label-order-id">
                  {e.sale.id}
                </p>
              </div>

              <div className="details-compra">
                <p>Vendedor</p>
                <p data-testid={ idVendedor }>{isSeller}</p>
              </div>

              <div className="details-compra">
                <p>Endereço</p>
                <p data-testid="seller_order_details__element-order-details-label-order-id">
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
                  data-testid={ `seller_order_details__element-order-details-label-delivery-status
                  ${index}` }
                >
                  {e.sale.status}
                </p>
              </div>
              <div className="details-compra">
                <button
                  type="button"
                  className="button-entregue"
                  data-testid="seller_order_details__button-preparing-check"
                  onClick={ () => {} }
                  disabled={ estadoBotaoPreparar }
                  onClick={ prepararPedido }
                  /* disabled={ estadoBotao } */
                >
                  Preparar pedido
                </button>
              </div>

              <div className="details-compra">
                <button
                  className="button-entregue"
                  type="button"
                  data-testid="seller_order_details__button-dispatch-check"
                  onClick={ entregaPedido }
                >
                  Saiu para entrega
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
                data-testid={ `seller_order_details__element-order-table-item-number-${index}` }
              >
                {index + 1}
              </li>
              <li
                className="td-checkout li-name"
                data-testid={ `seller_order_details__element-order-table-name-${index}` }
              >
                {element.product.name}
              </li>
              <li
                className="td-checkout li-quantidade"
                data-testid={ `seller_order_details__element-order-table-quantity-${index}` }
              >
                {element.quantity}
              </li>
              <li
                className="td-checkout li-valorU"
                data-testid={ `seller_order_details__element-order-table-unit-price-${index}` }
              >
                {`R$ ${element.product.price.replace(/\./, ',')}`}
              </li>
              <li
                className="td-checkout li-valorT"
                data-testid={ `seller_order_details__element-order-table-sub-total-${index}` }
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
              <p data-testid="seller_order_details__element-order-total-price">
                {`R$ ${teste.sale.totalPrice.replace(/\./, ',')}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

SellerDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;
