import {mount} from 'enzyme';
import * as React from 'react';

import AsyncComponent, {AsyncComponentProps} from './async-component';

const defaultProps: AsyncComponentProps = {
    importPath: '',
    renderLoading: () => null,
    renderError: () => null,
    renderComponent: () => null,
};

it('should have the correct display name', () => {
    const importFn = () => new Promise<any>(() => undefined);
    const sut = AsyncComponent(importFn);
    expect(sut.displayName).toContain(`AsyncComponent(${importFn.name})`);
});

it('should begin importing from importPath when it mounts', () => {
    const path = Math.random().toString();

    const importFn = jest.fn(() => new Promise<any>(() => undefined));

    const Sut = AsyncComponent(importFn);

    mount(<Sut {...defaultProps} importPath={path} />);

    expect(importFn).toHaveBeenCalledTimes(1);
    expect(importFn).toHaveBeenCalledWith(path);
});

it('should render from renderLoading when it mounts', () => {
    const contents = Math.random().toString();

    const importFn = () => new Promise<any>(() => undefined);

    const Sut = AsyncComponent(importFn);

    const node = mount(<Sut {...defaultProps} renderLoading={() => contents} />);

    expect(node.text()).toBe(contents);
});

it('should render errors using the renderError prop', async () => {
    const error = Math.random().toString();

    const importFn = () => Promise.reject(error);

    const Sut = AsyncComponent(importFn);

    const node = mount(<Sut {...defaultProps} renderError={x => x} />);

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(node.text()).toBe(error);
});

it('should render the loaded component using the renderComponent prop', async () => {
    const component = Math.random().toString();

    const importFn = () => Promise.resolve({default: component as any});

    const Sut = AsyncComponent(importFn);

    const node = mount(<Sut {...defaultProps} renderComponent={x => x} />);

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(node.text()).toBe(component);
});
