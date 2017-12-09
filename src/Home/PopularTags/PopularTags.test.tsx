import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';
import PopularTags from './PopularTags';

let sut: ReactWrapper;

beforeEach(() => {
    sut = mount(<PopularTags />);
});

it('should match snapshot', () => {
    expect(sut).toMatchSnapshot();
});
