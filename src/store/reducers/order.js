import * as actionTypes from '../actions/actionTypes';

const initialState = {
    order: [],
    loading: false,
    purchase: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.INIT_PURCHASE:
            return {
                ...state,
                purchase: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orederData,
                id: action.orderId,
            }
            return {
                ...state,
                loading: false,
                order: state.order.concat(newOrder),
                purchase: true
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                order: action.orders,
                loading: false
            }
        default:
            return state
    }
}


export default reducer;