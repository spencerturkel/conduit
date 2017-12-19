import {shallow} from 'enzyme';
import * as React from 'react';

import Home from './Home';

it('matches the snapshot', () => {
    const sut = shallow(<Home />);
    expect(sut).toMatchSnapshot();
});
