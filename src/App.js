import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/layout/Layout';
import BurgerBuilder from './container/BurgerBuilder';
// import Checkout from './container/Checkout/Checkout';
// import Orders from './container/Orders/Oreders';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
// import Spinner from './components/UI/Spinner/Spinner';

const asynCheckout = asyncComponent(() => import('./container/Checkout/Checkout'));
const asynOrder = asyncComponent(() => import('./container/Orders/Oreders'));
const asynAuth = asyncComponent(() => import('./container/Auth/Auth'));


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asynAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/auth" component={asynAuth} />
          <Route path="/checkout" component={asynCheckout} />
          <Route path='/orders' component={asynOrder} />
          <Route path='/logout' component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.checkAuthState())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
