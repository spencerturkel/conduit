import * as React from 'react';
import {ComponentClass} from 'react';
import Helmet from 'react-helmet';
import {Route, Switch} from 'react-router';
import {BrowserRouter, Link as ReactRouterLink, NavLink as ReactRouterNavLink} from 'react-router-dom';
import {connect, Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {createSelector} from 'reselect';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import ArticleListing, {ArticlePreview} from './components/Home/ArticleListing';
import FeedPicker from './components/Home/ArticleListing/FeedPicker';
import PopularTags from './components/Home/PopularTags';
import {LinkProps} from './components/link-props';
import {NavLinkProps} from './components/nav-link-props';
import * as services from './services';
import * as state from './state';

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
    const Result = connect(createSelector(state.tags.selectTags, allTags => ({tags: allTags})))(PopularTags());

    return () => <Result onTagClicked={tag => alert('clicked ' + tag)} />;
})();

const AppHome = Home(AppPopularTags, AppArticleListing);

const AppHeader = Header(ReactRouterNavLink as ComponentClass<NavLinkProps>);
const AppFooter = Footer(ReactRouterLink as ComponentClass<LinkProps>);

const store = createStore(
    combineReducers(state.reducers),
    applyMiddleware(createEpicMiddleware(combineEpics(state.tags.fetchAll$(services.tags$)))),
);

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <div>
                <AppHeader />
                <Switch>
                    <Route
                        path="/"
                        exact={true}
                        render={() => {
                            store.dispatch(state.tags.fetchAll());

                            return (
                                <>
                                    <Helmet>
                                        <title>Home — Conduit</title>
                                    </Helmet>
                                    <AppHome />
                                </>
                            );
                        }}
                    />
                    <Route
                        path="/:todo(new-post|settings|sign-up|profile\\/[^\\/]*|article\\/[^\\/]*)"
                        render={() => (
                            <>
                                <Helmet>
                                    <title>Coming Soon — Conduit</title>
                                </Helmet>
                                <div>Coming soon.</div>
                            </>
                        )}
                    />
                    <Route
                        render={() => (
                            <>
                                <Helmet>
                                    <title>Not Found — Conduit</title>
                                </Helmet>
                                <div>404 Not Found.</div>
                                <ReactRouterLink to="/">Click here to go home.</ReactRouterLink>
                            </>
                        )}
                    />
                </Switch>
                <AppFooter />
            </div>
        </Provider>
    </BrowserRouter>
);

export default App;
