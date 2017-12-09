import * as React from 'react';
import {ComponentClass} from 'react';
import {BrowserRouter, Link as ReactRouterLink, NavLink as ReactRouterNavLink} from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import PopularTags from './Home/PopularTags';
import {LinkProps} from './link-props';
import {NavLinkProps} from './nav-link-props';

const AppPopularTags = () => <PopularTags tags={[{name: 'programming', link: '/programming'}]} />;

const AppHeader = Header(ReactRouterNavLink as ComponentClass<NavLinkProps>);
const AppHome = Home(AppPopularTags);
const AppFooter = Footer(ReactRouterLink as ComponentClass<LinkProps>);

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
