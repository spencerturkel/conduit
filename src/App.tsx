import * as React from 'react';
import {ComponentClass} from 'react';
import {BrowserRouter, Link as ReactRouterLink, NavLink as ReactRouterNavLink} from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import ArticleListing, {ArticlePreview} from './Home/ArticleListing';
import FeedPicker from './Home/ArticleListing/FeedPicker';
import PopularTags from './Home/PopularTags';
import {LinkProps} from './link-props';
import {NavLinkProps} from './nav-link-props';

const articlePreviews: ArticlePreview[] = [
    {
        author: {
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            username: 'jake',
        },
        createdAt: new Date('2017-12-10'),
        description: 'This is the description for the post.',
        favoritesCount: 27,
        slug: 'test-slug',
        title: 'How to build webapps that scale',
    },
];

const AppFeedPicker = () => <FeedPicker activeFeed={'global'} loggedIn={false} />;
const AppArticleListing = (() => {
    const Result = ArticleListing(AppFeedPicker, ReactRouterLink as ComponentClass<LinkProps>);
    return () => <Result previews={articlePreviews} />;
})();

const AppPopularTags = () => <PopularTags tags={[{name: 'programming', link: '/programming'}]} />;
const AppHome = Home(AppPopularTags, AppArticleListing);

const AppHeader = Header(ReactRouterNavLink as ComponentClass<NavLinkProps>);
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
