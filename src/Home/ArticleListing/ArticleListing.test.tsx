import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';
import {StatelessComponent} from 'react';

import {LinkProps} from '../../link-props';
import ArticleListing, {ArticlePreview} from './ArticleListing';

const TestFeedPicker = () => <div>Feed Picker</div>;
const TestLink: StatelessComponent<LinkProps> = ({to: href, ...rest}) => <a {...{href}} {...rest} />;
const TestArticleListing = ArticleListing(TestFeedPicker, TestLink);

const testProps: ArticlePreview[] = [
    {
        author: {
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            username: 'jake',
        },
        createdAt: new Date('2017-10-12'),
        description: 'This is the description for the post.',
        favoritesCount: 27,
        slug: 'test-slug',
        title: 'How to build webapps that scale',
    },
];

let sut: ReactWrapper;

beforeEach(() => {
    sut = mount(<TestArticleListing previews={testProps} />);
});

it('should match snapshot', () => {
    expect(sut).toMatchSnapshot();
});
