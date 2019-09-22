import React from 'react';
import classes from './Order.css';
const oreder = props =>{
    
    const ingArr = [];
    for ( let ingredientName in props.ingredients){
        ingArr.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName] 
        });
     
    }
    const ingredients = ingArr.map(ig => {
        return <span
        style={{
            textTransform:'capitalize',
            display:'inline-block',
            margin:'0 8px',
            padding:'5px',
            border:'solid 1px #eee'
        }} 
        key={ig.name}>{ig.name} ({ig.amount}) </span>
    })

    return(
      <div className={classes.Order}>
          <p>Ingredients: {ingredients}</p>
          <p>Price: <strong>USD {props.price}</strong></p>
      </div>
   );
 }

export default oreder;