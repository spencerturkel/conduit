import * as React from 'react';
import {ComponentClass} from 'react';
import {BrowserRouter, Link, NavLink} from 'react-router-dom';

import Footer, {LinkProps as FooterLinkProps} from './Footer';
import Header, {LinkProps as HeaderLinkProps} from './Header';
import Home from './Home';
import PopularTags from './Home/PopularTags';

const AppHeader = Header(NavLink as ComponentClass<HeaderLinkProps>);
const AppHome = Home(PopularTags);
const AppFooter = Footer(Link as ComponentClass<FooterLinkProps>);

const App = () => (
    <BrowserRouter>
        <div>
            <AppHeader />
            <AppHome />
            <AppFooter />
        </div>
    </BrowserRouter>
);

export default App;
