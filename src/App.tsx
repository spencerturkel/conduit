import * as React from 'react';
import {ComponentClass} from 'react';
import {BrowserRouter, Link, NavLink} from 'react-router-dom';

import Footer, {LinkProps as FooterLinkProps} from './Footer/Footer';
import Header, {LinkProps as HeaderLinkProps} from './Header/Header';
import Home from './Home/Home';

const AppHeader = Header(NavLink as ComponentClass<HeaderLinkProps>);
const AppFooter = Footer(Link as ComponentClass<FooterLinkProps>);

const App = () => (
    <BrowserRouter>
        <div>
            <AppHeader />
            <Home />
            <AppFooter />
        </div>
    </BrowserRouter>
);

export default App;
