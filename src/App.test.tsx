import {shallow, ShallowWrapper} from 'enzyme';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

describe('shallow tests', () => {
    let sut: ShallowWrapper;

    beforeEach(() => {
        sut = shallow(<App />);
    });

    it('matches the snapshot', () => {
        expect(sut).toMatchSnapshot();
    });
});
