import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandller from '../../../hoc/WithErrorHandller/WithErrorHandller';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';


class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        valueType: 'name'
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        valueType: 'email'
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        valueType: 'country'
      },
      ZipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zip Code'
        },
        value: '',
        validation: {
          required: true,
          maxLength: 5,
          minLength: 5
        },
        valid: false,
        touched: false,
        valueType: 'zip code'
      },

      delveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        valid: true,
        validation: {},
        valueType: ''
      },


    },
    loading: false,
    formValidate: false
  }



  orderHandller = event => {
    event.preventDefault();
    const formData = {};
    for (let formkey in this.state.orderForm) {
      formData[formkey] = this.state.orderForm[formkey].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }
    this.props.onOrderBurger(order, this.props.token);
  }




  inputChangeHandller = (event, inputIdentifir) => {

    const updateElementForm = updateObject(this.state.orderForm[inputIdentifir], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifir].validation),
      touched: true
    })
    const updateOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifir]: updateElementForm
    })


    let isFormValid = true;

    for (let inputIdentifir in updateOrderForm) {
      isFormValid = updateOrderForm[inputIdentifir].valid && isFormValid;
    }

    this.setState({ orderForm: updateOrderForm, formValidate: isFormValid });
  }
  render() {
    const formElementsArr = [];
    for (let key in this.state.orderForm) {
      formElementsArr.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }


    const formElement = formElementsArr.map(formElement =>
      (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldRequired={formElement.config.validation}
          touched={formElement.config.touched}
          valueType={formElement.config.valueType}
          changed={(event) => this.inputChangeHandller(event, formElement.id)} />
      )
    )

    let form = (
      <form onSubmit={this.orderHandller}>
        {formElement}
        <Button btnType="Success" disabled={!this.state.formValidate}>Order Now</Button>
      </form>
    )
    if (this.props.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h1>Enter Your Personal Data</h1>
        {form}
      </div>
    );

  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBulider.ingredients,
    price: state.burgerBulider.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (order, token) => dispatch(actions.purchaseBurger(order, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandller(ContactData, axios));