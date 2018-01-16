import * as React from "react";
import { ComponentType, StatelessComponent } from "react";

import { LinkProps } from "../link-props";
import setDisplayName from "../set-display-name";

const Footer = (Link: ComponentType<LinkProps>): StatelessComponent => {
  const sfc: StatelessComponent = () => (
    <footer>
      <div className="container">
        <Link to="/" className="logo-font">
          conduit
        </Link>
        <span className="attribution">
          An interactive learning project from{" "}
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  );

  setDisplayName(sfc, Footer, Link);

  return sfc;
};

export default Footer;
