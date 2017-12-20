import * as React from 'react';
import {ComponentClass} from 'react';
import {Link as ReactRouterLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {ajax} from 'rxjs/observable/dom/ajax';
import {combineReducers} from 'redux';

import Home from '../../components/Home';
import ArticleListing, {ArticlePreview} from '../../components/Home/ArticleListing';
import FeedPicker from '../../components/Home/ArticleListing/FeedPicker';
import PopularTags from '../../components/Home/PopularTags';
import {LinkProps} from '../../components/link-props';
import {ContainerProps, AsyncReducer} from '../container-props';
import {reducers, tags} from './state';
import {tags$} from '../../services';

const asyncReducer: AsyncReducer = {name: 'Home', reducer: combineReducers(reducers)};
const selectState = (state: any) => state[asyncReducer.name];

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
    const Result = connect(createSelector(selectState, createSelector(tags.selectTags, allTags => ({tags: allTags}))))(
        PopularTags(),
    );

    return () => <Result onTagClicked={tag => alert('clicked ' + tag)} />;
})();

const HomeContainer = Home(AppPopularTags, AppArticleListing);

export default ({addReducer, addEpic, dispatch}: ContainerProps) => {
    addReducer(asyncReducer);
    addEpic(tags.fetchAll$(tags$(ajax)));
    dispatch(tags.fetchAll());

    return HomeContainer;
};
