import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';

import ArticleListing from './ArticleListing';

let sut: ReactWrapper;

beforeEach(() => {
    sut = mount(<ArticleListing />);
});

it('should match snapshot', () => {
    expect(sut).toMatchSnapshot();
});
