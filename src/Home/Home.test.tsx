import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';

import Home from './Home';

const TestHome = Home(() => <div>Popular Tags</div>, () => <div>Article Listing</div>);

let sut: ReactWrapper;

beforeEach(() => {
    sut = mount(<TestHome />);
});

it('should match snapshot', () => {
    expect(sut).toMatchSnapshot();
});
