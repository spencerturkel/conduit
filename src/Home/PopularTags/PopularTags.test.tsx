import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';
import PopularTags from './PopularTags';

let sut: ReactWrapper;

const testTags = [{name: 'programming', link: '/programming'}, {name: 'reactjs', link: '/reactjs'}];

beforeEach(() => {
    sut = mount(<PopularTags tags={testTags} />);
});

it('should match snapshot', () => {
    expect(sut).toMatchSnapshot();
});
