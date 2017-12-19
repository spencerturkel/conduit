import {shallow} from 'enzyme';
import * as React from 'react';

import {fetchAll} from '../../state/tags';
import Home from './Home';

it('matches the snapshot', () => {
    const sut = shallow(<Home dispatch={() => null} />);
    expect(sut).toMatchSnapshot();
});

it('dispatches a tags.fetchAll action', () => {
    const dispatch = jest.fn();

    shallow(<Home dispatch={dispatch} />);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(fetchAll());
});
