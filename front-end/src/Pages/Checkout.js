import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Navbar from '../Components/navbar';
import MainContext from '../Context/MainContext';
import setLocalStorage from '../utils/setLocalStorage';
import "./Checkout.css";

function Checkout({ history }) {
  const [userLocalStorage, setUserLocalStorage] = useState({});
  const { produtosProvider } = useContext(MainContext);
  const [dataProducts, setdataProducts] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const [sellerID, setSellerID] = useState('');
  const [removeItens, setRemoveItens] = useState(false);

  const getSellers = async () => {
    const { data } = await axios.get('http://localhost:3001/sellers');
    setSellers(data);
    setSellerID(data[0].id);
  };

  useEffect(() => {
    setUserLocalStorage(JSON.parse(localStorage.getItem('user')));
    setTotalCart(JSON.parse(localStorage.getItem('total')));
    const data = produtosProvider.filter(({ quantidade }) => quantidade > 0);
    if (!removeItens) {
      setdataProducts(data);
    }
    getSellers();
    return data;
  }, [address, addressNumber, sellerID]);

  const removeItem = (e) => {
    e.preventDefault();
    const { name } = e.target;
    const result = dataProducts.filter((i) => Number(i.id) !== Number(name));
    setdataProducts(result);
    let total2 = 0;
    result.forEach((t) => {
      total2 += Number(t.total);
    });
    setTotalCart(total2);
    setRemoveItens(true);
    setLocalStorage('total', total2);
    return total2.toFixed(2);
  };

  const handleChange = (e) => {
    const { name: nome, value } = e.target;
    if (nome === 'address') {
      setAddress(value);
    }
    if (nome === 'address-number') {
      setAddressNumber(value);
    }
  };

  // console.log(totalCart, address, addressNumber, sellerID);

  const handleClick = async (e) => {
    e.preventDefault();
    setSellerID(e.target.value);
    console.log(e.target.value);
  };
  const checkout = async (e) => {
    e.preventDefault();
    const totalPrice = totalCart;
    const deliveryAddress = address;
    const deliveryNumber = addressNumber;
    const sellerId = sellerID;
    try {
      const { data } = await axios
        .post('http://localhost:3001/customer/sales', { totalPrice, deliveryAddress, deliveryNumber, sellerId, dataProducts }, { headers: { Authorization: userLocalStorage.token } });
      console.log(totalPrice, deliveryAddress, deliveryNumber, sellerId);
      const vendedor = sellers.map(({ name: nome }) => nome);
      setLocalStorage('seller', vendedor[0]);
      history.push(`/customer/orders/${data.id}`);
      console.log('entrou no try');
    } catch (error) {
      console.log(error.response.statusText);
      console.log('caiu no catch');
    }
  };

  const btnDeleteAll = (e) => {
    e.preventDefault();
    setUserLocalStorage({});
    localStorage.removeItem('user');
    history.push('/login');
  };
  const orderClick = (e) => {
    e.preventDefault();
    history.push('/customer/orders');
  };

  const products = (e) => {
    e.preventDefault();
    history.push("/customer/products");
  };
  
  return (
    <div className="box-checkout">
      <Navbar
        nameUser={userLocalStorage.name}
        btnDeleteAll={btnDeleteAll}
        orderClick={orderClick}
        goProducts={products}
      />

      <div className="box-list-checkout">
        <ul className="box-ul1">
          <li className="td-checkout2 li-item2"> Item </li>
          <li className="td-checkout2"> Descrição </li>
          <li className="td-checkout2"> Quantidade </li>
          <li className="td-checkout2"> Valor Unitário </li>
          <li className="td-checkout2"> Sub-total</li>
          {/* <li className="td-checkout2"> Remover Item </li> */}
        </ul>
        <div className="box-list2">
          {dataProducts.map((element, index) => (
            <ul className="box-ul2" key={index}>
              <li
                className="td-checkout li-item"
                data-testid={`customer_checkout__element-order-table-item-number-${index}`}
              >
                {index + 1}
              </li>
              <li
                className="td-checkout li-name"
                data-testid={`customer_checkout__element-order-table-name-${index}`}
              >
                {element.nome}
              </li>
              <li
                className="td-checkout li-quantidade"
                data-testid={`customer_checkout__element-order-table-quantity-${index}`}
              >
                {element.quantidade}
              </li>
              <li
                className="td-checkout li-valorU"
                data-testid={`customer_checkout__element-order-table-unit-price-${index}`}
              >
                {`R$ ${element.price.replace(/\./, ",")}`}
              </li>
              <li
                className="td-checkout li-valorT"
                data-testid={`customer_checkout__element-order-table-sub-total-${index}`}
              >
                {`R$ ${element.total.replace(/\./, ",")} `}
              </li>

              <div className="td-checkout">
                <button
                  className="button-checkout"
                  name={element.id}
                  data-testid={`customer_checkout__element-order-table-remove-${index}`}
                  type="submit"
                  onClick={removeItem}
                >
                  Remover
                </button>
              </div>
            </ul>
          ))}
        </div>
      </div>

      <div className="form-checkout">
        <form className="form2-checkout">
          <div className="div-form">
            <label className="div-form1" htmlFor="select-seller">
              P. Vendedora Responsável:
              <select
                className="form__field"
                id="select-seller"
                name="select-seller"
                data-testid="customer_checkout__select-seller"
                onClick={handleClick}
              >
                {sellers.map((seller) => (
                  <option key={seller.name} value={seller.id}>
                    {seller.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="div-form">
            <p className="p-input">Endereço</p>
            <input
              className="form__field"
              type="text"
              name="address"
              value={address}
              placeholder="Endereço"
              data-testid="customer_checkout__input-address"
              onChange={handleChange}
            />
          </div>
          <div className="div-form">
            <p className="p-input">Número</p>
            <input
              className="form__field"
              type="text"
              name="address-number"
              value={addressNumber}
              placeholder="Número"
              data-testid="customer_checkout__input-address-number"
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <div className="total-checkout">
        <h2 data-testid="customer_checkout__element-order-total-price">
          {`Total R$${totalCart.toFixed(2).toString().replace(/\./, ",")}`}
        </h2>
        <button
          className="button-finalizar"
          data-testid="customer_checkout__button-submit-order"
          type="submit"
          onClick={checkout}
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default Checkout;
