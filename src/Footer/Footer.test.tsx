import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';
import {ReactElement} from 'react';

import Footer, {LinkProps} from './Footer';

function Link({className, children, to}: LinkProps): ReactElement<LinkProps> {
    return (
        <a className={className} href={to}>
            {children}
        </a>
    );
}

function TestFooter(): ReactElement<{}> {
    const Result = Footer(Link);
    return <Result />;
}

let sut: ReactWrapper;

beforeEach(() => {
    sut = mount(<TestFooter />);
});

it('should match snapshot', () => {
    expect(sut).toMatchSnapshot();
});
