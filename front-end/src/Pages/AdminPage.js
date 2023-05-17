import React from 'react';
import Navbar from '../Components/navbar';

export default function AdminPage() {
  return (
    <div>
      <Navbar />
      <form>
        <input
          data-testid="admin_manage__input-name"
          type="text"
        />
        <input
          data-testid="admin_manage__input-email"
          type="email"
        />
        <input
          data-testid="admin_manage__input-password"
          type="password"
        />
        <select
          data-testid="admin_manage__select-role"
        >
          <option>
            Vendedor
          </option>
        </select>
        <button
          data-testid="admin_manage__button-register"
          type="button"
          disabled
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
