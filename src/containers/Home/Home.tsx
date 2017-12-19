import * as React from 'react';
import {ComponentClass} from 'react';
import {Link as ReactRouterLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import Home from '../../components/Home';
import ArticleListing, {ArticlePreview} from '../../components/Home/ArticleListing';
import FeedPicker from '../../components/Home/ArticleListing/FeedPicker';
import PopularTags from '../../components/Home/PopularTags';
import {LinkProps} from '../../components/link-props';
import * as state from '../../state';

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

const HomeContainer = Home(AppPopularTags, AppArticleListing);

export default HomeContainer;
