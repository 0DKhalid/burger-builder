import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Burger/OrderSummary/Oreder/Order';
import withErrorHandller from '../../hoc/WithErrorHandller/WithErrorHandller';
import axios from '../../axios-order';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';



class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrder(this.props.token, this.props.userId);

    }
    render() {
        let order = <Spinner />
        if (!this.props.loading) {

            order = this.props.orders.map(order => {
                return (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                )
            })
        }
        return (
            <div>
                {order}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.order,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: (token, userId) => dispatch(actions.fetchOrder(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandller(Orders, axios));