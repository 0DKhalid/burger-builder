import React from 'react';
import classes from './Input.css';


const input = props => {
    let inputElement = null;
    const inputClasses = [classes.InputElement]; 
    let msgError;
    if(props.invalid && props.shouldRequired && props.touched){
       inputClasses.push(classes.Invalid);
       msgError = <p style={{color:'red', margin:'5px 0'}}>Please enter valid {props.valueType}</p>
    }


    switch(props.elementType){
        case 'input':
        inputElement = <input 
        {...props.elementConfig}
         className={inputClasses.join(' ')} 
         defaultValue={props.value}
         onChange={props.changed} />;
        break;

        case 'textarea':
        inputElement = 
        <textarea 
        {...props.elementConfig} 
        className={inputClasses.join(' ')} 
        defaultValue={props.value}
        onChange={props.changed}
        oncha />
        break;

        case 'select':
        inputElement = 
            <select
            className={inputClasses.join(' ')}
            defaultValue={props.value}
            onChange={props.changed}>
             {props.elementConfig.options.map(option => (
               <option key={option.value} value={option.value}>
                  {option.displayValue}
               </option>
             ))}
            </select>
           break;

        default:
        inputElement = <input
         {...props.elementConfig} 
         className={inputClasses.join(' ')} 
         defaultValue={props.value}
         onChange={props.changed} />
    }

       return (      
         <div className={classes.Input}>
           <label className={classes.Label}>{props.label}</label>
           {inputElement}
           {msgError}
        </div>

       )
}

export default input;