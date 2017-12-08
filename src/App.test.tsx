import {shallow} from 'enzyme';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('has some children', () => {
    const app = shallow(<App />);

    expect(app.getElements().some(() => true)).toBe(true);
});

it('matches the snapshot', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
});
