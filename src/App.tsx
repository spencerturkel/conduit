import * as React from 'react';
import {ComponentClass} from 'react';
import Helmet from 'react-helmet';
import {Route, Switch} from 'react-router';
import {BrowserRouter, Link as ReactRouterLink, NavLink as ReactRouterNavLink} from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import ArticleListing, {ArticlePreview} from './components/Home/ArticleListing';
import FeedPicker from './components/Home/ArticleListing/FeedPicker';
import PopularTags from './components/Home/PopularTags';
import {LinkProps} from './components/link-props';
import {NavLinkProps} from './components/nav-link-props';

const AppArticleListing = (() => {
    const articlePreviews: ArticlePreview[] = [
        {
            author: {
                image: 'https://i.stack.imgur.com/xHWG8.jpg',
                username: 'jake',
            },
            createdAt: new Date('2017-10-12'),
            description: 'This is the description for the post.',
            favorited: true,
            favoritesCount: 27,
            slug: 'test-slug',
            title: 'How to build webapps that scale',
        },
        {
            slug: 'how-to-train-your-dragon-2',
            title: 'How to train your dragon 2',
            description: 'So toothless',
            createdAt: new Date('2016-02-18T03:22:56.637Z'),
            favorited: false,
            favoritesCount: 0,
            author: {
                username: 'jake',
                image: 'https://i.stack.imgur.com/xHWG8.jpg',
            },
        },
    ];

    const AppFeedPicker = () => <FeedPicker activeFeed={'global'} loggedIn={false} />;

    const Result = ArticleListing(AppFeedPicker, ReactRouterLink as ComponentClass<LinkProps>);

    return () => <Result previews={articlePreviews} onFavoriteCountClick={slug => alert(`Favorited slug ${slug}`)} />;
})();

const AppPopularTags = (() => {
    const Result = PopularTags();

    return () => <Result onTagClicked={tag => alert('clicked ' + tag)} tags={['programming', 'reactjs']} />;
})();

const AppHome = Home(AppPopularTags, AppArticleListing);

const AppHeader = Header(ReactRouterNavLink as ComponentClass<NavLinkProps>);
const AppFooter = Footer(ReactRouterLink as ComponentClass<LinkProps>);

const App = () => (
    <BrowserRouter>
        <div>
            <AppHeader />
            <Switch>
                <Route
                    path="/"
                    exact={true}
                    render={() => (
                        <>
                            <Helmet>
                                <title>Home — Conduit</title>
                            </Helmet>
                            <AppHome />
                        </>
                    )}
                />
                <Route
                    path="/"
                    render={() => (
                        <>
                            <Helmet>
                                <title>Coming Soon — Conduit</title>
                            </Helmet>
                            <div>Coming soon.</div>
                        </>
                    )}
                />
            </Switch>
            <AppFooter />
        </div>
    </BrowserRouter>
);

export default App;
