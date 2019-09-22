import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import classes from './Auth.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/auth';
import { checkValidity } from '../../shared/utility';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Your Email'
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    passwordStrength: true
                },
                valid: false,
                touched: false,
                valueType: 'Password'
            },

        },
        isSignup: true
    }
    componentDidMount() {
        if (!this.props.buildingBurger && this.props.path !== '/') {
            this.props.onSetRedirect('/');
        }
        if (this.props.buildingBurger) {
            this.props.onSetRedirect('/checkout');
        }
    }

    inputChangeHandller = (event, controlName) => {
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updateControls })
    }

    onSubmitHandller = event => {
        event.preventDefault();
        this.props.onAuthDataStore(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup);
    }

    siginInHandller = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    render() {
        const formElementsArr = [];
        for (let key in this.state.controls) {
            formElementsArr.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let formElement = formElementsArr.map(formElement =>
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
        if (this.props.loading) {
            formElement = <Spinner />;
        }

        let error = null;
        if (this.props.error) {
            error = <p style={{ color: 'red', fontWeight: 'bold' }}>{
                this.props.error.message
            }</p>
        }
        let redirectAfterRegister = null;
        if (this.props.isAuth) {
            redirectAfterRegister = < Redirect to={this.props.path} />
        }
        return (
            <div className={classes.Auth}>
                {error}
                <form onSubmit={this.onSubmitHandller}>
                    {redirectAfterRegister}
                    {formElement}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button
                    clicked={this.siginInHandller}
                    btnType="Danger">Switch To {this.state.isSignup ? 'Sign in' : 'Sign up'} </Button>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        path: state.auth.setRedirectPath,
        buildingBurger: state.burgerBulider.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthDataStore: (email, password, isSignup) => dispatch(actions.authStore(email, password, isSignup)),
        onSetRedirect: (path) => dispatch(actions.setRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
