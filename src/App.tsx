import * as React from 'react';
import {BrowserRouter, Link, NavLink} from 'react-router-dom';

import Footer, {LinkProps as FooterLinkProps} from './Footer/Footer';
import Header, {LinkProps as HeaderLinkProps} from './Header/Header';
import Home from './Home/Home';

function AppHeader() {
    function HeaderLink({activeClass: activeClassName, ...rest}: HeaderLinkProps) {
        return <NavLink {...{activeClassName, ...rest}} />;
    }

    const Result = Header(HeaderLink);

    return <Result />;
}

function AppFooter() {
    function FooterLink(props: FooterLinkProps) {
        return <Link {...props} />;
    }

    const Result = Footer(FooterLink);

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
