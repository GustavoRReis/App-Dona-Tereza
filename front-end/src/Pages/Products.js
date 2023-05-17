import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Components/navbar';
import MainContext from '../Context/MainContext';
import setLocalStorage from '../utils/setLocalStorage';
import './Produtos.css';

export default function Products({ history }) {
  const { produtosProvider, setProdutosProvider } = useContext(MainContext);
  const [produtos, setProdutos] = useState([]);
  const [userLocalStorage, setUserLocalStorage] = useState({});
  const [total, setTotal] = useState(0);
  const [buttonCheckout, setButtonCheckout] = useState(true);

  const testttt = () => {
    if (total >= 0) {
      setButtonCheckout(false);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get(
        'http://localhost:3001/customer/products',
      );
      const n = data.map(({ id, name: nome, price, urlImage }) => {
        const a = {
          id,
          nome,
          price,
          urlImage,
          quantidade: 0,
          total: 0,
        };
        return a;
      });
      setProdutos(n);
      setProdutosProvider(n);
      setUserLocalStorage(JSON.parse(localStorage.getItem('user')));
    };
    getProducts();
  }, [setProdutosProvider]);

  const btnDeleteAll = (e) => {
    e.preventDefault();
    setUserLocalStorage({});
    localStorage.removeItem('user');
    history.push('/login');
  };

  const totalCart = () => {
    let total2 = 0;
    produtosProvider.forEach((t) => {
      total2 += Number(t.total);
    });
    setTotal(total2);
    setLocalStorage('total', total2);
    return total2.toFixed(2);
  };

  const addProducts = (e) => {
    e.preventDefault();
    const { value } = e.target;
    produtos.forEach((produto) => {
      if ((Number(produto.id)) === (Number(value))) {
        Number(produto.quantidade += 1);
        produto.total = (
          (Number(produto.price)) * (Number(produto.quantidade))).toFixed(2);
        totalCart();
        testttt();
      }
    });
    setProdutosProvider([...produtos]);
  };

  const removeProducts = (e) => {
    e.preventDefault();
    const { value } = e.target;
    produtos.forEach((produto) => {
      if (produto.quantidade >= 1 && (Number(produto.id)) === (Number(value))) {
        produto.quantidade -= 1;
        produto.total = (
          (Number(produto.price)) * (Number(produto.quantidade))).toFixed(2);
        totalCart();
        console.log(produto.quantidade);
      }
    });
    setProdutosProvider([...produtos]);
  };

  function handleChange(e) {
    const { name } = e.target;
    produtos.forEach((produto) => {
      if ((Number(produto.id)) === (Number(name))) {
        produto.quantidade = e.target.value;
        console.log(typeof produto.quantidade);
        console.log(produto.quantidade.substr(1, produto.quantidade.length));
        produto.quantidade.substr(1, produto.quantidade.length);
        produto.total = (
          (Number(produto.price)) * (Number(produto.quantidade))).toFixed(2);
        totalCart();
      }
    });
    setProdutosProvider([...produtos]);
  }

  const checkoutCart = () => {
    history.push('/customer/checkout');
  };

  const orders = (e) => {
    e.preventDefault();
    history.push('/customer/orders');
  };

  return (
    <div className="box-principal-produtos">
      <Navbar
        nameUser={ userLocalStorage.name }
        btnDeleteAll={ btnDeleteAll }
        orderClick={ orders }
      />
      <div className="box-produtos">
        {produtosProvider.map((produto, index) => (
          <div className="box-card-products" key={ index }>
            <p
              className="text-products"
              data-testid={ `customer_products__element-card-title-${produto.id}` }
            >
              {produto.nome}
            </p>

            <img
              className="img-products"
              data-testid={ `customer_products__img-card-bg-image-${produto.id}` }
              alt={ index }
              src={ produto.urlImage }
            />
            <p
              className="text-products"
              data-testid={ `customer_products__element-card-price-${produto.id}` }
            >
              {`R$${produto.price.replace(/\./, ',')}`}
            </p>
            <div className="inputs-products">
              <button
                className="button-products"
                name={ produto.price.replace(/\./, ',') }
                data-testid={ `customer_products__button-card-add-item-${produto.id}` }
                type="button"
                onClick={ removeProducts }
                value={ produto.id }
              >
                -
              </button>
              <input
                className="input-products"
                data-testid={ `customer_products__input-card-quantity-${produto.id}` }
                type="number"
                value={ produto.quantidade }
                onChange={ handleChange }
                name={ produto.id }
              />
              <button
                className="button-products"
                data-testid={ `customer_products__button-card-rm-item-${produto.id}` }
                type="button"
                onClick={ addProducts }
                value={ produto.id }
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="footerProdutos">

        <div className="box-carrinho">
          <button
            className="button-carrinho btn2"
            data-testid="customer_products__button-cart"
            type="button"
            onClick={ checkoutCart }
            disabled={ buttonCheckout }
          >
            Total
            <p data-testid="customer_products__checkout-bottom-value">
              {`R$ ${total.toFixed(2).toString().replace(/\./, ',')}`}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

Products.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;
