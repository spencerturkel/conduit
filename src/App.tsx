import * as React from 'react';
import {ComponentClass} from 'react';
import {BrowserRouter, Link, NavLink} from 'react-router-dom';

import Footer, {LinkProps as FooterLinkProps} from './Footer/Footer';
import Header, {LinkProps as HeaderLinkProps} from './Header/Header';
import Home from './Home/Home';

function AppHeader() {
    const Result = Header(NavLink as ComponentClass<HeaderLinkProps>);

    return <Result />;
}

function AppFooter() {
    const Result = Footer(Link as ComponentClass<FooterLinkProps>);

    return <Result />;
}

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
