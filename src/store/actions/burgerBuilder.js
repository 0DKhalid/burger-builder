import axios from '../../axios-order';
import * as actionTypes from './actionTypes';



export const addIngredient = ingredientName => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingName: ingredientName
    }
}

export const removeIngredient = ingredientName => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingName: ingredientName
    }
}

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}


export const fetchIngredientsFaild = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILD
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-builder-af4a6.firebaseio.com/ingredients.json')
            .then(res => dispatch(setIngredients(res.data)))
            .catch(err => dispatch(fetchIngredientsFaild()))
    }
}