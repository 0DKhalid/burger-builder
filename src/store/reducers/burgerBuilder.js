import * as actionType from '../actions/actionTypes';


const initialState = {
    ingredients: null,
    error: false,
    totalPrice: 4,
    building: false
}

const INGREDIENT_PRICE = {
    salad: 1.0,
    bacon: 0.6,
    meat: 2.0,
    cheese: 1.0
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingName],
                building: true
            }
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingName],
                building: true
            }
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building: false
            }
        case actionType.FETCH_INGREDIENT_FAILD:
            return {
                ...state,
                error: true

            }
        default:
            return state
    }
}


export default reducer;
