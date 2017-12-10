import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';

import FeedPicker from './FeedPicker';

let sut: ReactWrapper;

beforeEach(() => {
    sut = mount(<FeedPicker />);
});

it('should match snapshot', () => {
    expect(sut).toMatchSnapshot();
});
