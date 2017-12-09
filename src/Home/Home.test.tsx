import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';

import Home from './Home';

let sut: ReactWrapper;

beforeEach(() => {
    sut = mount(<Home />);
});

it('should match snapshot', () => {
    expect(sut).toMatchSnapshot();
});
