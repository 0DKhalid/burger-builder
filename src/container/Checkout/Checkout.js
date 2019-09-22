import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Burger/Order/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {


    checkoutCanceledHandller = () => this.props.history.goBack();

    checkoutContinuedHandller = () => {
        this.props.history.push('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasing = this.props.purchase ? <Redirect to="/" /> : null;
            summary =
                <div>
                    {purchasing}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCanceled={this.checkoutCanceledHandller}
                        checkoutContinued={this.checkoutContinuedHandller} />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
        }
        return summary;
    }

}
const mapStateToProps = state => {
    return {
        ings: state.burgerBulider.ingredients,
        purchase: state.order.purchase
    }
}

export default connect(mapStateToProps)(Checkout);