import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import setLocalStorage from '../utils/setLocalStorage';
import logoPage from '../images/logotereza.png';

function Register({ history }) {
  const [disabledButton, setDisabledButton] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isRegisterValid, setIsRegisterValid] = useState(false);

  const validateEmail = () => {
    const valid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    if (valid.test(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };
  const validateRegister = () => {
    const minNumber = 6;
    const minNumberName = 12;
    if (password.length >= minNumber
      && isEmailValid === true && name.length >= minNumberName) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };
  useEffect(() => {
    validateEmail();
    validateRegister();
  }, [email, password, name]);

  const registerPost = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/register', { name, email, password });
      setLocalStorage('user', data);
      history.push('/customer/products');
    } catch (error) {
      if (error.response.data === 'User já cadastrado') {
        setIsRegisterValid(true);
      }
    }
  };

  const handleChange = (e) => {
    const { name: nome, value } = e.target;
    if (nome === 'email') {
      setEmail(value);
    }
    if (nome === 'password') {
      setPassword(value);
    }
    if (nome === 'name') {
      setName(value);
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
            <h1 style={ { color: 'white' } }>Crie seu cadastro</h1>
            <input
              className="inputs-home"
              type="text"
              name="name"
              value={ name }
              placeholder="nome"
              data-testid="common_register__input-name"
              onChange={ handleChange }
            />
            <input
              className="inputs-home"
              type="email"
              name="email"
              value={ email }
              placeholder="email"
              data-testid="common_register__input-email"
              onChange={ handleChange }
            />
            <input
              className="inputs-home"
              type="password"
              name="password"
              value={ password }
              placeholder="senha"
              data-testid="common_register__input-password"
              onChange={ handleChange }
            />
            <button
              className="button-homePage btn41-43"
              type="submit"
              name="register-button"
              data-testid="common_register__button-register"
              disabled={ disabledButton }
              onClick={ registerPost }
            >
              Cadastrar
            </button>
          </form>
        </div>
        <div>
          {!isRegisterValid === false ? (
            <h4 data-testid="common_register__element-invalid_register">
              Os dados inseridos são invalidos
            </h4>
          ) : (
            <p> </p>
          )}
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default Register;
