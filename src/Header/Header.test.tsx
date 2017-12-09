import {shallow} from 'enzyme';
import * as React from 'react';

import Header from './Header';

it('matches snapshot', () => {
    const sut = shallow(<Header />);
    expect(sut).toMatchSnapshot();
});
