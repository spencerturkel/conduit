import * as React from 'react';
import {ComponentType, ReactNode, StatelessComponent} from 'react';

export interface LinkProps {
    children: ReactNode;
    className: string;
    to: string;
}

const Footer = (Link: ComponentType<LinkProps>): StatelessComponent => {
    const sfc: StatelessComponent = () => (
        <footer>
            <div className="container">
                <Link to="/" className="logo-font">
                    conduit
                </Link>
                <span className="attribution">
                    An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
                    licensed under MIT.
                </span>
            </div>
        </footer>
    );

    sfc.displayName = `Footer(${Link.displayName || Link.name})`;

    return sfc;
};

export default Footer;
