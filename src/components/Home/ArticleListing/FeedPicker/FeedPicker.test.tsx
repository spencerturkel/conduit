import { mount, ReactWrapper } from "enzyme";
import * as React from "react";

import FeedPicker from "./FeedPicker";

let sut: ReactWrapper;

beforeEach(() => {
  sut = mount(<FeedPicker activeFeed={"global"} loggedIn={false} />);
});

it("should match snapshots", () => {
  expect(sut).toMatchSnapshot();

  sut.setProps({
    loggedIn: true,
    onGlobalFeedClicked: () => {},
    onUserFeedClicked: () => {}
  });
  expect(sut).toMatchSnapshot();

  sut.setProps({ activeFeed: "user" });
  expect(sut).toMatchSnapshot();
});

describe("when logged in", () => {
  beforeEach(() => {
    sut.setProps({ loggedIn: true });
  });

  it("should call onUserFeedClicked when clicking Your Feed", () => {
    const anchor = sut.find("a").first();
    expect(anchor.text()).toContain("Your Feed");

    const onUserFeedClicked = jest.fn();

    sut.setProps({ onUserFeedClicked });
    anchor.simulate("click");

    expect(onUserFeedClicked).toHaveBeenCalledTimes(1);
  });

  it("should call onGlobalFeedClicked when clicking Global Feed", () => {
    const anchor = sut.find("a").at(1);
    expect(anchor.text()).toContain("Global Feed");

    const onGlobalFeedClicked = jest.fn();

    sut.setProps({ onGlobalFeedClicked });
    anchor.simulate("click");

    expect(onGlobalFeedClicked).toHaveBeenCalledTimes(1);
  });
});
