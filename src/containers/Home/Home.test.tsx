import { shallow } from "enzyme";
import * as React from "react";

import { fetchAll } from "./state/tags";
import Home from "./Home";
import { ContainerProps } from "../container-props";

const props: ContainerProps = {
  addEpic: () => undefined,
  addReducer: () => undefined,
  dispatch: () => undefined
};

it("matches the snapshot", () => {
  const TestHome = Home(props);
  const sut = shallow(<TestHome />);
  expect(sut).toMatchSnapshot();
});

it("calls addEpic before dispatch", () => {
  props.dispatch = jest.fn();
  props.addEpic = jest.fn(() => expect(props.dispatch).not.toHaveBeenCalled());

  const TestHome = Home(props);
  shallow(<TestHome />);

  expect(props.addEpic).toHaveBeenCalled();
});

it("calls addReducer before dispatch", () => {
  props.dispatch = jest.fn();
  props.addReducer = jest.fn(() =>
    expect(props.dispatch).not.toHaveBeenCalled()
  );

  const TestHome = Home(props);
  shallow(<TestHome />);

  expect(props.addReducer).toHaveBeenCalled();
});

it("dispatches a tags.fetchAll action", () => {
  props.dispatch = jest.fn();

  const TestHome = Home(props);
  shallow(<TestHome />);

  expect(props.dispatch).toHaveBeenCalledTimes(1);
  expect(props.dispatch).toHaveBeenCalledWith(fetchAll());
});
