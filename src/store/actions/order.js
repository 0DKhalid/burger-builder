import * as actionTypes from './actionTypes';
import axios from '../../axios-order';



export const purchaseBurgerSuccess = (id, orederData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orederData: orederData
    }
}

export const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('order.json?auth=' + token, orderData)
            .then(res => dispatch(purchaseBurgerSuccess(res.data.name, orderData)))
            .catch(err => dispatch(purchaseBurgerFail(err)))
    }
}

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    }
}



export const fetchOrederSucces = orders => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}


export const fetchOrderFail = err => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: err
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }

}


export const fetchOrder = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('order.json' + queryParams)
            .then(res => {
                const fetchData = [];
                for (let key in res.data) {
                    fetchData.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrederSucces(fetchData))
            })
            .catch(err => dispatch(fetchOrderFail(err)))
    }
}