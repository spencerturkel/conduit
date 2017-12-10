import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';
import {StatelessComponent} from 'react';

import {LinkProps} from '../../link-props';
import ArticleListing, {ArticlePreview} from './ArticleListing';

const TestFeedPicker = () => <div>Feed Picker</div>;
const TestLink: StatelessComponent<LinkProps> = ({to: href, ...rest}) => <a {...{href}} {...rest} />;
const TestArticleListing = ArticleListing(TestFeedPicker, TestLink);

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

let onFavoriteCountClick: jest.Mock;

let sut: ReactWrapper;

beforeEach(() => {
    onFavoriteCountClick = jest.fn();
    sut = mount(<TestArticleListing previews={articlePreviews} onFavoriteCountClick={onFavoriteCountClick} />);
});

it('should match snapshot', () => {
    expect(sut).toMatchSnapshot();
});

it('should preventDefault() and call onFavoriteCountClick with the correct slug when clicking a favorite button', () => {
    for (const {slug, button} of articlePreviews.map(article => ({
        slug: article.slug,
        button: sut.findWhere(node => node.key() === article.slug).find('button'),
    }))) {
        expect(button.length).toBe(1);

        const preventDefault = jest.fn();

        button.simulate('click', {preventDefault});

        expect(preventDefault).toHaveBeenCalled();
        expect(onFavoriteCountClick).toHaveBeenCalledWith(slug);
    }
});
