import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.css';

import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandller = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandller = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }


    render() {

        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuth}
                    sideDrawerHandller={this.sideDrawerToggleHandller} />
                <SideDrawer
                    isAuth={this.props.isAuth}
                    open={this.state.showSideDrawer}
                    close={this.closeSideDrawerHandller} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);