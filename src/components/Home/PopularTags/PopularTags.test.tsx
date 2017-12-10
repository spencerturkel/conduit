import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';
import PopularTags from './PopularTags';

import {LinkProps} from '../../link-props';

let sut: ReactWrapper;

const TestLink = ({to: href, ...rest}: LinkProps) => <a {...{href}} {...rest} />;

const TestPopularTags = PopularTags(TestLink);
const testTags = [{name: 'programming', link: '/programming'}, {name: 'reactjs', link: '/reactjs'}];

beforeEach(() => {
    sut = mount(<TestPopularTags tags={testTags} />);
});

it('should match snapshot', () => {
    expect(sut).toMatchSnapshot();
});
