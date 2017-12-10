import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';

import ArticleListing from './ArticleListing';

const TestFeedPicker = () => <div>Feed Picker</div>;
const TestArticleListing = ArticleListing(TestFeedPicker);

let sut: ReactWrapper;

beforeEach(() => {
    sut = mount(<TestArticleListing />);
});

it('should match snapshot', () => {
    expect(sut).toMatchSnapshot();
});
