import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';

import Header, {LinkProps} from './Header';

function HeaderLink(activeLink: string): React.StatelessComponent<LinkProps> {
    return props => (
        <a
            className={props.className + (props.activeClass && activeLink === props.to ? ' ' + props.activeClass : '')}
            href={props.to}>
            {props.children}
        </a>
    );
}

function TestHeader({activeLink}: {activeLink: string}) {
    const Result = Header(HeaderLink(activeLink));
    return <Result />;
}

let sut: ReactWrapper<{activeLink: string}>;

beforeEach(() => {
    sut = mount(<TestHeader activeLink="/" />);
});

it('matches snapshot', () => {
    expect(sut).toMatchSnapshot();
});

it('adds the active class to the active link', () => {
    const activeLink = '/' + ['', 'settings', 'sign-up', 'new-post'][Math.floor(Math.random() * 4)];

    sut.setProps({activeLink});

    expect(sut.find(`a[href="${activeLink}"][className~="active"]`).length).toBe(1);
});
