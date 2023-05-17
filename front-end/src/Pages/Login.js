import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import setLocalStorage from '../utils/setLocalStorage';
import MainContext from '../Context/MainContext';
import logoPage from '../images/logotereza.png';
import './Login.css';

const DATA_ROTA = 'http://localhost:3001/login';

function Login({ history }) {
  const { user, setUser } = useContext(MainContext);
  const [disabledButton, setDisabledButton] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginValid, setIsLoginValid] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  console.log(filterUsers);

  const validateEmail = () => {
    const valid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    if (valid.test(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const validateLogin = () => {
    const minNumber = 6;
    if (password.length >= minNumber && isEmailValid === true) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  useEffect(() => {
    validateEmail();
    validateLogin();
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (userLocalStorage) {
      if (userLocalStorage.role === 'customer') {
        history.push('customer/products');
      }
      if (userLocalStorage.role === 'seller') {
        history.push('/seller/orders');
      }
      if (userLocalStorage.role === 'administrator') {
        history.push('/administrator');
      }
    }
  }, [email, password]);

  useEffect(() => {
    const getOrdersDetails = async () => {
      const { data } = await axios.get(DATA_ROTA);
      const users = allUsers.find((e) => e.email === email);
      setFilterUsers(users);
      // setLocalStorage('role', users.role);
      setAllUsers(data);
    };
    getOrdersDetails();
  }, [email, password]);
  console.log(user);
  //  FUNÇÃO PARA CONECTAR AO BACK-END
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const loginPost = async () => {
    try {
      const { data } = await axios.post(DATA_ROTA, { email, password });
      setLocalStorage('user', data);
      setUser(data);
      setIsEmailValid(true);
    } catch (error) {
      setIsEmailValid(false);
      return error.response.statusText;
    }
  };

  const handleClickRegister = (e) => {
    e.preventDefault();
    history.push('/register');
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const { data } = await axios.get(DATA_ROTA);
    const users = data.find((ele) => ele.email === email);

    if (await loginPost() === 'Not Found') {
      setIsLoginValid(true);
    }
    if (users.role === 'customer') {
      loginPost();
      history.push('/customer/products');
    }
    if (users.role === 'administrator') {
      loginPost();
      history.push('/admin/manage');
    }
    if (users.role === 'seller') {
      loginPost();
      history.push('/seller/orders');
    }
  };

  return (
    <div className="Login-Scrim">
      <div className="box-login">
        <div className="logo-box">
          <img src={ logoPage } alt="imagem-logo" id="imagem-logo" />
        </div>
        <div>
          <form className="box-inputs">
            <input
              className="inputs-home"
              type="email"
              name="email"
              value={ email }
              placeholder="email"
              data-testid="common_login__input-email"
              onChange={ handleChange }
            />
            <input
              className="inputs-home"
              type="password"
              name="password"
              value={ password }
              placeholder="senha"
              data-testid="common_login__input-password"
              onChange={ handleChange }
            />
            <button
              className="button-homePage btn41-43"
              type="submit"
              name="login-button"
              data-testid="common_login__button-login"
              disabled={ disabledButton }
              onClick={ handleClick }
            >
              Entrar
            </button>
            <button
              className="button-homePage btn41-43"
              type="submit"
              name="register-button"
              data-testid="common_login__button-register"
              onClick={ handleClickRegister }
            >
              Cadastrar
            </button>
          </form>
        </div>
        <div />
        {!isLoginValid === false ? (
          <h4 id="msg-oculta" data-testid="common_login__element-invalid-email">
            Email inválido
          </h4>
        ) : (
          <p> </p>
        )}
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default Login;
