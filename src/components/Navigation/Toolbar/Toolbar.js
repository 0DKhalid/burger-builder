import React from 'react';
import classes from './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDraweToggle from './SideDrawerToggle/SideDrawerToggle';

const toolbar = props => (
    <header className={classes.Toolbar}>
        <SideDraweToggle clicked={props.sideDrawerHandller} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
)
export default toolbar;
