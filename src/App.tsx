import * as React from 'react';
import {ComponentClass, ComponentType} from 'react';
import Helmet from 'react-helmet';
import {Route, Switch} from 'react-router';
import {BrowserRouter, Link as ReactRouterLink, NavLink as ReactRouterNavLink} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Action, applyMiddleware, combineReducers, createStore} from 'redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {ajax} from 'rxjs/observable/dom/ajax';

import Footer from './components/Footer';
import Header from './components/Header';
import {LinkProps} from './components/link-props';
import {NavLinkProps} from './components/nav-link-props';
import * as services from './services';
import * as state from './state';
import AsyncComponent from './containers/async-component';

const AppHeader = Header(ReactRouterNavLink as ComponentClass<NavLinkProps>);
const AppFooter = Footer(ReactRouterLink as ComponentClass<LinkProps>);

const store = createStore(
    combineReducers(state.reducers),
    applyMiddleware(createEpicMiddleware(combineEpics(state.tags.fetchAll$(services.tags$(ajax))))),
);

const ConnectedAsyncComponent = (
    importFn: () => Promise<{default: ComponentType<{dispatch: (action: Action) => void}>}>,
) => {
    const Loader = AsyncComponent(importFn);
    return () => (
        <Loader
            renderLoading={() => <div>Loading...</div>}
            renderError={error => <div>Error: {JSON.stringify(error)}</div>}
            renderComponent={Component => <Component dispatch={store.dispatch} />}
        />
    );
};

const HomeAsync = ConnectedAsyncComponent(() => import('./containers/Home'));

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
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
                                <HomeAsync />
                            </>
                        )}
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
