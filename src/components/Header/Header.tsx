import * as React from 'react';
import {ComponentType, StatelessComponent} from 'react';

import {NavLinkProps} from '../nav-link-props';
import setDisplayName from '../set-display-name';

const Header = (Link: ComponentType<NavLinkProps>): StatelessComponent => {
    const sfc: StatelessComponent = () => (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    conduit
                </Link>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <Link activeClassName="active" className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link activeClassName="active" className="nav-link" to="/new-post">
                            <i className="ion-compose" />&nbsp;New Post
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link activeClassName="active" className="nav-link" to="/settings">
                            <i className="ion-gear-a" />&nbsp;Settings
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link activeClassName="active" className="nav-link" to="/sign-up">
                            Sign up
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );

    setDisplayName(sfc, Header, Link);

    return sfc;
};

export default Header;
