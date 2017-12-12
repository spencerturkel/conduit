import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';

import PopularTags, {PopularTagsProps} from './PopularTags';

let sut: ReactWrapper;

let testProps: PopularTagsProps;

beforeEach(() => {
    const TestPopularTags = PopularTags();
    testProps = {tags: ['programming', 'reactjs'], onTagClicked: jest.fn()};

    sut = mount(<TestPopularTags {...testProps} />);
});

it('should match snapshot', () => {
    expect(sut).toMatchSnapshot();
});

it('should call onTagClicked(tag) when clicking a tag', () => {
    const tagButtons = testProps.tags.map(tag =>
        sut.find('button').filterWhere((button: ReactWrapper) => button.text().trim() === tag),
    );

    expect(tagButtons.length).toEqual(testProps.tags.length);

    for (const button of tagButtons) {
        button.simulate('click');

        expect(testProps.onTagClicked).toHaveBeenCalledWith(button.key());
    }
});
