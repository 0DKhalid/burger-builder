import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
              .map(igkey => {
                  return (
                      <li key={igkey}>
                          <span style={{textTransform: 'capitalize'}}>{igkey}:</span> {props.ingredients[igkey]}
                      </li>
                  )
              })
       return (
          <Aux> 
             <h3>Your order</h3>
             <p>A delicious  burger with following ingredients:</p>
             <ul>
                {ingredientSummary}
             </ul>
             <p><strong>Total price: {props.totalPrice.toFixed(2)}$</strong></p>
             
             <p> Contiune to Checkout ?</p>
             <Button clicked={props.cancel} btnType="Danger">CANCEL</Button>
             <Button clicked={props.continue} btnType="Success">CONTINUE</Button>
          </Aux>
       )
}

export default orderSummary;