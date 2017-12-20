import * as React from 'react';
import {ComponentClass, ComponentType} from 'react';
import Helmet from 'react-helmet';
import {Route, Switch} from 'react-router';
import {BrowserRouter, Link as ReactRouterLink, NavLink as ReactRouterNavLink} from 'react-router-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore, MiddlewareAPI, ReducersMapObject} from 'redux';
import {ActionsObservable, combineEpics, createEpicMiddleware, Epic} from 'redux-observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {map, mergeMap, scan} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';

import Footer from './components/Footer';
import Header from './components/Header';
import {LinkProps} from './components/link-props';
import {NavLinkProps} from './components/nav-link-props';
import * as state from './state';
import AsyncComponent from './containers/async-component';
import {ContainerProps, AsyncReducer} from './containers/container-props';

const AppHeader = Header(ReactRouterNavLink as ComponentClass<NavLinkProps>);
const AppFooter = Footer(ReactRouterLink as ComponentClass<LinkProps>);

const epic$ = new BehaviorSubject(combineEpics());
const rootEpic: Epic<any, any, any> = (action$: ActionsObservable<any>, middlewareAPI: MiddlewareAPI<any>) =>
    epic$.pipe(mergeMap((epic: Epic<any, any, any>) => epic(action$, middlewareAPI, undefined)));

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(combineReducers(state.reducers), applyMiddleware(epicMiddleware));

const asyncReducer$ = new Subject<AsyncReducer>();

asyncReducer$
    .pipe(
        scan(
            (loaded: ReducersMapObject, {name, reducer}: AsyncReducer) => ({
                ...loaded,
                [name]: reducer,
            }),
            state.reducers,
        ),
        map(combineReducers),
    )
    .subscribe(reducer => {
        store.replaceReducer(reducer);
    });

const componentProps: ContainerProps = {
    addEpic: epic$.next.bind(epic$),
    addReducer: asyncReducer$.next.bind(asyncReducer$),
    dispatch: store.dispatch.bind(store),
};

const ConnectedAsyncComponent = (importFn: () => Promise<{default: (props: ContainerProps) => ComponentType<{}>}>) => {
    const Loader = AsyncComponent(() =>
        importFn().then(({default: makeComponent}) => ({default: makeComponent(componentProps)})),
    );

    return () => (
        <Loader
            renderLoading={() => <div>Loading...</div>}
            renderError={error => <div>Error: {JSON.stringify(error)}</div>}
            renderComponent={Component => <Component />}
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
