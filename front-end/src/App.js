import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Pages/Login';
import UserProvider from './Provider/UserProvider';
import Register from './Pages/Register';
import Products from './Pages/Products';
import Checkout from './Pages/Checkout';
import SellerOrders from './Pages/SellerOrders';
import OrderDetails from './Pages/OrderDetails';
import Orders from './Pages/Orders';
import SellerDetails from './Pages/SellerDetails';
import AdminPage from './Pages/AdminPage';

function App() {
  return (
    <Router>
      <UserProvider>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route exact path="/seller/orders" component={ SellerOrders } />
          <Route exact path="/customer/orders/:id" component={ OrderDetails } />
          <Route exact path="/customer/orders" component={ Orders } />
          <Route exact path="/seller/orders/:id" component={ SellerDetails } />
          <Route exact path="/admin/manage" component={ AdminPage } />
        </Switch>
      </UserProvider>
    </Router>
  );
}

export default App;
