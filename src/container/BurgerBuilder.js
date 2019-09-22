import React, { Component } from 'react';
import { connect } from 'react-redux';

// import classes from './BurgerBuilder.css'
import Aux from '../hoc/Aux';

import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../components/UI/Spinner/Spinner';
import axios from '../axios-order';
import WithErrorHandller from '../hoc/WithErrorHandller/WithErrorHandller';
import * as  actions from '../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onFetchedIngredients()
    }

    updatePurchasableState(ingredients) {
        // const sum = Object.keys(ingredients)
        //     .map(igkey => {
        //         return ingredients[igkey];
        //     }).reduce((sum, el) => {
        //         return sum + el;
        //     }, 0);

        // return sum > 0
        const ingredientArray = [];
        for (let ingredient in ingredients) {
            ingredientArray.push(ingredient);
        }
        const ingValues = ingredientArray.map(ing => ingredients[ing]).reduce((sum, el) => sum + el, 0)

        return ingValues > 0;


    }


    purchaseHndller = () => {
        if (this.props.isAuth) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }
    }

    cancelModelHanddller = () => {
        this.setState({ purchasing: false })
    }
    contiuneModelHandller = () => {
        this.props.onPurchaseInit()
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ings

        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredient can`t fatched!</p> :
            <div style={{ textAlign: 'center', paddingTop: '30px' }}><Spinner /></div>;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={
                        this.props.ings
                    } />
                    <BuildControls addIngredient={
                        this.props.onAddIngredient
                    }
                        removeIngredient={
                            this.props.onRemoveIngredient
                        }
                        disabled={disabledInfo}
                        purchasable={
                            this.updatePurchasableState(this.props.ings)
                        }
                        order={
                            this.purchaseHndller
                        }
                        price={
                            this.props.price
                        }
                        isAuth={this.props.isAuth}
                    />

                </Aux>
            );
            orderSummary = <OrderSummary continue={
                this.contiuneModelHandller
            }
                cancel={
                    this.cancelModelHanddller
                }
                ingredients={
                    this.props.ings
                }
                totalPrice={
                    this.props.price
                } />;

        }
        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }


        return (
            <Aux>
                <Modal cancelBackDrop={
                    this.cancelModelHanddller
                }
                    show={
                        this.state.purchasing
                    }>
                    {orderSummary} </Modal>
                {burger} </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBulider.ingredients,
        price: state.burgerBulider.totalPrice,
        error: state.burgerBulider.error,
        isAuth: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
        onRemoveIngredient: (ingredientType) => dispatch(actions.removeIngredient(ingredientType)),
        onFetchedIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.initPurchase()),
        onSetAuthRedirect: path => dispatch(actions.setRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandller(BurgerBuilder, axios));
