import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import Sppiner from '../../../components/UI/Spinner/Spinner';

class Logout extends Component {
    state = {
        load: false
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.onLogout();
            this.setState({ load: true });
        }, 100)
    }
    render() {
        return this.state.load ? <Redirect to="/" /> : <div style={{ textAlign: 'center' }}> <Sppiner /></div>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);